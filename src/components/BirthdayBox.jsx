import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useAnimationControls, useInView } from "framer-motion";
import { Gift, Sparkles, Star } from "lucide-react";
import { cn } from "../lib/cn";
import { radii } from "../lib/theme";

const MAIN_GIFT = {
  id: "main-bag",
  title: "The one that hides the rest",
  description: "I wanted the first thing you opened to feel beautiful… and inside it, a few more little surprises waited for you.",
};

const INNER_GIFTS = [
  {
    id: "dresses",
    title: "A little pretty",
    description: "Something chosen for days you want to feel extra lovely.",
    footer: "You'll know when you see it ✨"
  },
  {
    id: "necklace",
    title: "Something that shines",
    description: "A tiny sparkle meant to stay close.",
    footer: "Waiting inside for your smile"
  },
  {
    id: "makeup",
    title: "A little glam",
    description: "For your soft, pretty, getting-ready moments.",
    footer: "A little surprise, chosen carefully"
  },
  {
    id: "chocolate",
    title: "Something sweet",
    description: "Because birthdays deserve at least one sweet little thing.",
    footer: "Wrapped with a little sugar 🎀"
  },
  {
    id: "lamp",
    title: "A little us",
    description: "A small glowing piece of ‘us’ to keep nearby.",
    footer: "Waiting to glow ✨"
  },
];

// Beautifully chaotic, organic pile coordinates mimicking dropped polaroids or gift tags
const SCATTER_POSITIONS = [
  { x: -18, y: -120, rotate: -7 },  // Back top left 
  { x: 28, y: -65, rotate: 6 },     // Mid top right
  { x: -35, y: -10, rotate: -5 },   // Mid bottom left
  { x: 22, y: 55, rotate: 9 },      // Mid bottom right
  { x: -8, y: 120, rotate: -3 },    // Front bottom center 
];

