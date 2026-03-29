import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "../../lib/cn";

import imgBeach from "../../assets/candid-in-beach.jpeg";
import imgHimalayas from "../../assets/candid-in-himalayas.jpeg";
import imgSmiling from "../../assets/candid-kind-smiling.jpeg";
import imgPortrait from "../../assets/poratrait-smiling.jpeg";
import imgHeartHands from "../../assets/showing-heart-hands.jpeg";

const PARTICLES = [
  { className: "left-[9%] top-[14%]", size: 6, delay: 0.1, duration: 9.4 },
  { className: "right-[12%] top-[21%]", size: 5, delay: 1.2, duration: 10.2 },
  { className: "left-[18%] bottom-[22%]", size: 4, delay: 0.7, duration: 8.8 },
  {
    className: "right-[18%] bottom-[16%]",
    size: 5,
    delay: 1.5,
    duration: 10.8,
  },
  { className: "left-[50%] top-[9%]", size: 3, delay: 0.4, duration: 8.4 },
  { className: "right-[46%] bottom-[9%]", size: 3, delay: 0.9, duration: 9.2 },
];

const BACKGROUND_PHOTOS = [
  {
    src: imgHeartHands,
    className:
      "left-[0%] sm:left-[4%] top-[6%] sm:top-[6%] w-[200px] sm:w-[260px] -rotate-3",
    delay: 0,
    opacity: "opacity-[0.2]",
  },
  {
    src: imgPortrait,
    className:
      "right-[-2%] sm:right-[6%] top-[5%] sm:top-[12%] w-[210px] sm:w-[300px] rotate-6",
    delay: 0.3,
    opacity: "opacity-[0.3]",
  },
  {
    src: imgBeach,
    className:
      "left-1/2 -translate-x-1/2 bottom-[0%] sm:bottom-[10%] w-[220px] sm:w-[260px] rotate-2",
    delay: 0.5,
    opacity: "opacity-[0.25]",
  },
  {
    src: imgSmiling,
    className:
      "left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] w-[280px] sm:w-[480px] rotate-1 blur-[6px] sm:blur-[8px]",
    delay: 1,
    opacity: "opacity-[0.06]",
  },
];

