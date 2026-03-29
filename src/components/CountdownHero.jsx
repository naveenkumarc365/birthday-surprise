import { useEffect, useMemo, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";

import { cn } from "../lib/cn";
import {
  componentStyles,
  motionPresets,
  radii,
  shadows,
  textStyles,
} from "../lib/theme";

const UNLOCK_DATE = "2026-03-30T00:00:00";
const SECRET_GUESSED_KEY = "birthday-secret-guessed";

const COUNTDOWN_SEGMENTS = ["Days", "Hours", "Minutes", "Seconds"];

const LOCKED_DECOR = [
  {
    className: "-top-10 left-[16%] text-violet-200/35",
    duration: 8,
    y: [0, -6, 0],
    opacity: [0.2, 0.38, 0.2],
    type: "sparkle",
    size: 15,
  },
  {
    className: "right-[15%] top-[23%] text-violet-300/30",
    duration: 9,
    y: [0, 5, 0],
    opacity: [0.18, 0.32, 0.18],
    type: "sparkle",
    size: 14,
  },
  {
    className: "bottom-[17%] left-[22%] text-indigo-200/30",
    duration: 10,
    y: [0, -4, 0],
    opacity: [0.14, 0.28, 0.14],
    type: "heart",
    size: 14,
  },
];

const LOCKED_MAGIC_DETAILS = [
  {
    type: "sparkleDot",
    className: "left-[7%] top-[12%]",
    size: 6,
    duration: 12.5,
    x: [0, 8, 0],
    y: [0, -10, 0],
    opacity: [0.12, 0.24, 0.12],
  },
  {
    type: "sparkleStar",
    className: "right-[8%] top-[18%]",
    size: 11,
    duration: 14,
    x: [0, -7, 0],
    y: [0, 9, 0],
    opacity: [0.1, 0.2, 0.1],
  },
  {
    type: "sparkleDot",
    className: "right-[12%] bottom-[22%]",
    size: 5,
    duration: 13.6,
    x: [0, -6, 0],
    y: [0, -8, 0],
    opacity: [0.1, 0.2, 0.1],
  },
  {
    type: "heartOutline",
    className: "left-[10%] bottom-[20%]",
    size: 13,
    duration: 16,
    x: [0, 5, 0],
    y: [0, -7, 0],
    opacity: [0.09, 0.16, 0.09],
  },
  {
    type: "heartOutline",
    className: "right-[14%] top-[33%]",
    size: 11,
    duration: 15.5,
    x: [0, -5, 0],
    y: [0, 6, 0],
    opacity: [0.08, 0.15, 0.08],
  },
  {
    type: "heartOutline",
    className: "left-[16%] top-[29%]",
    size: 10,
    duration: 17.2,
    x: [0, 4, 0],
    y: [0, -5, 0],
    opacity: [0.07, 0.14, 0.07],
  },
  {
    type: "balloon",
    className: "right-[11%] top-[9%]",
    size: 24,
    duration: 18.5,
    x: [0, -4, 0],
    y: [0, -12, 0],
    opacity: [0.1, 0.2, 0.1],
  },
];

const LOCKED_CARD_PATTERN = [
  { type: "heart", className: "left-[8%] top-[14%]", size: 10, duration: 15.5, x: [0, 4, 0], y: [0, -5, 0], opacity: [0.05, 0.12, 0.05] },
  { type: "balloon", className: "right-[9%] top-[16%]", size: 15, duration: 17.8, x: [0, -3, 0], y: [0, -6, 0], opacity: [0.05, 0.11, 0.05] },
  { type: "heart", className: "right-[14%] top-[44%]", size: 9, duration: 16.4, x: [0, -4, 0], y: [0, 4, 0], opacity: [0.04, 0.1, 0.04] },
  { type: "balloon", className: "left-[11%] top-[52%]", size: 14, duration: 18.3, x: [0, 3, 0], y: [0, -5, 0], opacity: [0.05, 0.11, 0.05] },
  { type: "heart", className: "left-[16%] bottom-[13%]", size: 10, duration: 15.9, x: [0, 3, 0], y: [0, -4, 0], opacity: [0.05, 0.11, 0.05] },
  { type: "balloon", className: "right-[12%] bottom-[12%]", size: 14, duration: 18.8, x: [0, -3, 0], y: [0, -5, 0], opacity: [0.05, 0.11, 0.05] },
];

const UNLOCKED_DECOR = [
  {
    className: "left-[13%] top-[22%] text-rose-300/38",
    duration: 8,
    y: [0, -5, 0],
    opacity: [0.18, 0.32, 0.18],
    type: "sparkle",
    size: 14,
  },
  {
    className: "right-[17%] top-[29%] text-pink-300/34",
    duration: 9,
    y: [0, 4, 0],
    opacity: [0.16, 0.28, 0.16],
    type: "heart",
    size: 12,
  },
];

function getTimeLeft(targetTime) {
  const now = Date.now();
  const diff = targetTime - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isBirthday: false };
}

