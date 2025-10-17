import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/**
 * MediaList — A minimal, hardcoded list of items (not using external data).
 * Each item shows its title and (optionally) artist.
 */
const items = [
  { id: "one", title: "Song Title One", artis: "Artist Name" },
  { id: "two", title: "Video Title Two" },
  { id: "three", title: "Track Three", artis: "Another Artist" },
  { id: "four", title: "Music Four" },
  { id: "five", title: "Fifth Favorite", artis: "Cool Band" },
];

const MediaList: React.FC = () => (
  <div>
    <div className="w-full p-6 flex justify-center">
      <div className="w-full max-w-lg">
        <Accordion type="multiple" className="w-full">
          {items.map((item) => (
            <AccordionItem key={item.id} value={`item-${item.id}`}>
              <AccordionTrigger>
                <div>
                  <span className="font-semibold">{item.title}</span>
                  {item.artis && <span className="ml-2 text-base-content/60">by {item.artis}</span>}
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <div>CONTENT</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </div>
);

export default MediaList;
