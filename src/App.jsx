import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gradients } from "./lib/theme";

import Navbar from "./components/Navbar";
import CountdownHero from "./components/CountdownHero";
import BirthdayReveal from "./components/BirthdayReveal";
import NoteSection from "./components/NoteSection";
import MemoryLane from "./components/MemoryLane";
import BirthdayBox from "./components/BirthdayBox";
import WhyIChoseThese from "./components/WhyIChoseThese";
import FinalSection from "./components/FinalSection";
import SecretRevealModal from "./components/SecretRevealModal";

const UNLOCK_DATE = "2026-03-30T00:00:00";
const UNLOCK_TIMESTAMP = new Date(UNLOCK_DATE).getTime();

function App() {
  const [now, setNow] = useState(() => Date.now());
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isUnlocked = now >= UNLOCK_TIMESTAMP;

  const openSecretModal = () => {
    setIsSecretModalOpen(true);
  };

  const closeSecretModal = () => {
    setIsSecretModalOpen(false);
  };

  if (isUnlocked === false) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white text-slate-900">
        <CountdownHero locked onOpenSecretModal={openSecretModal} />
        <SecretRevealModal
          isOpen={isSecretModalOpen}
          onClose={closeSecretModal}
          isUnlocked={isUnlocked}
        />
      </div>
    );
  }

  return (
    <div className={["min-h-screen", gradients.romanticBg, "text-slate-900"].join(" ")}>
      <motion.main
        className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-16 pt-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Navbar />
        <CountdownHero locked={false} />
        <BirthdayReveal />
        <NoteSection />
        <MemoryLane />
        <BirthdayBox />
        <WhyIChoseThese />
        <FinalSection />
      </motion.main>
    </div>
  );
}

export default App;
