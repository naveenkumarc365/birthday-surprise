import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gradients } from "./lib/theme";

import Navbar from "./components/Navbar";
import CountdownHero from "./components/CountdownHero";
import RevealIntro from "./components/reveal/RevealIntro";
import StoryIntro from "./components/reveal/StoryIntro";
import ConnectionSection from "./components/reveal/ConnectionSection";
import TheYouIKnow from "./components/TheYouIKnow";
import BirthdayReveal from "./components/BirthdayReveal";
import NoteSection from "./components/NoteSection";
import MemoryLane from "./components/MemoryLane";
import BirthdayBox from "./components/BirthdayBox";
import PersonalLetter from "./components/PersonalLetter";
import WhyIChoseThese from "./components/WhyIChoseThese";
import FinalSection from "./components/FinalSection";
import SecretRevealModal from "./components/SecretRevealModal";

function App() {
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [hasRevealedFinalStage, setHasRevealedFinalStage] = useState(false);

  const openSecretModal = () => {
    setIsSecretModalOpen(true);
  };

  const closeSecretModal = () => {
    setIsSecretModalOpen(false);
  };

  const handleFinalReveal = () => {
    setHasRevealedFinalStage(true);
    setIsSecretModalOpen(false);
  };

  if (hasRevealedFinalStage === false) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white text-slate-900">
        <CountdownHero
          locked
          onOpenSecretModal={openSecretModal}
          onFinalReveal={handleFinalReveal}
        />
        <SecretRevealModal
          isOpen={isSecretModalOpen}
          onClose={closeSecretModal}
        />
      </div>
    );
  }

  return (
    <div
      className={["min-h-screen", gradients.romanticBg, "text-slate-900"].join(
        " ",
      )}
    >
      <motion.main
        className="mx-auto flex min-h-screen w-full flex-col scroll-smooth"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Navbar />
        <RevealIntro />
        <StoryIntro />
        <ConnectionSection />
        <TheYouIKnow />
        <MemoryLane />
        <BirthdayBox />
        <PersonalLetter />
        <FinalSection />
        <BirthdayReveal />
        <NoteSection />
        <WhyIChoseThese />
      </motion.main>
    </div>
  );
}

export default App;