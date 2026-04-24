import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const PARTICLES = [
  { type: 'heart', x: 5, delay: 0.2, dur: 15, size: 20 },
  { type: 'sparkle', x: 12, delay: 1.5, dur: 10, size: 14 },
  { type: 'heart', x: 18, delay: 3.1, dur: 18, size: 28 },
  { type: 'balloon', x: 22, delay: 0.8, dur: 22, size: 45 },
  { type: 'heart', x: 30, delay: 2.2, dur: 14, size: 18 },
  { type: 'sparkle', x: 38, delay: 4.1, dur: 11, size: 16 },
  { type: 'balloon', x: 45, delay: 2.5, dur: 26, size: 35 },
  { type: 'heart', x: 50, delay: 1.1, dur: 16, size: 24 },
  { type: 'sparkle', x: 58, delay: 0.4, dur: 12, size: 18 },
  { type: 'heart', x: 65, delay: 3.8, dur: 17, size: 22 },
  { type: 'balloon', x: 72, delay: 1.8, dur: 24, size: 40 },
  { type: 'heart', x: 78, delay: 0.9, dur: 13, size: 26 },
  { type: 'sparkle', x: 82, delay: 2.9, dur: 10, size: 14 },
  { type: 'heart', x: 88, delay: 4.5, dur: 15, size: 16 },
  { type: 'balloon', x: 92, delay: 3.2, dur: 23, size: 38 },
  { type: 'heart', x: 96, delay: 1.6, dur: 17, size: 20 },
  // Second wave
  { type: 'heart', x: 10, delay: 6.2, dur: 16, size: 18 },
  { type: 'sparkle', x: 25, delay: 7.1, dur: 12, size: 12 },
  { type: 'heart', x: 40, delay: 5.8, dur: 19, size: 25 },
  { type: 'balloon', x: 55, delay: 6.5, dur: 28, size: 42 },
  { type: 'heart', x: 70, delay: 7.2, dur: 14, size: 18 },
  { type: 'sparkle', x: 85, delay: 6.4, dur: 11, size: 16 }
];

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      {PARTICLES.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: "110vh" }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            y: "-120vh",
            x: ["0px", "30px", "-20px", "10px"]
          }}
          transition={{
            duration: item.dur,
            delay: item.delay,
            ease: "linear",
            repeat: Infinity
          }}
          className="absolute bottom-0"
          style={{ left: `${item.x}%` }}
        >
          {item.type === 'heart' && <Heart className="fill-[#E5D4FF] text-[#E5D4FF]" size={item.size} strokeWidth={1} style={{ opacity: 0.4 }} />}
          {item.type === 'sparkle' && <Sparkles className="text-white" size={item.size} strokeWidth={1.5} style={{ opacity: 0.7 }} />}
          {item.type === 'balloon' && (
            <svg width={item.size} height={item.size * 1.5} viewBox="0 0 40 60" className="opacity-40 shadow-sm">
              <ellipse cx="20" cy="20" rx="16" ry="20" fill="url(#balloon-grad)" />
              <path d="M20 40 L16 46 L24 46 Z" fill="#D4BAFF" opacity="0.85" />
              <path d="M20 46 Q15 55 25 60 Q15 65 20 70" stroke="#E5D4FF" fill="none" strokeWidth="1" strokeOpacity="0.85" />
              <defs>
                <radialGradient id="balloon-grad" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#D4BAFF" />
                </radialGradient>
              </defs>
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function FinalSection() {
  const [showFinalNote, setShowFinalNote] = useState(false);

  useEffect(() => {
    if (showFinalNote) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [showFinalNote]);

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section
      id="final-ending"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(216,204,255,0.22),transparent_38%),radial-gradient(circle_at_78%_76%,rgba(179,157,219,0.18),transparent_42%),linear-gradient(170deg,rgba(25,18,44,0.95),rgba(44,32,77,0.94),rgba(61,46,103,0.95))]" />
      <div className="pointer-events-none absolute -left-10 top-16 h-44 w-44 rounded-full bg-[#D8CCFF]/18 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-18 h-48 w-48 rounded-full bg-[#B39DDB]/18 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.72, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-3xl text-center"
      >
        <motion.span
          className="pointer-events-none absolute left-1/2 top-[-1.9rem] h-10 w-10 -translate-x-1/2 text-[#E6DBFF]/58"
          animate={{ y: [0, -4, 0], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          ✦
        </motion.span>

        <p className="text-[11px] uppercase tracking-[0.24em] text-[#D8CAF2]/86">
          FOR YOU
        </p>

        <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl leading-tight text-[#F7F2FF] sm:text-4xl">
          You deserve beautiful things, always.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-[#DED2F4]/92 sm:text-base">
          Thank you for being you.
          {"\n"}
          I just wanted to make something that would make you smile today.
        </p>

        <motion.button
          type="button"
          onClick={() => setShowFinalNote(true)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-9 inline-flex items-center justify-center rounded-full border border-violet-200/56 bg-[linear-gradient(140deg,rgba(241,232,255,0.36),rgba(131,104,198,0.46))] px-8 py-3 text-sm font-medium text-[#F8F2FF] shadow-[0_16px_34px_rgba(23,16,45,0.42)] transition-colors hover:border-violet-200/74"
        >
          One last thing 💌
        </motion.button>
      </motion.div>

      {/* FULL SCREEN CHOREOGRAPHED CELEBRATION MODAL */}
      <AnimatePresence>
        {showFinalNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#171026]/85 backdrop-blur-2xl px-4 cursor-pointer"
            onClick={() => setShowFinalNote(false)}
          >
            {/* Vignette and Haze Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(15,10,30,0.85)_100%)] pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(179,157,219,0.12),transparent_70%)] pointer-events-none z-0" />

            {/* Central Bloom/Spark before the card arrives */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E5D4FF] rounded-full blur-[80px] z-0 pointer-events-none mix-blend-screen"
            />

            <FloatingParticles />

            {/* The Special Breathing Card */}
            <motion.article
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }} // Soft cinematic spring-like ease
              className="relative z-10 w-full max-w-md cursor-default pt-4"
              onClick={(e) => e.stopPropagation()} // Prevent card clicks from closing immediately to ensure they stay
            >
              {/* Infinite Breathing Wrapper */}
              <motion.div
                animate={{ scale: [1, 1.035, 1], y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="relative border border-white/40 bg-[linear-gradient(150deg,rgba(255,255,255,0.92),rgba(240,230,255,0.75))] p-10 sm:p-12 text-center rounded-[32px] overflow-hidden shadow-[0_40px_100px_rgba(15,10,30,0.8),inset_0_1px_4px_rgba(255,255,255,1)] backdrop-blur-3xl"
              >
                {/* Inner glowing core for the card */}
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(229,212,255,0.7),transparent_75%)] mix-blend-multiply opacity-60" />

                {/* Staggered Text Reveal Sequence */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.4, delayChildren: 1.5 } }
                  }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <motion.span variants={textVariants} className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/50 border border-[#D4BAFF]/50 shadow-[0_4px_24px_rgba(179,157,219,0.3)]">
                    <Heart className="text-[#9D7ECC] h-6 w-6 fill-[#9D7ECC]" strokeWidth={1.5} />
                  </motion.span>

                  <motion.h2 variants={textVariants} className="font-serif text-[32px] sm:text-[38px] text-[#3F2F64] leading-tight mb-3 drop-shadow-sm mt-3">
                    Love uu Thangoww ✨
                  </motion.h2>

                  <motion.p variants={textVariants} className="text-[16px] italic text-[#6C5592]/90 font-serif mb-6">
                    Once again… Happy Birthday 🥳
                  </motion.p>

                  <motion.div variants={textVariants} className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#8B75B5]/30 to-transparent mb-7" />

                  <motion.p variants={textVariants} className="text-[15px] sm:text-[16px] text-[#4A3A70] leading-relaxed max-w-[260px] mb-8">
                    I just wanted to leave a smile for you here.
                  </motion.p>

                  <motion.p variants={textVariants} className="font-serif text-[18px] text-[#3F2F64] font-medium tracking-wide">
                    — From your NONU 💌
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.article>

            {/* Subtle stay message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.4, 1] }}
              transition={{ delay: 5.0, duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.2em] text-[#E5D4FF]/80 uppercase text-center w-full select-none pointer-events-none"
            >
              Stay here for a moment 💜
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default FinalSection;
