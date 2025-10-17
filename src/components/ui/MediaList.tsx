import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import VideoPlayer from "./media/VideoPlayer";

const items = [
  { id: "one", title: "Song Title One", artis: "Artist Name", videoUrl: "video/test.mp4", thumbnailUrl: "image/poster-placeholder.gif" },
  { id: "two", title: "Video Title Two", videoUrl: "video/test.mp4", thumbnailUrl: "image/poster-placeholder.gif" },
  { id: "three", title: "Track Three", artis: "Another Artist", videoUrl: "video/test.mp4", thumbnailUrl: "image/poster-placeholder.gif" },
  { id: "four", title: "Music Four", videoUrl: "video/test.mp4", thumbnailUrl: "image/poster-placeholder.gif" },
  { id: "five", title: "Fifth Favorite", artis: "Cool Band", videoUrl: "video/test.mp4", thumbnailUrl: "image/poster-placeholder.gif" },
];

const MediaList: React.FC = () => (
  <div className="relative w-full p-6 flex justify-center z-10">
    <div className="w-full max-w-lg">
      <Accordion type="multiple" className="w-full">
        {items.map((item) => (
          <AccordionItem key={item.id} value={`item-${item.id}`}>
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
              <VideoPlayer src={item.videoUrl} title={item.title} posterSrc={item.thumbnailUrl} />
              <div>CONTENT</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
);

export default MediaList;
