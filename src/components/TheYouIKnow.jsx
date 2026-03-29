import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimationControls, useInView } from "framer-motion";
import { cn } from "../lib/cn";
import { radii } from "../lib/theme";

const MEMORIES = [
  {
    title: "The way you call me ‘NONU’",
    text: "I don’t know when it became special… but the way you call me that just stayed with me.",
    tag: "always noticed ✨",
    rotate: -1.5,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E2D6F7]/60">
        <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" fill="currentColor" fillOpacity="0.2"/>
      </svg>
    ),
  },
  {
    title: "The care you give quietly",
    text: "Maybe you don’t even realize it, but your care has reached me more than once.",
    tag: "very you 💌",
    rotate: 2,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E2D6F7]/60">
        <path d="M4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7M4 7L12 12.5L20 7"/>
      </svg>
    ),
  },
  {
    title: "That cute smile of yours",
    text: "You probably don’t know this, but that smile has saved your side in many arguments.",
    tag: "still true 🤍",
    rotate: -2.5,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E2D6F7]/60">
        <path d="M12 21.5C12 21.5 20.5 15.5 20.5 9.5C20.5 6.04822 17.5518 3 13.9 3C12.5484 3 11 4 12 5.5C13 4 11.4516 3 10.1 3C6.44822 3 3.5 6.04822 3.5 9.5C3.5 15.5 12 21.5 12 21.5Z" fill="currentColor" fillOpacity="0.1"/>
      </svg>
    ),
  },
  {
    title: "That strict version of you",
    text: "I act annoyed sometimes… but somehow I still end up listening to you.",
    tag: "favorite 👑",
    rotate: 1.5,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E2D6F7]/60">
        <path d="M4 19L5.5 7L12 12L18.5 7L20 19H4Z" fill="currentColor" fillOpacity="0.1"/>
      </svg>
    ),
  },
  {
    title: "The way we still find our way back",
    text: "No matter how messy things get, I like that we’ve never really chosen to leave.",
    tag: "always ♾️",
    rotate: -1,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E2D6F7]/60">
        <path d="M8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 13.7909 8 16C8 18.2091 9.79086 20 12 20C14.2091 20 16 18.2091 16 16" strokeDasharray="4 4"/>
      </svg>
    ),
  },
];