function DecorativeMotion({ item }) {
  return (
    <motion.div
      className={cn("pointer-events-none absolute", item.className)}
      animate={{ y: item.y, opacity: item.opacity }}
      transition={{
        duration: item.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {item.type === "sparkle" ? (
        <Sparkles size={item.size} strokeWidth={1.5} />
      ) : (
        <span style={{ fontSize: item.size }}>♥</span>
      )}
    </motion.div>
  );
}

function AmbientDecorDetail({ item }) {
  return (
    <motion.div
      className={cn("pointer-events-none absolute", item.className)}
      animate={{ x: item.x, y: item.y, opacity: item.opacity }}
      transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {item.type === "sparkleDot" ? (
        <span
          className="block rounded-full bg-[#F2ECFF]/80 shadow-[0_0_12px_rgba(216,204,255,0.5)]"
          style={{ width: item.size, height: item.size }}
        />
      ) : item.type === "sparkleStar" ? (
        <span
          className="block text-[#E8DEFF]/72 drop-shadow-[0_0_8px_rgba(216,204,255,0.35)]"
          style={{ fontSize: item.size }}
        >
          ✧
        </span>
      ) : item.type === "heartOutline" ? (
        <span
          className="block text-[#E4D7FF]/55 drop-shadow-[0_0_6px_rgba(216,204,255,0.26)]"
          style={{ fontSize: item.size }}
        >
          ♡
        </span>
      ) : (
        <svg
          width={item.size}
          height={item.size * 1.6}
          viewBox="0 0 24 38"
          fill="none"
          className="text-[#E7DCFF]/45"
        >
          <ellipse
            cx="12"
            cy="12"
            rx="7.2"
            ry="9.4"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M12 21.6C11.5 23.8 11.6 25.9 12.4 28.2C13 30.1 12.6 32.5 11.3 35"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      )}
    </motion.div>
  );
}

function CardPatternDetail({ item }) {
  return (
    <motion.div
      className={cn("pointer-events-none absolute", item.className)}
      animate={{ x: item.x, y: item.y, opacity: item.opacity }}
      transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {item.type === "heart" ? (
        <span
          className="block text-[#EDE4FF]/42 drop-shadow-[0_0_5px_rgba(216,204,255,0.2)]"
          style={{ fontSize: item.size }}
        >
          ♡
        </span>
      ) : (
        <svg
          width={item.size}
          height={item.size * 1.55}
          viewBox="0 0 24 38"
          fill="none"
          className="text-[#E6DAFF]/38"
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
        </svg>
      )}
    </motion.div>
  );
}

function CountdownUnit({ label, value }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        radii.block,
        "border border-violet-200/42 bg-gradient-to-b from-[#6B54A8]/34 to-[#3A2D67]/40 px-3 py-4 text-center text-[#F6F1FF] shadow-[0_12px_28px_rgba(66,48,112,0.34)] backdrop-blur-xl sm:px-5 sm:py-5",
        "transition-shadow duration-300 hover:border-[#D8CCFF]/70 hover:shadow-[0_12px_26px_rgba(168,138,246,0.34)]",
      )}
    >
      <p className="text-2xl font-serif font-semibold text-[#F6F1FF] sm:text-3xl">
        {String(value).padStart(2, "0")}
      </p>
      <p className="mt-1.5 truncate text-[10px] uppercase tracking-[0.14em] text-[#D7CBEA]/95 sm:text-xs sm:tracking-[0.18em]">
        {label}
      </p>
    </motion.div>
  );
}

function SecretSlideLock({ onComplete, isSecretGuessed, isBirthday }) {
  const trackHeight = 128;
  const knobSize = 52;
  const maxTravel = trackHeight - knobSize;
  const threshold = maxTravel * 0.8;

  const canFinalReveal = isBirthday && isSecretGuessed;
  const shouldOpenPassword = !isSecretGuessed;
  const isSliderLocked = !canFinalReveal && isSecretGuessed;

  const y = useMotionValue(0);
  const progress = useTransform(y, [0, maxTravel], [0, 1], { clamp: true });
  const fillScaleY = useTransform(progress, [0, 1], [0, 1]);
  const fillOpacity = useTransform(progress, [0, 1], [0, 0.9]);
  const trackGlow = useTransform(progress, [0, 1], [0.2, 0.7]);

  const peekOpacity = useTransform(progress, [0, 0.45, 0.65], [1, 0.45, 0]);
  const peekY = useTransform(progress, [0, 1], [0, -4]);

  const guessOpacity = useTransform(progress, [0.25, 0.6, 0.85], [0, 0.9, 0.2]);
  const guessY = useTransform(progress, [0, 1], [4, 0]);

  const almostOpacity = useTransform(progress, [0.72, 0.9, 1], [0, 0.92, 1]);
  const almostY = useTransform(progress, [0.72, 1], [4, 0]);

  const handleDragEnd = () => {
    const current = y.get();

    if (isSliderLocked) {
      animate(y, 0, { duration: 0.28, ease: "easeOut" });
      return;
    }

    if (current >= threshold) {
      animate(y, maxTravel - 2, { duration: 0.16, ease: "easeOut" });

      window.setTimeout(() => {
        animate(y, maxTravel, { duration: 0.12, ease: "easeOut" });
      }, 100);

      window.setTimeout(() => {
        onComplete?.();
        animate(y, 0, { duration: 0.38, ease: "easeOut" });
      }, 220);

      return;
    }

    animate(y, 0, { duration: 0.32, ease: "easeOut" });
  };

  const getTopText = () => {
    if (canFinalReveal) return "Slide down to enter your world ✨";
    if (shouldOpenPassword && isBirthday) return "Slide to guess the password 💌";
    if (shouldOpenPassword) return "Slide to peek the secret ✨";
    return "You found the secret 💖";
  };

  const getBottomText = () => {
    if (canFinalReveal) return "Your little world is waiting below…";
    if (isSecretGuessed && !isBirthday) return "Come back when the countdown ends…";
    return "";
  };

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="order-1 relative mb-1 h-10 text-center">
        <p className="text-sm text-[#E9DEFF]">{getTopText()}</p>

        {getBottomText() ? (
          <p className="mt-1 text-[11px] text-[#C9BCDF]">{getBottomText()}</p>
        ) : (
          <>
            {!isSliderLocked && !canFinalReveal && !isSecretGuessed && (
              <>
                <motion.p
                  style={{ opacity: guessOpacity, y: guessY }}
                  className="pointer-events-none absolute inset-x-0 top-0 text-sm text-[#E9DEFF]"
                >
                  Guess the password 💌
                </motion.p>
                <motion.p
                  style={{ opacity: almostOpacity, y: almostY }}
                  className="pointer-events-none absolute inset-x-0 top-0 text-sm text-[#E9DEFF]"
                >
                  Almost there… 💖
                </motion.p>
              </>
            )}
          </>
        )}
      </div>

      <div className="order-2 relative flex h-40 w-28 items-start justify-center">
        <motion.span
          className={cn(
            "pointer-events-none absolute left-1/2 top-2 h-20 w-20 -translate-x-1/2 rounded-full blur-2xl",
            canFinalReveal
              ? "bg-fuchsia-400/30"
              : isSecretGuessed
                ? "bg-violet-400/26"
                : "bg-indigo-400/18",
          )}
          animate={{ opacity: [0.35, 0.62, 0.35], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative h-[128px] w-[82px] rounded-full border border-violet-200/44 bg-[linear-gradient(170deg,rgba(234,223,255,0.24),rgba(106,80,170,0.28))] p-3 shadow-[0_14px_30px_rgba(62,43,110,0.3)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-[#D8CCFF]/15 to-transparent" />
          <div className="pointer-events-none absolute inset-[1px] rounded-full shadow-[inset_0_1px_0_rgba(216,204,255,0.22),inset_0_-8px_16px_rgba(8,5,16,0.45)]" />

          <motion.div
            className="pointer-events-none absolute inset-x-3 bottom-3 h-[calc(100%-24px)] origin-bottom rounded-full bg-gradient-to-t from-[#7C5CFF]/58 via-[#B39DDB]/42 to-transparent"
            style={{ scaleY: fillScaleY, opacity: fillOpacity }}
          />

          <motion.div
            className="pointer-events-none absolute inset-x-3.5 bottom-3.5 h-[calc(100%-28px)] origin-bottom rounded-full bg-[#7C5CFF]/28 blur-md"
            style={{ scaleY: fillScaleY, opacity: trackGlow }}
          />

          <motion.div
            drag={isSliderLocked ? false : "y"}
            dragConstraints={{ top: 0, bottom: maxTravel }}
            dragElastic={0.02}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            style={{ y }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative z-10 inline-flex h-[52px] w-[52px] touch-none items-center justify-center rounded-full border border-violet-200/55 bg-gradient-to-b from-[#F3EAFF] to-[#DCCBFF] text-[#4A376F] shadow-[0_10px_22px_rgba(102,76,168,0.32)]",
              isSliderLocked ? "cursor-not-allowed opacity-90" : "cursor-grab active:cursor-grabbing"
            )}
            animate={
              canFinalReveal
                ? {
                  scale: [1, 1.04, 1],
                  y: [0, 6, 0],
                  boxShadow: [
                    "0 8px 20px rgba(6,3,14,0.58)",
                    "0 12px 28px rgba(192,132,252,0.42)",
                    "0 8px 20px rgba(6,3,14,0.58)",
                  ],
                }
                : isSecretGuessed
                  ? { scale: [1, 1.02, 1] }
                  : {
                    scale: [1, 1.02, 1],
                    y: [0, 6, 0],
                    boxShadow: [
                      "0 8px 20px rgba(6,3,14,0.58)",
                      "0 12px 24px rgba(124,92,255,0.34)",
                      "0 8px 20px rgba(6,3,14,0.58)",
                    ],
                  }
            }
            transition={{ duration: 1.45, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              className="pointer-events-none absolute -inset-1.5 -z-10 rounded-full bg-violet-300/24 blur-lg"
              animate={{
                opacity: [0.35, 0.65, 0.35],
                scale: [0.95, 1.06, 0.95],
              }}
              transition={{
                duration: 2.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {canFinalReveal ? (
              <span className="text-xl leading-none">💖</span>
            ) : isSecretGuessed ? (
              <span className="text-xl leading-none">💖</span>
            ) : (
              <Lock size={20} strokeWidth={1.9} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function readSecretGuessed() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(SECRET_GUESSED_KEY) === "true";
}

function CountdownHero({
  locked = true,
  onOpenSecretModal,
  onFinalReveal,
}) {
  const unlockTime = useMemo(() => new Date(UNLOCK_DATE).getTime(), []);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(unlockTime));
  const [isSecretGuessed, setIsSecretGuessed] = useState(() =>
    readSecretGuessed(),
  );

  useEffect(() => {
    if (locked === false) {
      return undefined;
    }

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(unlockTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [locked, unlockTime]);

  useEffect(() => {
    if (locked === false) {
      return undefined;
    }

    const syncSecretState = () => {
      setIsSecretGuessed(readSecretGuessed());
    };

    const heartbeat = setInterval(syncSecretState, 1200);
    window.addEventListener("storage", syncSecretState);
    window.addEventListener("focus", syncSecretState);

    return () => {
      clearInterval(heartbeat);
      window.removeEventListener("storage", syncSecretState);
      window.removeEventListener("focus", syncSecretState);
    };
  }, [locked]);

  const isBirthday = timeLeft.isBirthday;

  const handleSliderComplete = () => {
    if (isBirthday && isSecretGuessed) {
      onFinalReveal?.();
      return;
    }

    onOpenSecretModal?.();
  };

  const handleScroll = () => {
    const target = document.querySelector("#birthday-reveal");

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (locked) {
    return (
      <section className="relative flex min-h-[100svh] box-border items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_52%_18%,rgba(216,204,255,0.34),transparent_36%),radial-gradient(circle_at_80%_78%,rgba(179,157,219,0.26),transparent_40%),linear-gradient(160deg,rgba(26,19,48,1)_0%,rgba(42,31,71,1)_52%,rgba(59,44,99,1)_100%)] px-4 py-6 sm:min-h-screen sm:px-6 sm:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(15,10,30,0.38))]" />
        <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-violet-300/28 blur-3xl" />
        <div className="pointer-events-none absolute -right-14 bottom-16 h-64 w-64 rounded-full bg-violet-400/22 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-[36%] h-52 w-52 -translate-x-1/2 rounded-full bg-[#D8CCFF]/24 blur-3xl" />
        <div className="pointer-events-none absolute inset-0">
          {LOCKED_MAGIC_DETAILS.map((item) => (
            <AmbientDecorDetail key={item.className} item={item} />
          ))}
        </div>

        {LOCKED_DECOR.map((item) => (
          <DecorativeMotion key={item.className} item={item} />
        ))}

        <div
          className={cn(
            "pointer-events-none absolute z-0 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(216,204,255,0.34),rgba(59,44,99,0)_72%)]",
          )}
        />

        <motion.div
          {...motionPresets.fadeUp}
          className={cn(
            "relative z-10 w-full max-w-xl border border-violet-200/42 bg-[linear-gradient(160deg,rgba(239,231,255,0.18),rgba(106,80,170,0.24))] p-6 text-center backdrop-blur-2xl sm:p-8",
            radii.card,
            "shadow-[0_24px_64px_rgba(28,18,52,0.42),0_0_48px_rgba(146,118,223,0.22),inset_0_1px_0_rgba(255,255,255,0.3)]",
          )}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            {LOCKED_CARD_PATTERN.map((item) => (
              <CardPatternDetail key={item.className} item={item} />
            ))}
          </div>

          <div className="relative z-10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#C9BCDF]">
              For My THangoww 🥳
            </p>
            <p className="mt-2 text-[11px] tracking-[0.12em] text-[#C9BCDF]/78 sm:text-xs">
              A small surprise, made with love
            </p>

            {typeof handleSliderComplete === "function" ? (
              <SecretSlideLock
                onComplete={handleSliderComplete}
                isSecretGuessed={isSecretGuessed}
                isBirthday={isBirthday}
              />
            ) : null}

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1.2 }}
              className="mt-2 text-3xl leading-tight font-serif text-[#F6F1FF] sm:mt-3 sm:text-4xl"
            >
              A little world I made for you.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 1.36 }}
              className="mt-3 text-sm text-[#E1D6F4]/96 sm:text-base"
            >
              {isBirthday
                ? "It’s your day now ✨"
                : "Unlocks on your birthday ✨"}
            </motion.p>

            <div className="mx-auto mt-8 grid w-full max-w-sm grid-cols-2 gap-2.5 sm:max-w-none sm:grid-cols-4 sm:gap-3.5">
              <CountdownUnit label={COUNTDOWN_SEGMENTS[0]} value={timeLeft.days} />
              <CountdownUnit label={COUNTDOWN_SEGMENTS[1]} value={timeLeft.hours} />
              <CountdownUnit label={COUNTDOWN_SEGMENTS[2]} value={timeLeft.minutes} />
              <CountdownUnit label={COUNTDOWN_SEGMENTS[3]} value={timeLeft.seconds} />
            </div>

            <p className="mt-5 text-xs text-[#C9BCDF]/82 sm:text-sm">
              {isBirthday
                ? isSecretGuessed
                  ? "One last little pull… and it’s all yours 💜"
                  : "Your day is here… but there’s still one secret left 💌"
                : "Come back when the clock says it's your day ✨"}
            </p>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[84vh] items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
      <div className="pointer-events-none absolute -left-24 top-12 h-56 w-56 rounded-full bg-rose-200/35 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-60 w-60 rounded-full bg-pink-200/28 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-1/3 h-40 w-40 rounded-full bg-violet-100/30 blur-3xl" />

      {UNLOCKED_DECOR.map((item) => (
        <DecorativeMotion key={item.className} item={item} />
      ))}

      <motion.div
        {...motionPresets.fadeUp}
        className={cn(
          "relative z-10 w-full max-w-2xl px-7 pb-9 pt-8 text-center sm:px-10 sm:pb-11 sm:pt-10",
          radii.card,
          componentStyles.glassCard,
          "shadow-xl shadow-rose-100/50",
        )}
      >
        <p className={textStyles.microLabel}>For You ✨</p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        >
          <h1
            className={cn(
              "mt-5 text-3xl leading-tight sm:text-4xl",
              textStyles.headingSerif,
            )}
          >
            A little world I made for you.
          </h1>

          <p
            className={cn(
              "mx-auto mt-3 max-w-lg text-sm leading-relaxed sm:text-base",
              textStyles.bodySoft,
            )}
          >
            I put every thought, every memory, every feeling into this space.
            Hope it makes you smile today. 🎂
          </p>

          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -1 }}
            onClick={handleScroll}
            className={cn(
              componentStyles.pillButton,
              "mt-8",
              shadows.soft,
              shadows.hover,
            )}
          >
            Begin the surprise →
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default CountdownHero;