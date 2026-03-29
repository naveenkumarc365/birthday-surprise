import { useState, useRef, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useInView,
} from "framer-motion";
import { cn } from "../lib/cn";
import { radii } from "../lib/theme";

function PersonalLetter() {
  const [isHolding, setIsHolding] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const holdTimer = useRef(null);

  const sceneRef = useRef(null);
  const isInView = useInView(sceneRef, { amount: 0.3, once: true });

  const lineOne = useAnimationControls();
  const lineTwo = useAnimationControls();
  const lineThree = useAnimationControls();
  const cardFade = useAnimationControls();

  useEffect(() => {
    if (!isInView) return;
    const run = async () => {
      await lineOne.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.66, ease: "easeOut" },
      });
      await lineTwo.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.62, ease: "easeOut" },
      });
      await lineThree.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.58, ease: "easeOut" },
      });
      cardFade.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.1 },
      });
    };
    run();
  }, [isInView, lineOne, lineTwo, lineThree, cardFade]);

  const startHold = () => {
    if (hasRevealed) return;
    setIsHolding(true);
    // 1.8 seconds of intentional holding required
    holdTimer.current = setTimeout(() => {
      setHasRevealed(true);
      setIsHolding(false);
    }, 1800);
  };

  const endHold = () => {
    if (hasRevealed) return;
    setIsHolding(false);
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }
  };

  // Cleanup timer just in case
  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
    };
  }, []);

  return (
    <section
      id="personal-letter"
      ref={sceneRef}
      className="relative overflow-hidden px-4 py-28 sm:px-6 sm:py-36 min-h-[100dvh] flex flex-col justify-center"
    >
      {/* Light, breathable dawn gradient to dramatically soften the end of the page */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#211833_0%,#362852_50%,#54417A_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(229,212,255,0.12),transparent_40%),radial-gradient(circle_at_82%_78%,rgba(210,185,255,0.15),transparent_45%)]" />

      {/* Massively blown-out ambient glows to replace oppressive darkness with a magical illuminated mist */}
      <div className="pointer-events-none absolute -left-20 top-0 h-[600px] w-[600px] rounded-full bg-[#E5D4FF]/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[600px] w-[600px] rounded-full bg-[#D4BAFF]/25 blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={lineOne}
            className="text-[11px] uppercase tracking-[0.24em] text-[#E0D4F5]/90"
          >
            A NOTE FOR YOU
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={lineTwo}
            className="mt-4 font-serif text-[30px] leading-tight text-[#FFFFFF] sm:text-4xl drop-shadow-sm"
          >
            Something I didn’t want to just show…
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={lineThree}
            className="mt-4 font-serif text-[17px] italic tracking-wide text-[#EAE2F8]"
          >
            A private message entirely for you.
          </motion.p>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={cardFade}
          className={cn(
            "relative mx-auto mt-14 max-w-2xl overflow-hidden border border-violet-200/40 p-8 text-left sm:mt-16 sm:p-12",
            radii.card,
            "transition-all duration-1000 select-none",
            hasRevealed
              ? "cursor-default"
              : "cursor-pointer active:cursor-grabbing touch-none",
            isHolding || hasRevealed
              ? "bg-[linear-gradient(165deg,rgba(255,249,252,0.95),rgba(238,228,255,0.85))] shadow-[0_30px_60px_rgba(24,16,45,0.4),0_0_40px_rgba(217,195,247,0.3),inset_0_1px_1px_rgba(255,255,255,0.8)]"
              : "bg-[linear-gradient(165deg,rgba(255,249,252,0.65),rgba(238,228,255,0.5))] shadow-[0_16px_32px_rgba(24,16,45,0.2),inset_0_1px_1px_rgba(255,255,255,0.5)]",
          )}
          style={{
            transform: isHolding && !hasRevealed ? "scale(1.02)" : "scale(1)",
          }}
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          onTouchCancel={endHold}
        >
          {/* Aesthetic Quotes */}
          <span className="pointer-events-none absolute left-6 top-4 select-none font-serif text-6xl leading-none text-[#C4B2DF]/30 sm:text-7xl">
            “
          </span>
          <span className="pointer-events-none absolute bottom-4 right-8 select-none font-serif text-6xl leading-none text-[#C4B2DF]/30 sm:text-7xl">
            ”
          </span>

          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.5),transparent_50%)]" />

          {/* The Hidden Letter Content */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{
              opacity: hasRevealed ? 1 : isHolding ? 0.7 : 0.05,
              filter: hasRevealed
                ? "blur(0px)"
                : isHolding
                  ? "blur(3px)"
                  : "blur(12px)",
            }}
            transition={{
              duration: hasRevealed ? 1.2 : isHolding ? 1.8 : 0.6,
              ease: "easeOut",
            }}
            className="relative z-10 space-y-5 text-[15.5px] leading-relaxed text-[#4A3A70] sm:text-[16.5px]"
          >
            <p className="font-serif text-[1.2rem] text-[#3F2F64] sm:text-[1.3rem] mb-2">
              Dear thangoluuu 🤗,
            </p>

            <p>
              Therila, intha gifts, website laam unaku pidikkumoo illayo,
              <br className="hidden sm:block" /> but I wanted to make something
              special for you da.
            </p>

            <p>Pudikalana solliru da, return potaralam 🤭</p>

            <p>
              I hope this birthday brings you peace, laughter, warmth,
              <br className="hidden sm:block" /> and I hope you always remember
              how deeply special you are 🤗.
            </p>

            <p>
              Ethir paakatha nerathula,
              <br className="hidden sm:block" /> Ethir paakama kedacha thangom
              da neeyu enaku 💜.
            </p>

            <div className="pt-2">
              <p className="font-medium text-[#4F3B79]">
                Happy Birthday Thangoww✨
              </p>
              <p className="pt-1 font-serif text-[#5C467F]">— NONU</p>
            </div>

            <AnimatePresence>
              {hasRevealed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="pt-6 text-center text-[12px] italic tracking-wide text-[#8C7AAB]/80"
                >
                  This one was always meant for you…
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* The Interactive Fog / Call to Action */}
          <AnimatePresence>
            {!hasRevealed && (
              <motion.div
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-white/10 backdrop-blur-[2px]"
                style={{ pointerEvents: "none" }}
              >
                <motion.div
                  animate={{
                    opacity: isHolding ? 0 : 1,
                    scale: isHolding ? 1.1 : 1,
                    y: isHolding ? -10 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/30 border border-white/50 text-[#5C467F] shadow-[0_8px_32px_rgba(30,20,50,0.1),inset_0_1px_2px_rgba(255,255,255,0.8)] mb-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                    >
                      💌
                    </motion.div>
                  </div>
                  <h3 className="font-serif text-[22px] text-[#3F2F64] drop-shadow-sm">
                    Hold to read
                  </h3>
                  <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-[#5C467F]/70 font-medium">
                    Do not let go
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.article>
      </div>
    </section>
  );
}

export default PersonalLetter;