function RevealIntro() {
  const sceneRef = useRef(null);
  const isInView = useInView(sceneRef, { amount: 0.6, once: true });

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  const yParallax = [
    useTransform(scrollYProgress, [0, 1], [0, -70]),
    useTransform(scrollYProgress, [0, 1], [0, 50]),
    useTransform(scrollYProgress, [0, 1], [0, -40]),
    useTransform(scrollYProgress, [0, 1], [0, -20]),
  ];

  return (
    <section
      id="reveal-intro"
      ref={sceneRef}
      className="relative overflow-clip bg-[#1A1330]"
    >
      <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24 text-center sm:min-h-screen sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(189,165,255,0.2),transparent_38%),radial-gradient(circle_at_50%_40%,rgba(163,139,228,0.18),transparent_44%),radial-gradient(circle_at_86%_84%,rgba(130,103,199,0.22),transparent_42%),linear-gradient(172deg,#18112D_0%,#251B43_50%,#322454_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_46%)]" />

        {/* Soft Background Photo Composition */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {BACKGROUND_PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              className={cn("absolute", photo.className)}
              style={{ y: yParallax[i] }}
              initial={{ opacity: 0, filter: "blur(12px)" }}
              animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
              transition={{
                duration: 3,
                delay: 0.8 + photo.delay,
                ease: "easeOut",
              }}
            >
              <div
                className={cn(
                  "relative overflow-hidden mix-blend-luminosity",
                  photo.opacity,
                )}
                style={{
                  maskImage:
                    "radial-gradient(circle at center, black 30%, transparent 75%)",
                  WebkitMaskImage:
                    "radial-gradient(circle at center, black 30%, transparent 75%)",
                }}
              >
                <img
                  src={photo.src}
                  alt=""
                  className="w-full h-auto object-cover grayscale-[0.6] sepia-[0.3]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#A38BE4] mix-blend-color" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.span
          className="pointer-events-none absolute left-1/2 top-[48%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CAB2FF]/26 blur-[120px]"
          animate={{ opacity: [0.22, 0.42, 0.22], scale: [0.94, 1.05, 0.94] }}
          transition={{ duration: 8.6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.span
          className="pointer-events-none absolute right-[14%] top-[17%] text-[34px] text-[#EBDFFF]/16"
          animate={{ y: [0, -7, 0], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 10.2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          ♡
        </motion.span>

        <motion.svg
          className="pointer-events-none absolute right-[10%] top-[10%] h-12 w-8 text-[#E6D8FF]/18"
          viewBox="0 0 24 38"
          fill="none"
          animate={{ y: [0, -5, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ellipse
            cx="12"
            cy="12"
            rx="7.2"
            ry="9.4"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M12 21.6C11.5 23.8 11.6 25.9 12.4 28.2C13 30.1 12.6 32.5 11.3 35"
            stroke="currentColor"
            strokeWidth="1.05"
            strokeLinecap="round"
          />
        </motion.svg>

        {/* Subtle background hearts */}
        <motion.svg
          className="pointer-events-none absolute left-[15%] top-[25%] h-14 w-10 text-[#E6D8FF]/10"
          viewBox="0 0 24 38"
          fill="none"
          animate={{ y: [0, -6, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ellipse
            cx="12"
            cy="12"
            rx="7.2"
            ry="9.4"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path
            d="M12 21.6C11.5 23.8 11.6 25.9 12.4 28.2C13 30.1 12.6 32.5 11.3 35"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </motion.svg>
        <motion.svg
          className="pointer-events-none absolute bottom-[30%] right-[18%] h-10 w-7 text-[#E6D8FF]/10"
          viewBox="0 0 24 38"
          fill="none"
          animate={{ y: [0, 5, 0], opacity: [0.04, 0.12, 0.04] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          aria-hidden="true"
        >
          <ellipse
            cx="12"
            cy="12"
            rx="7.2"
            ry="9.4"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path
            d="M12 21.6C11.5 23.8 11.6 25.9 12.4 28.2C13 30.1 12.6 32.5 11.3 35"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </motion.svg>

        {PARTICLES.map((item) => (
          <motion.span
            key={item.className}
            className={cn(
              "pointer-events-none absolute rounded-full bg-[#F0E7FF]/72 shadow-[0_0_14px_rgba(215,197,255,0.45)]",
              item.className,
            )}
            style={{ width: item.size, height: item.size }}
            animate={{ y: [0, -9, 0], opacity: [0.08, 0.26, 0.08] }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 mx-auto -mt-12 flex w-full max-w-3xl flex-col items-center sm:-mt-16"
        >
          <p className="mb-2 font-serif text-[12px] italic text-[#E5D8FF]/60 sm:text-[14px]">
            made with love, just for you
          </p>
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#D7C7FF]/80">
            A MOMENT FOR YOU
          </p>

          {/* ── Birthday emotional center ── */}
          <div className="relative mt-5 flex flex-col items-center sm:mt-6">
            {/* Soft Aura Bloom behind name */}
            <motion.span
              className="pointer-events-none absolute left-1/2 top-[50%] h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-[100%]"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(190,140,255,0.25) 0%, rgba(130,80,220,0.08) 45%, transparent 70%)",
                filter: "blur(40px)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView
                  ? { opacity: [0, 0.7, 0.4], scale: [0.8, 1.05, 1] }
                  : {}
              }
              transition={{
                delay: 0.6,
                duration: 2.2,
                ease: "easeOut",
                times: [0, 0.5, 1],
              }}
            />

            {/* Emotional micro-line */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="mt-2 text-center font-serif text-[13px] italic tracking-wide text-[#E5D8FF]/70 sm:text-[15px]"
            >
              HAPPY BIRTHDAY
            </motion.p>

            {/* Name "VARSHA" */}
            <motion.div
              className="relative -mt-2 select-none sm:-mt-1"
              initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)", y: 10 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }
                  : {}
              }
              transition={{
                delay: 0.42,
                duration: 1.4,
                ease: [0.22, 0.8, 0.36, 1],
              }}
            >
              {/* Glow — single soft pulse then settle */}
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(190,140,255,0.55) 0%, transparent 70%)",
                  filter: "blur(24px)",
                }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: [0, 1, 0.5, 0.25] } : {}}
                transition={{
                  delay: 1.1,
                  duration: 2.4,
                  ease: "easeOut",
                  times: [0, 0.32, 0.62, 1],
                }}
              />

              {/* Floating name with shimmer effect */}
              <div className="relative">
                <motion.span
                  animate={isInView ? { y: [0, -4, 0] } : {}}
                  transition={{
                    delay: 2.2,
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative inline-block font-serif text-[3.2rem] tracking-[0.2em] text-[#FDFBFF] sm:text-[4.2rem]"
                  style={{
                    textShadow:
                      "0 0 40px rgba(220,180,255,0.4), 0 4px 16px rgba(120,80,220,0.3)",
                  }}
                >
                  VARSHA
                </motion.span>

                {/* Subtle shimmer sweep overlay */}
                <motion.span
                  className="pointer-events-none absolute inset-0 block bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_auto] bg-clip-text font-serif text-[3.2rem] tracking-[0.2em] text-transparent sm:text-[4.2rem]"
                  animate={
                    isInView
                      ? { backgroundPosition: ["200% center", "-200% center"] }
                      : {}
                  }
                  transition={{
                    delay: 3,
                    duration: 7,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  aria-hidden="true"
                >
                  VARSHA
                </motion.span>
                {/* Magical cluster */}
                <motion.div
                  className="absolute -right-6 -top-4 sm:-right-8 sm:-top-5"
                  initial={{ opacity: 0, scale: 0, rotate: -15 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{
                    delay: 2.4,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Heart
                    className="h-5 w-5 text-violet-300/40 fill-violet-300/10 sm:h-[22px] sm:w-[22px]"
                    strokeWidth={1.2}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Romantic string-lit divider */}
            <motion.div
              className="mt-6 flex items-center justify-center gap-3 sm:mt-7"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
            >
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-violet-300/40 sm:w-16" />
              <motion.svg
                className="h-3 w-3 text-violet-200/60"
                viewBox="0 0 24 24"
                fill="currentColor"
                animate={
                  isInView
                    ? { opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }
                    : {}
                }
                transition={{
                  delay: 2.8,
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </motion.svg>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-violet-300/40 sm:w-16" />
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 24, filter: "blur(8px)" }
            }
            transition={{
              duration: 0.96,
              ease: [0.22, 1, 0.36, 1],
              delay: 1.8,
            }}
            className="mt-6 max-w-2xl font-serif text-4xl leading-[1.12] tracking-[-0.02em] text-white drop-shadow-[0_4px_22px_rgba(0,0,0,0.42)] sm:text-6xl"
          >
            It&apos;s your day now…
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, ease: "easeOut", delay: 2.1 }}
            className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/72 sm:mt-6 sm:text-lg"
          >
            So this little world is finally yours.
          </motion.p>

          <motion.div
            className="mt-8 h-px w-28 bg-gradient-to-r from-transparent via-violet-200/72 to-transparent sm:mt-9"
            animate={{ opacity: [0.5, 0.92, 0.5] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 2.8 }}
        >
          <motion.p
            className="font-serif text-[14px] italic tracking-wide text-[#E5D8FF]/70 drop-shadow-sm"
            animate={isInView ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Your little world begins below
          </motion.p>
          <motion.div
            className="mt-4 flex justify-center text-[#E5D8FF]/50"
            animate={{ y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),transparent_28%,transparent_72%,rgba(0,0,0,0.24)),radial-gradient(ellipse_at_center,transparent_40%,rgba(15,10,35,0.4)_100%)]" />
      </div>
    </section>
  );
}

export default RevealIntro;
