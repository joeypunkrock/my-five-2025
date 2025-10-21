import React, { useState, useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import VideoPlayer from "@/components/media/VideoPlayer";
import { useMascot } from "@/components/mascot/useMascot";
import { VideoPlaybackProvider } from "@/components/media/VideoPlaybackProvider";
import { getMascotPositionByBreakpoint } from "@/components/mascot/mascotPositioning";

const items = [
  { id: "one", title: "Song Title One", artis: "Artist Name", videoUrl: "video/test.mp4", thumbnailUrl: "image/poster-placeholder.gif" },
  { id: "two", title: "Video Title Two", videoUrl: "video/test.mp4", thumbnailUrl: "image/poster-placeholder.gif" },
  { id: "three", title: "Track Three", artis: "Another Artist", videoUrl: "video/test.mp4", thumbnailUrl: "image/poster-placeholder.gif" },
  { id: "four", title: "Music Four", videoUrl: "video/test.mp4", thumbnailUrl: "image/poster-placeholder.gif" },
  { id: "five", title: "Fifth Favorite", artis: "Cool Band", videoUrl: "video/test.mp4", thumbnailUrl: "image/poster-placeholder.gif" },
];

const FAST_MASCOT_TRANSITION = {
  type: "spring",
  stiffness: 120,
  damping: 28,
  mass: 1.1,
  giveUpDuration: 16000,
};

export default function MediaList(): React.JSX.Element {
  const { setMood, setMessage, moveTo, resetMascot } = useMascot();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const prevOpenItems = useRef<string[]>([]);
  const resetTimeout = useRef<number | null>(null);
  const latestOpened = useRef<string | null>(null);

  // Refs for each accordion item
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleAccordionChange = (values: string[]) => {
    // Find if an item was opened
    if (values.length > prevOpenItems.current.length) {
      const newlyOpened = values.find((id) => !prevOpenItems.current.includes(id));
      if (newlyOpened) {
        const item = items.find((it) => `item-${it.id}` === newlyOpened);
        resetMascot();
        setMood("celebrate");
        setMessage(`Enjoying "${item?.title}"! 🎉`);
        latestOpened.current = newlyOpened;
        // Find the DOM node and measure its position
        const ref = itemRefs.current[newlyOpened];
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const { x, y } = getMascotPositionByBreakpoint(rect);
          moveTo({ x, y }, FAST_MASCOT_TRANSITION.giveUpDuration, FAST_MASCOT_TRANSITION);
        }
        if (resetTimeout.current) clearTimeout(resetTimeout.current);
      }
    }

    // If closed, reset mascot mood/message
    if (
      values.length < prevOpenItems.current.length &&
      latestOpened.current &&
      !values.includes(latestOpened.current)
    ) {
      resetMascot();
      setMood("idle");
      latestOpened.current = null;
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
    }

    prevOpenItems.current = values;
    setOpenItems(values);
  };

  return (
    <VideoPlaybackProvider>
      <div className="relative w-full p-6 flex justify-center z-10">
        <div className="w-full max-w-lg">
          <Accordion type="multiple" className="w-full" onValueChange={handleAccordionChange}>
            {items.map((item) => (
              <AccordionItem key={item.id} value={`item-${item.id}`}>
                <div
                  ref={(el) => {
                    itemRefs.current[`item-${item.id}`] = el;
                  }}
                  className="w-full"
                >
                  <AccordionTrigger className="hover:no-underline cursor-pointer group">
                    <div className="text-lg flex items-center gap-2">
                    <div className="relative size-6 shrink-0 flex items-center justify-center overflow-hidden">
                      <span className="material-symbols-rounded text-yellow-400 absolute transition-all duration-300 ease-in-out opacity-100 translate-y-0 group-data-[state=open]:opacity-0 group-data-[state=open]:translate-y-[-20px]">
                        play_arrow
                      </span>
                      <span className="material-symbols-rounded text-green-400 absolute transition-all duration-300 ease-in-out opacity-0 translate-y-[20px] group-data-[state=open]:opacity-100 group-data-[state=open]:translate-y-[0] group-data-[state=open]:animate-pulse">
                        equalizer
                      </span>
                    </div>
                    <span className="font-semibold group-hover:opacity-70 group-data-[state=open]:opacity-100">{item.title}</span>
                    {item.artis && <span className="font-thin text-base-content/60 group-hover:opacity-70 group-data-[state=open]:opacity-100">- {item.artis}</span>}
                  </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <VideoPlayer
                      id={item.id}
                      src={item.videoUrl}
                      title={item.title}
                      posterSrc={item.thumbnailUrl}
                      autoPlay={openItems.includes(`item-${item.id}`)}
                      onEnded={() => {
                        resetMascot();
                        setMood("idle");
                      }}
                    />
                    <div>CONTENT</div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </VideoPlaybackProvider>
  );
}