function TheYouIKnow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasStacked, setHasStacked] = useState(false);
  
  const sceneRef = useRef(null);
  const isInView = useInView(sceneRef, { amount: 0.3, once: true });

  const lineOne = useAnimationControls();
  const lineTwo = useAnimationControls();
  const lineThree = useAnimationControls();
  const nextBtn = useAnimationControls();

  useEffect(() => {
    if (!isInView) return;

    const run = async () => {
      await lineOne.start({ opacity: 1, y: 0, transition: { duration: 0.66, ease: "easeOut" } });
      await lineTwo.start({ opacity: 1, y: 0, transition: { duration: 0.62, ease: "easeOut" } });
      await lineThree.start({ opacity: 1, y: 0, transition: { duration: 0.58, ease: "easeOut" } });
      
      // Trigger card stacking sequence
      setIsRevealed(true);
      
      // Calculate total duration for stacking sequence (0.6s max delay + 0.8s slide duration = 1.4s)
      setTimeout(() => setHasStacked(true), 1400);

      // Cue the final "next" button after the stack finishes
      await nextBtn.start({ opacity: 1, transition: { duration: 0.6, delay: 1.4, ease: "easeOut" } });
    };

    run();
  }, [isInView, lineOne, lineTwo, lineThree, nextBtn]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MEMORIES.length);
  };

  return (
    <section
      id="the-you-i-know"
      ref={sceneRef}
      className="relative overflow-hidden px-5 py-24 sm:px-6 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(216,204,255,0.15),transparent_36%),radial-gradient(circle_at_80%_74%,rgba(179,157,219,0.12),transparent_40%),linear-gradient(170deg,rgba(25,18,44,0.97),rgba(45,33,79,0.96),rgba(63,47,106,0.97))]" />
      <div className="pointer-events-none absolute -left-16 top-18 h-52 w-52 rounded-full bg-[#D8CCFF]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-14 h-56 w-56 rounded-full bg-[#B39DDB]/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={lineOne}
            className="text-[11px] uppercase tracking-[0.3em] text-[#D7C9F2]/60"
          >
            THE LITTLE THINGS
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={lineTwo}
            className="mt-4 font-serif text-3xl leading-tight tracking-[0.02em] text-[#F7F2FF] sm:text-4xl"
          >
            Things about you that stayed with me
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={lineThree}
            className="mx-auto mt-4 max-w-xl text-sm italic leading-relaxed text-[#DDD0F4]/80 sm:text-[15px]"
          >
            Not big reasons. Just very &apos;you&apos; reasons.
          </motion.p>
        </div>

        {/* 3D Scattered Stack of Keepsake Notes */}
        <div className="relative mx-auto mt-14 mb-16 flex h-[360px] max-w-sm items-center justify-center sm:mt-16 sm:h-[400px]">
          <AnimatePresence mode="popLayout">
            {MEMORIES.map((item, index) => {
              const diff = (index - currentIndex + MEMORIES.length) % MEMORIES.length;
              if (diff > 2 && diff !== MEMORIES.length - 1) return null;

              const isExiting = diff === MEMORIES.length - 1;
              const visualDiff = isExiting ? -1 : diff;

              // Calculate scattered rotation to make it feel like a physical pile
              const activeRotation = visualDiff === 0 
                ? item.rotate 
                : visualDiff === 1 
                  ? -item.rotate * 1.5 
                  : visualDiff === 2 
                    ? item.rotate * 2 
                    : item.rotate;

              // The bottom card (2) appears first, then the middle card (1), then the top card (0).
              const introDelay = visualDiff === 2 ? 0 : visualDiff === 1 ? 0.3 : visualDiff === 0 ? 0.6 : 0;

              return (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.85, y: 80, rotate: activeRotation - 5 }}
                  animate={{
                    opacity: isRevealed ? (visualDiff === 0 ? 1 : visualDiff === 1 ? 0.75 : visualDiff === 2 ? 0.3 : 0) : 0,
                    scale: isRevealed ? (visualDiff === 0 ? 1 : visualDiff === 1 ? 0.95 : visualDiff === 2 ? 0.9 : 1.05) : 0.85,
                    y: isRevealed ? (visualDiff === 0 ? 0 : visualDiff === 1 ? 26 : visualDiff === 2 ? 52 : -60) : 80,
                    rotate: activeRotation,
                    zIndex: MEMORIES.length - visualDiff,
                    pointerEvents: isRevealed && visualDiff === 0 ? "auto" : "none",
                    filter: isRevealed ? (visualDiff === 0 ? "blur(0px)" : "blur(1.5px)") : "blur(6px)",
                  }}
                  exit={{ opacity: 0, scale: 1.05, y: -60, rotate: activeRotation - 3, filter: "blur(4px)" }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1], // Dreamy, floaty ease
                    delay: !hasStacked && isRevealed ? introDelay : 0 // Apply sequential intro delays ONLY on initial entrance
                  }}
                  className={cn(
                    "absolute w-full origin-bottom overflow-hidden cursor-pointer border p-7 sm:p-9",
                    radii.card,
                    "border-[#E5D8FF]/15 bg-[linear-gradient(145deg,rgba(243,234,255,0.06),rgba(190,170,230,0.03))] shadow-[0_24px_50px_rgba(20,10,45,0.25),inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-[40px] transition-colors hover:border-[#E5D8FF]/30"
                  )}
                  onClick={visualDiff === 0 ? handleNext : undefined}
                >
                  {/* Soft top-left moonlit sheen */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_65%)] mix-blend-overlay" />

                  <div className={cn(
                    "relative flex flex-col items-center text-center transition-opacity duration-300",
                    visualDiff === 0 ? "opacity-100 delay-200" : "opacity-0"
                  )}>
                    {/* Emotional Micro-Tag */}
                    <p className="mb-4 font-serif text-[13px] italic text-[#D8CCEE]/90 drop-shadow-sm sm:mb-5">
                      ~ {item.tag} ~
                    </p>
                    
                    {/* Note Icon */}
                    <div className="mb-4 flex items-center justify-center sm:mb-5">
                      {item.icon}
                    </div>
                    
                    <h3 className="font-serif text-[20px] leading-tight text-white drop-shadow-md sm:text-[22px]">
                      {item.title}
                    </h3>
                    
                    <p className="mt-5 text-[15px] leading-relaxed text-[#D8CCEF]/95 sm:text-[16px]">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Poetic Next Indicator */}
        <motion.div 
          className="mx-auto flex justify-center"
          initial={{ opacity: 0 }}
          animate={nextBtn}
        >
          <button 
            onClick={handleNext}
            className="group flex items-center gap-2 font-serif text-[14px] italic text-[#b098ff]/70 transition-colors hover:text-[#b098ff]/100 sm:text-[15px]"
          >
            next little memory 
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default TheYouIKnow;
