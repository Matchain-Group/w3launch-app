import {
  FaXTwitter,
  FaTelegramPlane,
  FaDiscord,
  FaCopy,
  FaLink
} from "react-icons/fa6";
import { SiFarcaster, SiLens } from "react-icons/si";
import { useState } from "react";

const buildShareText = ({
  productName,
  launchInDays,
  spotsRemaining,
  twitterHandle
}) =>
  `Just secured my whitelist spot for ${productName}.\nLaunching in ${launchInDays} days.\nOnly ${spotsRemaining} spots left.\nGrab yours below.${twitterHandle ? `\nFollow ${twitterHandle}` : ""}`;

const open = (url) => window.open(url, "_blank", "noopener,noreferrer");

export default function ShareButtons({
  referralLink,
  productName,
  launchInDays,
  spotsRemaining,
  twitterHandle,
  onShare
}) {
  const [copied, setCopied] = useState(false);
  const text = buildShareText({
    productName,
    launchInDays,
    spotsRemaining,
    twitterHandle
  });
  const encoded = encodeURIComponent(`${text}\n${referralLink}\n#Web3 #DeFi #Launch`);

  const share = (platform) => {
    onShare?.(platform);
    if (platform === "x") {
      open(`https://twitter.com/intent/tweet?text=${encoded}`);
    }
    if (platform === "farcaster") {
      open(`https://warpcast.com/~/compose?text=${encoded}`);
    }
    if (platform === "lens") {
      open(`https://lenster.xyz/?text=${encoded}`);
    }
    if (platform === "telegram") {
      open(
        `https://t.me/share/url?url=${encodeURIComponent(
          referralLink
        )}&text=${encodeURIComponent(text)}`
      );
    }
    if (platform === "discord") {
      navigator.clipboard.writeText(`${text}\n${referralLink}`).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
    if (platform === "copy") {
      navigator.clipboard.writeText(referralLink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  };

  const Button = ({ platform, label, className, icon }) => (
    <button
      onClick={() => share(platform)}
      className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] ${className}`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      <Button
        platform="x"
        label="Share on X"
        icon={<FaXTwitter />}
        className="bg-black/70 hover:shadow-glow"
      />
      <Button
        platform="farcaster"
        label="Share on Farcaster"
        icon={<SiFarcaster />}
        className="bg-[#4c3df0]/80 hover:shadow-glow"
      />
      <Button
        platform="lens"
        label="Share on Lens"
        icon={<SiLens />}
        className="bg-[#06b6d4]/80 hover:shadow-glow"
      />
      <Button
        platform="telegram"
        label="Share on Telegram"
        icon={<FaTelegramPlane />}
        className="bg-[#2AABEE]/80 hover:shadow-glow"
      />
      <Button
        platform="discord"
        label="Share on Discord"
        icon={<FaDiscord />}
        className="bg-[#5865F2]/80 hover:shadow-glow"
      />
      <Button
        platform="copy"
        label={copied ? "Copied!" : "Copy Referral Link"}
        icon={copied ? <FaLink /> : <FaCopy />}
        className="bg-white/10 hover:shadow-glow"
      />
    </div>
  );
}