function InnerScatterGift({ gift, index, isActive, hasActive, onClick }) {
  const pos = SCATTER_POSITIONS[index] || SCATTER_POSITIONS[0];

  return (
    <motion.article
      layout
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      initial={{ opacity: 0, scale: 0.8, x: pos.x, y: pos.y - 40 }}
      animate={{
        opacity: isActive ? 1 : hasActive ? 0.45 : 0.95,
        scale: isActive ? 1.05 : hasActive ? 0.95 : 1,
        x: isActive ? 0 : pos.x,
        y: isActive ? 0 : pos.y,
        rotate: isActive ? 0 : pos.rotate,
        zIndex: isActive ? 50 : 10 + index, 
        filter: hasActive && !isActive ? "blur(1px) brightness(0.9)" : "blur(0px) brightness(1)",
      }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 24,
        mass: 1.2,
        delay: isActive ? 0 : index * 0.08, 
      }}
      whileHover={{ scale: isActive ? 1.05 : 1.02 }}
      className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[320px] cursor-pointer",
        "flex flex-col justify-center overflow-hidden border p-5 sm:p-7 min-h-[160px]",
        radii.card,
        isActive 
          ? "bg-[linear-gradient(135deg,rgba(43,29,66,0.9),rgba(57,39,89,0.95))] border-[#E5D4FF]/70 shadow-[0_24px_54px_rgba(20,10,40,0.5),0_0_40px_rgba(229,212,255,0.25),inset_0_1px_2px_rgba(255,255,255,0.4)]"
          : "bg-[linear-gradient(135deg,rgba(255,255,255,0.15),rgba(240,230,255,0.06))] border-white/[0.25] shadow-[0_12px_24px_-8px_rgba(20,10,40,0.25)]",
        "backdrop-blur-2xl"
      )}
    >
      <div className={cn(
        "pointer-events-none absolute inset-0 transition-opacity duration-1000 mix-blend-screen",
        isActive ? "opacity-100" : "opacity-0"
      )}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(229,212,255,0.25),transparent_75%)]" />
      </div>

      <AnimatePresence mode="wait">
        {!isActive ? (
          <motion.div
            key="scatter-teaser"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center text-center space-y-3 z-10"
          >
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white/10 border border-white/20 text-[#FFFFFF] shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.3)]">
              <Gift size={18} strokeWidth={1.5} />
            </div>
            <h4 className="font-serif text-[16px] leading-snug text-[#FFFFFF] sm:text-[18px] drop-shadow-sm">
              {gift.title}
            </h4>
          </motion.div>
        ) : (
          <motion.div
            key="scatter-reveal"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center z-10 w-full"
          >
            <div className="relative flex items-center justify-center text-[#FFFFFF] mb-3">
              <motion.div 
                animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-40 blur-sm bg-white rounded-full"
              />
              <Star size={20} strokeWidth={1.5} className="fill-[#E5D4FF] text-[#E5D4FF] relative z-10" />
            </div>
            <h4 className="font-serif text-[20px] leading-tight text-white drop-shadow-md sm:text-[22px]">
              {gift.title}
            </h4>
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto my-3" />
            <p className="text-[14.5px] leading-relaxed italic text-[#F8F4FF]/90 max-w-[95%]">
              &quot;{gift.description}&quot;
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-[10px] tracking-[0.15em] text-[#D8CCE8] uppercase bg-white/10 px-3 py-1.5 rounded-full border border-white/15 shadow-sm">
              {gift.footer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function BirthdayBox() {
  const [isMainOpened, setIsMainOpened] = useState(false);
  const [activeGiftIndex, setActiveGiftIndex] = useState(null);

  const sceneRef = useRef(null);
  const isInView = useInView(sceneRef, { amount: 0.3, once: true });
  
  const lineOne = useAnimationControls();
  const lineTwo = useAnimationControls();
  const lineThree = useAnimationControls();
  const boxFade = useAnimationControls();

  useEffect(() => {
    if (!isInView) return;
    const run = async () => {
      await lineOne.start({ opacity: 1, y: 0, transition: { duration: 0.66, ease: "easeOut" } });
      await lineTwo.start({ opacity: 1, y: 0, transition: { duration: 0.62, ease: "easeOut" } });
      await lineThree.start({ opacity: 1, y: 0, transition: { duration: 0.58, ease: "easeOut" } });
      boxFade.start({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: "easeOut", delay: 0.2 } });
    };
    run();
  }, [isInView, lineOne, lineTwo, lineThree, boxFade]);

  return (
    <section 
      id="birthday-box" 
      ref={sceneRef}
      onClick={() => setActiveGiftIndex(null)}
      className="relative px-4 py-32 sm:px-6 sm:py-48 min-h-[100dvh] flex flex-col justify-center overflow-hidden" 
    >
      {/* Lightened elegant twilight atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[#211833]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(229,212,255,0.08),transparent_40%),radial-gradient(circle_at_82%_76%,rgba(196,168,255,0.08),transparent_40%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[500px] w-[90vw] max-w-[700px] rounded-full bg-[#E5D4FF]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={lineOne}
            className="text-[11px] uppercase tracking-[0.24em] text-[#D8CAF2]/80"
          >
            SPECIAL DELIVERY
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            animate={lineTwo}
            className="mt-4 font-serif text-[30px] leading-tight text-[#FFFFFF] sm:text-4xl drop-shadow-sm"
          >
            A little birthday box, made for you.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={lineThree}
            className="mt-4 font-serif text-[17px] italic tracking-wide text-[#E5D9F2]"
          >
            Wrapped with love… and a few secrets inside.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={boxFade}
          className="mt-14 w-full"
        >
          {/* THE OUTER GIFT (ZOUK BAG) */}
          <motion.article
            layout
            onClick={(e) => {
              e.stopPropagation();
              setIsMainOpened(true);
            }}
            className={cn(
              "relative mx-auto w-full max-w-2xl overflow-hidden border p-8 sm:p-12 cursor-pointer",
              radii.card,
              isMainOpened 
                ? "bg-[linear-gradient(135deg,rgba(48,34,74,0.9),rgba(34,23,54,0.95))] border-[#D4C3EF]/40 shadow-[0_30px_60px_rgba(20,10,40,0.4),0_0_50px_rgba(180,150,240,0.15),inset_0_1px_1px_rgba(255,255,255,0.25)] cursor-default"
                : "bg-[linear-gradient(160deg,rgba(255,255,255,0.14),rgba(240,230,255,0.06))] border-white/[0.3] hover:border-white/[0.45] shadow-[0_24px_48px_-12px_rgba(20,10,40,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)]",
              "transition-all duration-1000 backdrop-blur-2xl z-20"
            )}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.15),transparent_60%)] mix-blend-overlay" />

            <AnimatePresence mode="wait">
              {!isMainOpened ? (
                <motion.div
                  key="main-teaser"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center space-y-5"
                >
                  <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/15 border border-white/30 text-[#FFFFFF] shadow-[0_8px_24px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.5)]"
                  >
                    <Gift size={28} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-serif text-[24px] leading-tight text-[#FFFFFF] sm:text-[28px] drop-shadow-md">
                    Tap to open your present
                  </h3>
                  <span className="inline-block mt-4 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-[11px] tracking-[0.24em] text-[#FFFFFF] transition-colors hover:bg-white/20 uppercase font-medium shadow-sm">
                    Open The Box
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="main-reveal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className="flex flex-col items-center text-center w-full"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="flex justify-center mb-4 text-[#E5D4FF]"
                  >
                     <Sparkles size={24} strokeWidth={1.5} />
                  </motion.div>
                  <p className="text-[11px] tracking-[0.24em] text-[#D8CAF2]/80 uppercase mb-4">
                    The Outer Gift
                  </p>
                  <h3 className="font-serif text-[26px] leading-tight text-[#FFFFFF] sm:text-[32px] drop-shadow-md">
                    {MAIN_GIFT.title}
                  </h3>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mt-6 mb-5" />
                  <p className="text-[15.5px] leading-relaxed italic text-[#F8F4FF]/90 max-w-md mx-auto">
                    &quot;{MAIN_GIFT.description}&quot;
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>

          {/* THE LIGHTER HANDCRAFTED SCATTER DESK */}
          <AnimatePresence>
            {isMainOpened && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 480 }} 
                transition={{ duration: 1, ease: "easeInOut" }}
                className="relative mx-auto w-full max-w-3xl mt-2 sm:mt-8"
              >
                {INNER_GIFTS.map((gift, i) => (
                   <InnerScatterGift 
                     key={gift.id} 
                     gift={gift} 
                     index={i} 
                     isActive={activeGiftIndex === i}
                     hasActive={activeGiftIndex !== null}
                     onClick={() => setActiveGiftIndex(prev => prev === i ? null : i)}
                   />
                ))}
                
                {/* Instructive highly legible hint below the scatter stack */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeGiftIndex === null ? 1 : 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10.5px] tracking-[0.2em] uppercase text-[#E5D9F2]/70 text-center w-full drop-shadow-sm font-medium"
                >
                  Find the hidden surprises inside
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}

export default BirthdayBox;
