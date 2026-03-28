import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ArrowRight, X } from "lucide-react";

import { cn } from "../lib/cn";
import { componentStyles, radii, shadows, textStyles } from "../lib/theme";
import { SECRET_MESSAGES } from "../constants/secretMessages";

const STORAGE_KEY = "birthday-secret-guessed";
const PIN_LENGTH = 4;

const validPasswords = ["nonu"];

const normalize = (val) => val.toLowerCase().trim().replace(/\s+/g, "");

const normalizedPasswords = validPasswords.map(normalize);

function SwipeUnlockButton({ onUnlock, errorText = "" }) {
  const trackRef = useRef(null);
  const settleTimerRef = useRef(null);
  const x = useMotionValue(0);
  const [maxTravel, setMaxTravel] = useState(0);
  const [isSettling, setIsSettling] = useState(false);

  const hasError = Boolean(errorText);

  const progress = useTransform(x, [0, Math.max(maxTravel, 1)], [0, 1], {
    clamp: true,
  });
  const fillOpacity = useTransform(progress, [0, 1], [0.2, 0.8]);
  const centeredLabelOpacity = useTransform(
    progress,
    [0, 0.45, 0.7],
    [0.96, 0.4, 0],
  );
  const errorOpacity = useTransform(progress, [0, 0.22, 1], [0.35, 0.78, 1]);
  const errorX = useTransform(progress, [0, 1], [-10, 0]);
  const errorWidth = useTransform(progress, [0, 1], ["0%", "56%"]);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) {
        return;
      }

      const width = trackRef.current.offsetWidth;
      setMaxTravel(Math.max(0, width - 72));
    };

    measure();
    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    return () => {
      if (settleTimerRef.current) {
        window.clearTimeout(settleTimerRef.current);
      }
    };
  }, []);

  const handleDragEnd = () => {
    const current = x.get();

    if (current >= maxTravel * 0.78) {
      setIsSettling(true);
      if (settleTimerRef.current) {
        window.clearTimeout(settleTimerRef.current);
      }
      settleTimerRef.current = window.setTimeout(
        () => setIsSettling(false),
        260,
      );

      animate(x, maxTravel, { duration: 0.14, ease: "easeOut" });
      window.setTimeout(() => {
        onUnlock();
        animate(x, 0, { duration: 0.32, ease: "easeOut" });
      }, 150);
      return;
    }

    animate(x, 0, { duration: 0.28, ease: "easeOut" });
  };

  return (
    <motion.div
      ref={trackRef}
      className="relative h-16 w-full overflow-hidden rounded-full border border-violet-200/44 bg-gradient-to-r from-[#463773]/58 via-[#5E4A96]/56 to-[#6F58AE]/52 shadow-[inset_0_1px_0_rgba(255,255,255,0.36),0_14px_28px_rgba(74,52,126,0.34)] backdrop-blur"
      animate={isSettling ? { scale: [1, 0.994, 1.01, 1] } : { scale: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <motion.div
        className="pointer-events-none absolute inset-y-2 left-2 rounded-full bg-gradient-to-r from-[#7C5CFF]/58 via-[#B39DDB]/45 to-[#D8CCFF]/28 blur-[0.3px]"
        style={{ width: 56, x, opacity: fillOpacity }}
      />

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: maxTravel }}
        dragElastic={0.03}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x }}
        whileHover={{ scale: 1.045, y: -0.5 }}
        whileTap={{ scale: 0.98, y: 0 }}
        className="absolute left-1 top-1 z-10 inline-flex h-14 w-14 cursor-grab touch-none items-center justify-center rounded-full border border-violet-200/55 bg-gradient-to-b from-[#F1E8FF] to-[#D8C9FF] text-[#493671] shadow-[0_12px_24px_rgba(103,74,168,0.32)] active:cursor-grabbing"
        aria-label="Slide to unlock"
      >
        <ArrowRight size={20} strokeWidth={2.45} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0">
        <motion.span
          style={{ opacity: centeredLabelOpacity }}
          className="absolute inset-0 flex items-center justify-center text-[17px] font-medium tracking-[0.01em] text-[#E7DEFF]"
        >
          {SECRET_MESSAGES.cta}
        </motion.span>

        <motion.div
          style={{
            opacity: hasError ? errorOpacity : 0,
            x: errorX,
            width: errorWidth,
          }}
          className="absolute left-5 top-1/2 -translate-y-1/2 overflow-hidden pr-3"
        >
          <span
            className="block truncate whitespace-nowrap text-[11px] font-medium text-[#E7DEFF]/90"
            title={errorText}
          >
            {errorText}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SecretRevealModal({
  isOpen = false,
  onClose = () => {},
  isUnlocked = false,
}) {
  const [guess, setGuess] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [failedPasswords, setFailedPasswords] = useState([]);
  const [revealedIndex, setRevealedIndex] = useState(null);
  const [feedback, setFeedback] = useState({ type: "", text: "" });
  const inputRef = useRef(null);
  const maskTimerRef = useRef(null);

  const hasGuessedBefore = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(STORAGE_KEY) === "true";
  }, [isOpen]);

  const isSuccess = feedback.type === "success";
  const canShowHint = failedPasswords.length >= 3;

  const sliderStatusText = useMemo(() => {
    if (feedback.type === "error") {
      return feedback.text;
    }

    const normalizedGuess = normalize(guess);

    if (!normalizedGuess) {
      return SECRET_MESSAGES.feedback.emptyGuess;
    }

    if (normalizedPasswords.includes(normalizedGuess)) {
      return SECRET_MESSAGES.slider.validGuess;
    }

    return SECRET_MESSAGES.slider.invalidGuess;
  }, [feedback.type, feedback.text, guess]);

  useEffect(() => {
    return () => {
      if (maskTimerRef.current) {
        window.clearTimeout(maskTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (hasGuessedBefore && !isUnlocked) {
      setFeedback({
        type: "success",
        text: SECRET_MESSAGES.feedback.success,
      });
      return;
    }

    setFeedback({ type: "", text: "" });
    setShowHint(false);
    setFailedPasswords([]);
    setRevealedIndex(null);
    setGuess("");
  }, [hasGuessedBefore, isOpen, isUnlocked]);

  const handleGuessChange = (event) => {
    const nextGuess = event.target.value.slice(0, PIN_LENGTH);

    if (feedback.type === "error") {
      setFeedback({ type: "", text: "" });
    }

    setGuess((prevGuess) => {
      if (maskTimerRef.current) {
        window.clearTimeout(maskTimerRef.current);
      }

      if (nextGuess.length > prevGuess.length) {
        const nextVisibleIndex = nextGuess.length - 1;
        setRevealedIndex(nextVisibleIndex);
        maskTimerRef.current = window.setTimeout(() => {
          setRevealedIndex((current) =>
            current === nextVisibleIndex ? null : current,
          );
        }, 380);
      } else {
        setRevealedIndex(null);
      }

      return nextGuess;
    });
  };

  const attemptUnlock = () => {
    const normalizedGuess = normalize(guess);

    if (!normalizedGuess) {
      setFeedback({ type: "error", text: SECRET_MESSAGES.feedback.emptyGuess });
      return;
    }

    if (normalizedPasswords.includes(normalizedGuess)) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, "true");
      }

      setFeedback({
        type: "success",
        text: SECRET_MESSAGES.feedback.success,
      });
      setFailedPasswords([]);

      return;
    }

    setFailedPasswords((prev) =>
      prev.includes(normalizedGuess) ? prev : [...prev, normalizedGuess],
    );
    setFeedback({
      type: "error",
      text: SECRET_MESSAGES.feedback.wrongGuess,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    attemptUnlock();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1330]/48 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className={cn(
              "relative w-full max-w-md overflow-hidden p-6 sm:p-7",
              componentStyles.glassCard,
              radii.card,
              shadows.layered,
              "border-violet-200/42 bg-[linear-gradient(165deg,rgba(58,43,101,0.88),rgba(85,64,136,0.82))]",
            )}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#D9CFF0]/92 transition-colors hover:bg-violet-400/18 hover:text-[#F5F1FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/55"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
            <div className="pointer-events-none absolute inset-0">
              <motion.span
                className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-[#DCCFFF]/24 blur-3xl"
                animate={{ x: [0, 26, 0], y: [0, -14, 0], opacity: [0.28, 0.44, 0.28] }}
                transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute -right-12 bottom-6 h-40 w-40 rounded-full bg-[#BFAEFF]/18 blur-3xl"
                animate={{ x: [0, -24, 0], y: [0, 16, 0], opacity: [0.22, 0.38, 0.22] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute left-1/2 top-0 h-32 w-48 -translate-x-1/2 rounded-full bg-[#E3D8FF]/22 blur-2xl"
                animate={{ scale: [0.94, 1.08, 0.94], opacity: [0.24, 0.42, 0.24] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative py-8 text-center"
                >
                  <motion.span
                    className="pointer-events-none absolute left-1/2 top-1 h-20 w-20 -translate-x-1/2 rounded-full bg-[#E5D9FF]/38 blur-2xl"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.94, 1.05, 0.94],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <p
                    className="relative text-xl font-serif text-[#F6F1FF]"
                  >
                    {SECRET_MESSAGES.successTitle}
                  </p>
                  <p className="relative mt-2 text-sm text-[#EFE7FF]/94">
                    {SECRET_MESSAGES.successSubtitle}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <p className="relative text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F7F2FF] drop-shadow-[0_1px_6px_rgba(15,10,30,0.45)]">
                    {SECRET_MESSAGES.title}
                  </p>
                  <p className="relative mt-1 text-sm text-[#F3ECFF]/95">
                    {SECRET_MESSAGES.subtitle}
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="relative mt-6 space-y-5"
                  >
                    <label htmlFor="secret-guess" className="sr-only">
                      Enter your guess
                    </label>

                    <div
                      className="relative"
                      onClick={() => inputRef.current?.focus()}
                    >
                      <input
                        id="secret-guess"
                        ref={inputRef}
                        type="text"
                        value={guess}
                        onChange={handleGuessChange}
                        placeholder="Enter 4-letter secret…"
                        maxLength={PIN_LENGTH}
                        className="absolute inset-0 h-full w-full cursor-text opacity-0"
                        autoComplete="off"
                        spellCheck={false}
                      />

                      <div
                        className="grid grid-cols-4 gap-2 sm:gap-3"
                        aria-hidden="true"
                      >
                        {Array.from({ length: PIN_LENGTH }, (_, index) => {
                          const char = guess[index] || "";
                          const isActive =
                            index === Math.min(guess.length, PIN_LENGTH - 1);

                          return (
                            <div
                              key={index}
                              className={cn(
                                "h-14 rounded-2xl border border-violet-200/46 bg-[linear-gradient(160deg,rgba(241,232,255,0.32),rgba(128,103,193,0.28))] text-center text-lg font-medium text-[#F6F1FF] shadow-[0_10px_22px_rgba(90,64,149,0.28)] transition",
                                "flex items-center justify-center",
                                isActive &&
                                  "border-violet-200/72 ring-2 ring-violet-200/38",
                              )}
                            >
                              {char ? (
                                index === revealedIndex ? (
                                  char.toUpperCase()
                                ) : (
                                  "❤"
                                )
                              ) : (
                                <span className="text-[#F0E6FF]/90">♡</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <SwipeUnlockButton
                      onUnlock={attemptUnlock}
                      errorText={sliderStatusText}
                    />
                    <button type="submit" className="sr-only">
                      {SECRET_MESSAGES.cta}
                    </button>
                  </form>

                  <AnimatePresence mode="wait">
                    {canShowHint ? (
                      <button
                        type="button"
                        onClick={() => setShowHint((prev) => !prev)}
                        className="mt-3 text-xs text-[#D9CFF0]/90 underline decoration-violet-300/55 underline-offset-4 transition hover:text-[#F5F1FF]"
                      >
                        {SECRET_MESSAGES.hintToggle}
                      </button>
                    ) : null}

                    {canShowHint && showHint ? (
                      <motion.p
                        key="hint"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="mt-2 text-sm text-[#EFE7FF]/94"
                      >
                        {SECRET_MESSAGES.hintText}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default SecretRevealModal;
