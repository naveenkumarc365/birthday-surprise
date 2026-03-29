import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { cn } from "../../lib/cn";
import { radii, shadows } from "../../lib/theme";

import childhoodImg from "../../assets/childhood.jpg";

function StoryIntro() {
  const sceneRef = useRef(null);
  const isInView = useInView(sceneRef, { amount: 0.62, once: true });

  const lineOne = useAnimationControls();
  const lineTwo = useAnimationControls();
  const lineThree = useAnimationControls();
  const image = useAnimationControls();

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const run = async () => {
      await lineOne.start({ opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } });
      await lineTwo.start({ opacity: 1, y: 0, transition: { duration: 0.62, ease: "easeOut" } });
      await lineThree.start({ opacity: 1, y: 0, transition: { duration: 0.58, ease: "easeOut" } });
      await image.start({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.86, ease: "easeOut" },
      });
    };

    run();
  }, [image, isInView, lineOne, lineThree, lineTwo]);

  return (
    <section
      id="story-intro"
      ref={sceneRef}
      className="relative overflow-clip bg-[#251942]"
    >
      <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24 sm:min-h-screen sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(216,204,255,0.2),transparent_38%),radial-gradient(circle_at_82%_76%,rgba(179,157,219,0.22),transparent_42%),linear-gradient(170deg,rgba(23,16,41,0.97),rgba(43,31,73,0.96),rgba(64,48,107,0.96))]" />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#2a1d4a]/48 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#251942]/58" />

        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={lineOne}
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-[#D7C7FF]/70 sm:mb-5"
          >
            THE BEGINNING
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={lineOne}
            className="font-serif text-3xl leading-tight text-[#F7F2FF] sm:text-4xl"
          >
            Before anything else…
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={lineTwo}
            className="mt-3 max-w-lg text-base text-[#E3D8F7]/94 sm:text-lg"
          >
            today is the day the world got you.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={lineThree}
            className="mt-2 text-sm text-[#CEBFE9]/88 sm:text-base"
          >
            And that made this day beautiful.
          </motion.p>

          <div className="relative mt-10 sm:mt-12">
            {/* Subtle glow behind polaroid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={image}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/15 blur-[80px] sm:h-[440px] sm:w-[380px]"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95, rotate: -3, filter: "blur(10px)" }}
              animate={image}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[280px] origin-bottom px-2 sm:max-w-[340px]"
            >
              {/* Floating Wrapper */}
              <motion.div
                animate={isInView ? { y: [0, -4, 0], rotate: [0, 1.5, 0] } : {}}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1, // Let the entrance finish first
                }}
              >
                {/* Polaroid frame */}
                <div className="relative rounded-sm bg-[#FCFAFF] p-3 pb-12 shadow-[0_32px_60px_rgba(15,10,35,0.8),inset_0_0_0_1px_rgba(0,0,0,0.06)] sm:p-4 sm:pb-14">
                  
                  {/* Tape effect top center */}
                  <div className="absolute -top-3 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-2 rounded-sm bg-white/40 shadow-sm backdrop-blur-md mix-blend-luminosity sm:w-24" />

                  {/* Photo */}
                  <div className="relative overflow-hidden rounded-[2px] bg-[#E1D5F4]">
                    <img
                      src={childhoodImg}
                      alt="Childhood memory"
                      className="h-[280px] w-full object-cover object-center grayscale-[0.05] sepia-[0.1] sm:h-[340px]"
                      loading="lazy"
                    />
                    
                    {/* Vintage overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(60,30,80,0.2))] mix-blend-overlay" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-rose-900/15 to-transparent mix-blend-overlay" />
                  {/* Fake film grain */}
                  <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                </div>

                {/* Handwritten caption */}
                <div className="absolute bottom-3.5 left-0 right-0 flex items-center justify-center gap-2 sm:bottom-4">
                  <p className="font-serif text-[15px] italic text-[#6A5A8A]/90 sm:text-[16px]">
                    where it all started ✨
                  </p>
                  <svg className="h-[14px] w-[14px] text-[#8C7DA7]/60" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoryIntro;
