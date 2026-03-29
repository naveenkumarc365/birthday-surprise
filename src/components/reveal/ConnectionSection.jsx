import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { cn } from "../../lib/cn";
import { radii } from "../../lib/theme";

import connectionImg from "../../assets/handsphoto.jpeg";

function ConnectionSection() {
  const sceneRef = useRef(null);
  const isInView = useInView(sceneRef, { amount: 0.62, once: true });

  const lineOne = useAnimationControls();
  const lineTwo = useAnimationControls();
  const card = useAnimationControls();
  const caption = useAnimationControls();

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const run = async () => {
      await lineOne.start({ opacity: 1, y: 0, transition: { duration: 0.66, ease: "easeOut" } });
      await lineTwo.start({ opacity: 1, y: 0, transition: { duration: 0.62, ease: "easeOut" } });
      await card.start({ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotate: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } });
      await caption.start({ opacity: 1, y: 0, transition: { duration: 0.58, ease: "easeOut" } });
    };

    run();
  }, [caption, card, isInView, lineOne, lineTwo]);

  return (
    <section
      id="connection-section"
      ref={sceneRef}
      className="relative overflow-clip bg-[#24183f]"
    >
      <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24 sm:min-h-screen sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(216,204,255,0.23),transparent_35%),radial-gradient(circle_at_18%_80%,rgba(179,157,219,0.2),transparent_40%),linear-gradient(170deg,rgba(22,16,41,0.97),rgba(40,29,68,0.96),rgba(61,46,103,0.96))]" />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#2a1c49]/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#24183f]/60" />

        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={lineOne}
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-[#D7C7FF]/70 sm:mb-5"
          >
            THE TURNING POINT
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={lineOne}
            className="font-serif text-3xl leading-tight text-[#F7F1FF] sm:text-4xl"
          >
            And then… somewhere in this world…
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={lineTwo}
            className="mt-3 text-base italic text-[#E2D6F7]/90 sm:text-lg"
          >
            our paths crossed.
          </motion.p>

          <div className="relative mt-12 flex w-full flex-col items-center justify-center sm:mt-14">
            {/* Very soft lavender ambient glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={card}
              transition={{ duration: 2, delay: 0.4 }}
              className="pointer-events-none absolute left-1/2 top-[40%] h-[350px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-[#b098ff]/12 blur-[90px] sm:h-[420px] sm:w-[320px]"
            />

            {/* Photo container styled like a precious artifact */}
            <motion.figure
              initial={{ opacity: 0, y: 35, scale: 0.96, filter: "blur(12px)", rotate: -1 }}
              animate={card}
              className="relative w-full max-w-[260px] sm:max-w-[300px]"
            >
              {/* Subtle float after entrance */}
              <motion.div
                animate={isInView ? { y: [0, -5, 0] } : {}}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="relative overflow-hidden rounded-[20px] p-2 shadow-[0_32px_60px_rgba(20,10,40,0.6),inset_0_0_0_1px_rgba(230,220,255,0.18)] bg-white/5 backdrop-blur-md">
                  <img
                    src={connectionImg}
                    alt="Connection moment"
                    className="h-[360px] w-full rounded-[14px] object-cover object-center contrast-[1.04] sm:h-[400px]"
                    loading="lazy"
                  />
                  
                  {/* Micro rim-light inside the thin border */}
                  <div className="pointer-events-none absolute inset-2 rounded-[14px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]" />
                  
                  {/* Subtle vignette blend */}
                  <div className="pointer-events-none absolute inset-2 rounded-[14px] bg-[radial-gradient(circle_at_center,transparent_50%,rgba(40,20,70,0.15))] mix-blend-overlay" />

                  {/* Tiny emotional sparkle near the top right corner */}
                  <svg className="absolute top-5 right-5 h-[14px] w-[14px] text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" fill="currentColor"/>
                  </svg>
                </div>
              </motion.div>

              {/* Caption moved OUTSIDE the frame entirely */}
              <motion.figcaption
                initial={{ opacity: 0, y: 12 }}
                animate={caption}
                className="mt-6 text-center font-serif text-[16px] italic tracking-wide text-[#E5D8FF]/90 drop-shadow-md sm:mt-7 sm:text-[18px]"
              >
                where &apos;us&apos; quietly began ✨
              </motion.figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConnectionSection;
