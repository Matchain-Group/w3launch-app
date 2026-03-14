import { useLaunchDate } from "./hooks/useLaunchDate";
import { useSpotlight } from "./hooks/useSpotlight";
import { useWaitlistStats } from "./hooks/useWaitlistStats";
import Navbar from "./components/Navbar";
import Background from "./components/Background";
import Hero from "./components/Hero";
import StatsTicker from "./components/StatsTicker";
import About from "./components/About";
import TokenomicsTeaser from "./components/TokenomicsTeaser";
import WaitlistSection from "./components/WaitlistSection";
import SocialProof from "./components/SocialProof";
import ShareSection from "./components/ShareSection";
import Roadmap from "./components/Roadmap";
import Team from "./components/Team";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

export default function App() {
  useSpotlight();
  const launchDate = useLaunchDate();
  const waitlistStats = useWaitlistStats();

  return (
    <div className="relative overflow-hidden bg-base text-white">
      <Background />
      <div className="spotlight" />
      <Navbar />
      <main className="relative z-10">
        <Hero launchDate={launchDate} />
        <StatsTicker launchDate={launchDate} />
        <About />
        <TokenomicsTeaser waitlistStats={waitlistStats} />
        <WaitlistSection waitlistStats={waitlistStats} launchDate={launchDate} />
        <SocialProof waitlistStats={waitlistStats} />
        <ShareSection launchDate={launchDate} waitlistStats={waitlistStats} />
        <Roadmap launchDate={launchDate} />
        <Team />
        <Faq launchDate={launchDate} />
      </main>
      <Footer />
    </div>
  );
}
