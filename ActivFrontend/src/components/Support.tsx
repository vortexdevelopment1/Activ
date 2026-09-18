"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { API } from "../config/api";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqItemWithCategory extends FaqItem {
  id: string;
  category: string;
}

// Reusable scroll animation wrapper matching Home.tsx
function AnimateOnScroll({
  direction,
  className = "",
  children,
}: {
  direction: "left" | "right";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimating(true);
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animClass = direction === "left" ? "animate-backInLeft" : "animate-backInRight";

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? animClass : "opacity-0"}`}
      style={animating ? { willChange: "transform, opacity" } : undefined}
      onAnimationEnd={() => setAnimating(false)}
    >
      {children}
    </div>
  );
}

export default function Support() {
  const [openPlayerFaq, setOpenPlayerFaq] = useState<number | null>(null);
  const [openVenueFaq, setOpenVenueFaq] = useState<number | null>(null);
  const [openPlatformFaq, setOpenPlatformFaq] = useState<number | null>(null);

  const [faqs, setFaqs] = useState<FaqItemWithCategory[]>([]);

  useEffect(() => {
    fetch(`${API}/faqs`)
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(console.error);
  }, []);

  const playersFaqs = faqs.filter(f => f.category === "Players");
  const venueFaqs = faqs.filter(f => f.category === "Venue partners");
  const platformFaqs = faqs.filter(f => f.category === "Platform & Support");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("sending");

    try {
      const response = await fetch(`${API}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Unable to submit contact form");

      setFormData({ fullName: "", email: "", phone: "", message: "" });
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="w-full bg-[#0F0F0F] text-white">
      {/* Top section with Grid */}
      <div className="relative w-full overflow-hidden px-4 pt-32 pb-1 sm:px-6">
        {/* Standard CSS injection for keyframes and scroll optimization */}
      <style>{`
        @keyframes backInLeft {
          0% {
            transform: translate3d(-80px, 0, 0);
            opacity: 0;
          }
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        @keyframes backInRight {
          0% {
            transform: translate3d(80px, 0, 0);
            opacity: 0;
          }
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        .animate-backInLeft {
          animation: backInLeft 0.6s ease-out both;
        }

        .animate-backInRight {
          animation: backInRight 0.6s ease-out both;
        }

        .scroll-section {
          content-visibility: auto;
          contain-intrinsic-size: 1px 900px;
        }
      `}</style>

      <SupportGrid />
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Header section */}
        <AnimateOnScroll direction="left" className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Help &amp; <span className="text-[#c8f31d]">Support</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
            Need help or have a question? We're here.<br />
            Reach out to the ACTIV team and get clear, human support when you need it.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll direction="right">
          <h2 className="mt-14 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </AnimateOnScroll>

        {/* FAQ Grid */}
        <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">

          {/* Left Column: Players & Platform */}
          <AnimateOnScroll direction="left" className="space-y-9">
            {/* Players Category */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/15 px-3 py-1.5">
                <span className="text-xs font-semibold text-[#c8f31d]">
                  Players
                </span>
              </div>
              <div className="space-y-3">
                {playersFaqs.map((faq, index) => {
                  const isOpen = openPlayerFaq === index;
                  return (
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg border border-white/15 bg-black/80 transition-colors"
                    >
                      <button
                        onClick={() => setOpenPlayerFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between p-4 text-left text-sm font-medium text-white transition-colors hover:bg-white/[0.06]"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown open={isOpen} />
                      </button>
                      {isOpen && (
                        <div className="border-t border-white/10 px-4 pb-4 pt-3 text-xs leading-relaxed text-white/60">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Platform & Support Category */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/15 px-3 py-1.5">
                <span className="text-xs font-semibold text-[#c8f31d]">
                  Platform &amp; Support
                </span>
              </div>
              <div className="space-y-3">
                {platformFaqs.map((faq, index) => {
                  const isOpen = openPlatformFaq === index;
                  return (
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg border border-white/15 bg-black/80 transition-colors"
                    >
                      <button
                        onClick={() => setOpenPlatformFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between p-4 text-left text-sm font-medium text-white transition-colors hover:bg-white/[0.06]"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown open={isOpen} />
                      </button>
                      {isOpen && (
                        <div className="border-t border-white/10 px-4 pb-4 pt-3 text-xs leading-relaxed text-white/60">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right Column: Venue Partners */}
          <AnimateOnScroll direction="right">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/15 px-3 py-1.5">
              <span className="text-xs font-semibold text-[#c8f31d]">
                Venue partners
              </span>
            </div>
            <div className="space-y-3">
              {venueFaqs.map((faq, index) => {
                const isOpen = openVenueFaq === index;
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg border border-white/15 bg-black/80 transition-colors"
                  >
                    <button
                      onClick={() => setOpenVenueFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-4 text-left text-sm font-medium text-white transition-colors hover:bg-white/[0.06]"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown open={isOpen} />
                    </button>
                    {isOpen && (
                      <div className="border-t border-white/10 px-4 pb-4 pt-3 text-xs leading-relaxed text-white/60">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </AnimateOnScroll>

        </div>
      </div>
      </div>

      {/* Bottom section (Contact Form) without Grid */}
      <div className="relative mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {/* Contact Form Section */}
        <div id="contact" className="scroll-section mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <AnimateOnScroll direction="left">
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-[1.1]">
              Got a Question? <br />
              <span className="italic text-[#c8f31d]">We're Listening</span>
            </h2>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Send us a message and we'll get back to you within 24 hours.
            </p>
            <div className="mt-8 text-white/20">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right">
            <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-[#c8f31d]/40 bg-black/85 p-7 shadow-[0_0_28px_rgba(200,243,29,0.14)] sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full name"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-md border border-white/5 bg-[#181916] px-4 py-3 text-sm text-white placeholder-white/40 focus:border-[#c8f31d] focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-md border border-white/5 bg-[#181916] px-4 py-3 text-sm text-white placeholder-white/40 focus:border-[#c8f31d] focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-md border border-white/5 bg-[#181916] px-4 py-3 text-sm text-white placeholder-white/40 focus:border-[#c8f31d] focus:outline-none"
                />
              </div>
              <div>
                <textarea
                  placeholder="How can we help you?"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full resize-none rounded-md border border-white/5 bg-[#181916] px-4 py-3 text-sm text-white placeholder-white/40 focus:border-[#c8f31d] focus:outline-none"
                />
              </div>
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitState === "sending"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#c8f31d] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#181916] text-[#c8f31d]">
                    <PlayerIcon />
                  </span>
                  {submitState === "sending" ? "Sending..." : "Send message"}
                </button>
                <span className="text-[14px] text-white/40 block mt-2">
                  {submitState === "success"
                    ? "Thanks. We'll get back to you within 24 hours."
                    : submitState === "error"
                      ? "Something went wrong. Please try again."
                      : "We'll only use your details to get back to you about your message."}
                </span>
              </div>
            </form>
          </AnimateOnScroll>
        </div>

      </div>
    </div>
  );
}

function SupportGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-100"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='72' height='72' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0v72' stroke='rgba(255, 255, 255, 0.1)' stroke-width='1' stroke-dasharray='4 6' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: "72px 72px",
      }}
    />
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-white/60 transition-transform duration-200 ${open ? "rotate-180" : ""
        }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function PlayerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="3" r="1.2" />
      <circle cx="7" cy="3" r="1.2" />
      <circle cx="6" cy="6" r="1.2" />
      <circle cx="9" cy="6" r="1.2" />
      <circle cx="8" cy="9" r="1.2" />
      <circle cx="11" cy="9" r="1.2" />
      <circle cx="6" cy="12" r="1.2" />
      <circle cx="9" cy="12" r="1.2" />
      <circle cx="4" cy="15" r="1.2" />
      <circle cx="7" cy="15" r="1.2" />
    </svg>
  );
}