import { useEffect, useState } from "react";
import { API } from "../config/api";

const COMMUNITY_LINKS = [
  { label: "Merch", emoji: "🔥", href: "https://activmerch.com" },
  { label: "Podcast", emoji: "🎙️", href: "https://www.youtube.com/@ACTIVMinds" },
];

const SUPPORT_LINKS = [
  { label: "Contact us", href: "#contact" },
  { label: "Privacy policy", href: "#privacy" },
  { label: "Terms of service", href: "#terms" },
];

const DEFAULT_SOCIAL_LINKS = {
  instagram: "#",
  linkedin: "#",
  facebook: "#",
  youtube: "#",
  x: "#",
};

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [socialLinks, setSocialLinks] = useState(DEFAULT_SOCIAL_LINKS);

  useEffect(() => {
    fetch(`${API}/social-links`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then(setSocialLinks)
      .catch(() => undefined);
  }, []);

  const socialItems = [
    { label: "Instagram", href: socialLinks.instagram, icon: "/footer/instagram.png" },
    { label: "LinkedIn", href: socialLinks.linkedin, icon: "/footer/LinkedIn.png" },
    { label: "Facebook", href: socialLinks.facebook, icon: "/footer/facebook.png" },
    { label: "YouTube", href: socialLinks.youtube, icon: "/footer/youtube.png" },
    { label: "X", href: socialLinks.x, icon: "/footer/twitter.png" },
  ];
  return (
    <footer className="border-t border-white/10 bg-[#0D0F06] px-4 pb-8 pt-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[2fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center bg-transparent border-none cursor-pointer text-left sm:ml-[10px]"
              aria-label="ACTIV home"
            >
              <img
                src="/Activlogo.svg"
                alt="ACTIV"
                className="h-[52px] w-[124px] object-contain"
              />
            </button>
            <p className="mt-3 max-w-[400px] text-[20px] leading-relaxed text-white/80 sm:ml-3">
              Empowering people to move, helping venues thrive, and building
              healthier communities together.
            </p>

            <div className="mt-5 flex flex-wrap sm:ml-[-5px]">
              <a
                href="https://play.google.com/store/apps/details?id=com.activ.partnerapp"
                className="transition-opacity hover:opacity-80 inline-block"
                aria-label="Get it on Google Play"
              >
                <img src="/Playstore.svg" alt="" className="h-[40px] w-[175px] object-contain" />
              </a>
              <a
                href="https://apps.apple.com/in/app/activ-partner/id6793596032"
                className="transition-opacity hover:opacity-80 inline-block"
                aria-label="Download on the App Store"
              >
                <img src="/Applestore.svg" alt="" className="h-[40px] w-[175px] object-contain" />
              </a>
            </div>
          </div>

          {/* Community column */}
          <div>
            <h3 className="text-[22px] font-semibold text-white sm:ml-[20px]">Community</h3>
            <ul className="mt-4 space-y-3">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[18px] text-white/60 transition-colors hover:text-white sm:ml-[10px]"
                  >
                    <span aria-hidden="true" className="brightness-150 saturate-150 drop-shadow-md sm:ml-[10px]">{link.emoji}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h3 className="text-[22px] font-semibold text-white sm:ml-[100px]">Support</h3>
            <ul className="mt-4 space-y-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      if (link.label !== "Contact us") return;

                      event.preventDefault();
                      onNavigate("support");
                      requestAnimationFrame(() => {
                        document.getElementById("contact")?.scrollIntoView({
                          behavior: "smooth",
                        });
                      });
                    }}
                    className="text-[18px] text-white/60 transition-colors hover:text-white sm:ml-[100px]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[18px] text-white/60 sm:ml-[100px]">Get in touch</p>
            <a
              href="mailto:Support@activ.live"
              className="text-[15px] font-medium text-[#c8f31d] hover:underline sm:ml-[100px]"
            >
              Support@activ.live
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-[18px] text-white">
            © 2026 Activpulse Booking Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-[2.3rem]">
            {socialItems.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white/70 transition-colors hover:text-white"
              >
                <img
                  src={icon}
                  alt=""
                  className="h-[30px] w-[30px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
