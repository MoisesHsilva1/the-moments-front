import { ArrowDown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import SEO from "../atoms/SEO";
import { motion, useScroll, useTransform } from "framer-motion";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <>
      <SEO 
        title="Início" 
        description="As melhores experiências gastronômicas da cidade reunidas em um só lugar. Descubra e compartilhe no The Moments."
        ogImage="/og-image.png"
      />
      
      <main className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-black selection:bg-[#E75E43]/30">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] size-[600px] rounded-full bg-[#E75E43]/10 blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -right-[10%] size-[500px] rounded-full bg-zinc-800/20 blur-[100px]" 
          />
        </div>

        <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-12">
          {/* MVP Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="size-3.5 text-[#E75E43]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                MVP EDITION 
              </span>
            </div>
          </motion.div>

          <motion.article 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity }}
          >
            <h1 className="flex flex-col items-center justify-center text-center tracking-tighter">
              <span className="mb-2 text-2xl font-medium text-zinc-300 md:text-3xl">
                Descubra e compartilhe
              </span>
              <span className="bg-gradient-to-b from-white via-white to-zinc-600 bg-clip-text py-2 text-7xl font-black text-transparent sm:text-8xl md:text-9xl leading-none">
                Momentos
              </span>
              <span className="mt-6 text-xl font-medium text-zinc-400 sm:text-2xl md:text-3xl max-w-xl text-balance leading-relaxed">
                A rede social autêntica para quem vive a cidade através de experiências gastronômicas reais.
              </span>
            </h1>
          </motion.article>


          <motion.article
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
          >
            <div className="relative group mt-12">
              {/* Outer Glow for the button */}
              <div className="absolute -inset-4 rounded-full bg-[#E75E43]/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <Button
                className="size-16 md:size-20 rounded-full bg-[#E75E43] hover:bg-[#E75E43]/90 transition-all duration-300 shadow-2xl shadow-[#E75E43]/30"
                onClick={() => navigate("/posts")}
                aria-label="Ver postagens"
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    type: "spring",
                    stiffness: 400,
                    damping: 15
                  }}
                >
                  <ArrowDown className="size-7 md:size-8 text-white" strokeWidth={3} />
                </motion.button>
              </Button>
            </div>
          </motion.article>
        </section>

        {/* Minimal Footer Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="relative z-10 p-8 text-center"
        >
          <p className="text-[10px] font-medium tracking-[0.1em] text-zinc-600 uppercase">
            © {new Date().getFullYear()} The Moments • Made for food lovers
          </p>
        </motion.footer>

        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(231,94,67,0.05),transparent_60%)]" />
      </main>
    </>
  );
};

export default HomePage;


