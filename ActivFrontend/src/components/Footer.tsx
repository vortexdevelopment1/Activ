import { useEffect, useState } from "react";

const COMMUNITY_LINKS = [
    { label: "Merch", emoji: "🔥", href: "#merch" },
    { label: "Podcast", emoji: "🎙️", href: "#podcast" },
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
      fetch("http://localhost:5000/api/social-links")
        .then((response) => response.ok ? response.json() : Promise.reject())
        .then(setSocialLinks)
        .catch(() => undefined);
    }, []);

    const socialItems = [
      { label: "Instagram", href: socialLinks.instagram, icon: InstagramIcon },
      { label: "LinkedIn", href: socialLinks.linkedin, icon: LinkedInIcon },
      { label: "Facebook", href: socialLinks.facebook, icon: FacebookIcon },
      { label: "YouTube", href: socialLinks.youtube, icon: YouTubeIcon },
      { label: "X", href: socialLinks.x, icon: XIcon },
    ];
    return (
      <footer className="border-t border-white/10 bg-[#0F0F0F] px-4 pb-8 pt-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  <span className="text-[#c8f31d]">A</span>CTIV
                </span>
                <span className="mb-2 text-[10px] font-semibold text-white/70">TM</span>
              </div>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
                Empowering people to move, helping venues thrive, and building
                healthier communities together.
              </p>
  
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 transition-colors hover:bg-white/10"
                  aria-label="Get it on Google Play"
                >
                  <PlayStoreIcon />
                  <span className="leading-tight">
                    <span className="block text-[9px] text-white/60">GET IT ON</span>
                    <span className="block text-xs font-semibold text-white">
                      Google Play
                    </span>
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 transition-colors hover:bg-white/10"
                  aria-label="Download on the App Store"
                >
                  <AppleIcon />
                  <span className="leading-tight">
                    <span className="block text-[9px] text-white/60">
                      Download on the
                    </span>
                    <span className="block text-xs font-semibold text-white">
                      App Store
                    </span>
                  </span>
                </a>
              </div>
            </div>
  
            {/* Community column */}
            <div>
              <h3 className="text-sm font-semibold text-white">Community</h3>
              <ul className="mt-4 space-y-3">
                {COMMUNITY_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                    >
                      <span aria-hidden="true">{link.emoji}</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Support column */}
            <div>
              <h3 className="text-sm font-semibold text-white">Support</h3>
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
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
  
              <p className="mt-6 text-sm text-white/60">Get in touch</p>
              <a
                href="mailto:Support@activ.live"
                className="text-sm font-medium text-[#c8f31d] hover:underline"
              >
                Support@activ.live
              </a>
            </div>
          </div>
  
          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
            <p className="text-xs text-white/40">
              © 2026 Activpulse Booking Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialItems.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  function PlayStoreIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 1.6c-.3.3-.5.7-.5 1.2v12.4c0 .5.2.9.5 1.2l.1.1L9.9 9V8.8L2.6 1.5l-.1.1Z" fill="#00D2FF" />
        <path d="M12.3 11.4 9.9 9v-.2l2.4-2.4 3 1.7c.9.5.9 1.3 0 1.8l-3 1.5Z" fill="#FFD400" />
        <path d="M12.3 11.4 9.9 8.9l-7.4 7.5c.3.3.8.3 1.3.1l8.5-4.9v-.2Z" fill="#FF3A44" />
        <path d="M12.3 6.4 3.8 1.5c-.5-.3-1-.2-1.3.1l7.4 7.4 2.4-2.6Z" fill="#00F076" />
      </svg>
    );
  }
  
  function AppleIcon() {
    return (
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.1 9.5c0-1.9 1.5-2.8 1.6-2.9-.9-1.3-2.2-1.5-2.7-1.5-1.2-.1-2.3.7-2.9.7-.6 0-1.5-.7-2.5-.7-1.3 0-2.4.7-3.1 1.9-1.3 2.3-.3 5.7 1 7.6.6.9 1.3 1.9 2.3 1.9.9 0 1.3-.6 2.4-.6s1.4.6 2.4.6c1 0 1.6-.9 2.2-1.8.7-1 1-2 1-2.1-.1 0-2-.8-2-3.1h.2Z"
          fill="white"
        />
        <path
          d="M11 3.6c.5-.6.8-1.4.8-2.2-.7 0-1.6.5-2.1 1.1-.5.5-.9 1.3-.8 2.1.8.1 1.6-.4 2.1-1Z"
          fill="white"
        />
      </svg>
    );
  }
  
  function InstagramIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="9" cy="9" r="3.4" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="13" cy="5" r="0.9" fill="currentColor" />
      </svg>
    );
  }
  
  function LinkedInIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="15" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6 7.5v5.2M6 5.4v.1M9.2 12.7V9.6c0-1.1.7-1.9 1.7-1.9 1 0 1.6.7 1.6 1.9v3.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  
  function FacebookIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M10.6 6.4H9.7c-.5 0-.9.4-.9.9v1h1.8l-.3 1.7H8.8v4.2H7v-4.2H5.9V8.3H7v-1c0-1.2 1-2.2 2.2-2.2h1.4v1.3Z" fill="currentColor" />
      </svg>
    );
  }
  
  function YouTubeIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="4" width="15" height="10" rx="3" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7.6 6.9 11 9l-3.4 2.1V6.9Z" fill="currentColor" />
      </svg>
    );
  }
  
  function XIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.5 3.5 8.1 9.2 3.4 14.5H5l3.2-3.6 2.7 3.6h3.1L9.2 8.5l4.4-5H12l-3 3.4-2.5-3.4H3.5Z"
          stroke="currentColor"
          strokeWidth="0.7"
          fill="currentColor"
        />
      </svg>
    );
  }
