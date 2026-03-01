import { useState } from "react";

import { HeroCTAButton } from "@/components/atoms/HeroCTAButton";
import { HeroTypography } from "@/components/molecules/HeroTypography";
import { HeroHeader } from "@/components/organisms/HeroHeader";
import { SidebarDrawer } from "@/components/organisms/SidebarDrawer";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-black overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <style>{`
          @keyframes moveParticles {
            0% { background-position: 0 0, 0 0, 0 0, 0 0, 0 0; }
            100% { background-position: 500px 1000px, 400px 400px, 300px 300px, 200px 200px, 600px 600px; }
          }
          
          .particles-layer-1 {
            position: absolute;
            inset: 0;
            /* Cria os pontos brancos usando gradientes radiais minúsculos */
            background-image: 
              radial-gradient(1.5px 1.5px at 40px 60px, #fff, transparent),
              radial-gradient(1px 1px at 20px 50px, rgba(255,255,255,0.7), transparent),
              radial-gradient(2px 2px at 90px 40px, rgba(255,255,255,0.4), transparent),
              radial-gradient(1px 1px at 120px 120px, #fff, transparent),
              radial-gradient(1.5px 1.5px at 160px 80px, rgba(255,255,255,0.6), transparent);
            background-size: 200px 200px, 150px 150px, 250px 250px, 180px 180px, 300px 300px;
            animation: moveParticles 60s linear infinite;
          }

          .particles-layer-2 {
            position: absolute;
            inset: 0;
            background-image: 
              radial-gradient(1px 1px at 50px 50px, #fff, transparent),
              radial-gradient(1.5px 1.5px at 150px 100px, rgba(255,255,255,0.5), transparent);
            background-size: 300px 300px, 200px 200px;
            /* Animação inversa e mais lenta para dar sensação de profundidade (efeito Parallax) */
            animation: moveParticles 90s linear infinite reverse;
            opacity: 0.6;
          }
        `}</style>
        
        <div className="particles-layer-1"></div>
        <div className="particles-layer-2"></div>
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-70"></div>
      </div>
      <div className="relative z-10 flex flex-1 flex-col h-full">
        <HeroHeader onMenuClick={() => setIsOpen(true)} />
        <SidebarDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
        
        <main className="flex flex-1 flex-col items-center justify-center px-4 pb-12">
          <HeroTypography className="max-w-2xl text-white" />
          <HeroCTAButton className="mt-12 sm:mt-16" />
        </main>
      </div>

    </div>
  );
};

export default Home;