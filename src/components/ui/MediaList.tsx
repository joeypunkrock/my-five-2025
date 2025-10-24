import React, { useRef, useState } from "react";
import { getMascotPositionByBreakpoint } from "@/components/mascot/mascotPositioning";
import { useMascot } from "@/components/mascot/useMascot";
import { VideoPlaybackProvider } from "@/components/media/VideoPlaybackProvider";
import VideoPlayer from "@/components/media/VideoPlayer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { useScene } from "@/context/SceneContext";
import { mediaItems } from "@/data/mediaItems";

const FAST_MASCOT_TRANSITION = {
  type: "spring",
  stiffness: 120,
  damping: 28,
  mass: 1.1,
  giveUpDuration: 12000,
};

export default function MediaList(): React.JSX.Element {
  const {
    setMood,
    setMessage,
    moveTo,
    resetMascot,
    setAttachment,
    clearAttachment,
  } = useMascot();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const prevOpenItems = useRef<string[]>([]);
  const latestOpened = useRef<string | null>(null);

  const { setScene, resetScene } = useScene();

  // Refs for each accordion item for measuring position
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // --- Modular open/close handlers ---
  const handleAccordionOpen = (id: string, rect: DOMRect) => {
    resetMascot();
    setMood("celebrate");
    const item = mediaItems.find((it) => it.id === id);
    if (item?.scene) setScene(item.scene);
    setMessage(`Enjoying "${item?.title}"! 🎉`);
    const pos = getMascotPositionByBreakpoint(rect);
    moveTo(
      pos,
      FAST_MASCOT_TRANSITION.giveUpDuration,
      FAST_MASCOT_TRANSITION
    );
    setAttachment({ type: "accordion", id });
    latestOpened.current = `item-${id}`;
  };

  const handleAccordionClose = () => {
    resetMascot();
    resetScene();
    setMood("idle");
    clearAttachment();
    latestOpened.current = null;
  };

  // Handles value change from Accordion component
  const handleAccordionChange = (values: string[]) => {
    // Find the newly opened item (if any)
    const newlyOpened = values.find((id) => !openItems.includes(id));
    // Find the just-closed item (if any)
    const justClosed = openItems.find((id) => !values.includes(id));

    if (newlyOpened) {
      const itemId = newlyOpened.replace(/^item-/, "");
      const ref = itemRefs.current[newlyOpened];
      if (ref) {
        handleAccordionOpen(itemId, ref.getBoundingClientRect());
      }
    }

    if (justClosed) {
      handleAccordionClose();
    }

    setOpenItems(values);
    prevOpenItems.current = values;
  };

  return (
    <VideoPlaybackProvider>
      <div className="relative w-full p-6 flex justify-center z-10" data-theme="dark">
        <div className="w-full max-w-screen-lg">
          <Accordion
            type="multiple"
            className="w-full"
            onValueChange={handleAccordionChange}
          >
            {mediaItems.map((item) => (
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
                      <span className="font-semibold group-hover:opacity-70 group-data-[state=open]:opacity-100">
                        {item.title}
                      </span>
                      {item.artist && (
                        <span className="font-thin text-base-content/60 group-hover:opacity-70 group-data-[state=open]:opacity-100">
                          - {item.artist}
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <VideoPlayer
                      id={item.id}
                      src={item.file}
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