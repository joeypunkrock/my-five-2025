import React from "react";
import Mascot from "@/components/ui/Mascot";
import MediaList from "@/components/ui/MediaList";
import { Particles } from "@/components/ui/particles";

const HomePage: React.FC = () => {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-950 to-fuchsia-950 py-8 overflow-hidden">
      {/* <h1>React Framework</h1>
      <p>This is the homepage of your application.</p>
      // In Header or elsewhere
      <Mascot style="default" size={48} />
      <Mascot style="wave" size={64} />
      <Mascot style="wink" size={48} />
      <Mascot style="celebrate" size={72} /> */}
      <MediaList />
      <Particles
        className="absolute inset-0"
        quantity={60}
        ease={80}
        staticity={50}
        color="#ffffff"
        size={0.8}
      />
    </main>
  );
};

export default HomePage;
