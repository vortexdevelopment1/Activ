"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Wraps a block and plays backInLeft/backInRight the moment it scrolls into view.
// Animation only fires once (per element) the first time it enters the viewport.
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

const venuePartnerImageUrl = (fileName: string) =>
  `/venuepartners/${encodeURIComponent(fileName)}`;

export default function VenuePartnersv(){
  // Video should be fully visible as soon as it can actually play, with a
  // short fallback timer so the poster/black background never lingers past ~1s.
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVideoVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="venue-partners" className="bg-[#0F0F0F] text-white w-full overflow-hidden">
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

      {/* 1. Hero Section */}
      <section className="relative flex min-h-[640px] w-full items-end overflow-hidden sm:min-h-[730px]">
        {/* Background video with overlay */}
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-700 ease-out ${
            videoVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/UserVideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            tabIndex={-1}
            onLoadedData={() => setVideoVisible(true)}
          />
        </div>
        {/* Transparent shield overlay to block any native click interactions on the video */}
        <div className="absolute inset-0 z-[1] pointer-events-auto" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-[2] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-[2] pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-14 pt-40 sm:px-6 sm:pb-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8f31d]" />
            <span className="text-xs font-medium text-white/90">
              ACTIV For Venue Partners – Pan India Coverage
            </span>
          </div>

          <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl md:text-7xl">
            More bookings, <br />
            <span className="text-[#c8f31d]">Less Admin</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            ACTIV puts your venue in front of every player searching in your area, and handles the messaging, the calendar, and the chase. Built in India, for the way Indian venues actually work.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs font-medium text-white/80">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c8f31d]" /> Self-onboard in minutes</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c8f31d]" /> Zero setup fees</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c8f31d]" /> Go live within 24 hours of verification</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c8f31d]" /> Transparent commission</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-3 rounded-[13px] bg-black px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] border border-[#c8f31d]/70 shadow-[0_0_15px_rgba(200,243,29,0.2)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c8f31d] text-black">
                <AppleIcon />
              </span>
              Download for iOS
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-3 rounded-[13px] bg-black px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] border border-[#c8f31d]/70 shadow-[0_0_15px_rgba(200,243,29,0.2)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c8f31d] text-black">
                <GooglePlayIcon />
              </span>
              Download for Android
            </a>
          </div>
        </div>
      </section>

      {/* 2. Everything You Need (Features Grid) */}
      <section className="scroll-section relative px-4 py-20 sm:px-6 sm:py-28 border-t border-white/5">
        <SectionGrid />
        <AnimateOnScroll direction="left" className="mx-auto max-w-6xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
              EVERYTHING YOU NEED
            </span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
            One Platform To <span className="text-[#c8f31d]">Run &amp; Grow</span> <br className="hidden sm:inline" />
            Your Venue
          </h2>
          <p className="mt-6 text-base text-white/60 max-w-xl mx-auto leading-relaxed">
            Turn your venue into a destination players can discover. Grow your bookings, visibility, and business with ACTIV.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll direction="right" className="mx-auto max-w-6xl mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative flex flex-col justify-between rounded-2xl border border-white/15 bg-black/75 p-6 shadow-[0_16px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm overflow-hidden">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
              <EyeIcon />
            </div>
            <div className="absolute top-5 right-0 pointer-events-none">
              <img src="/venuepartners/Union.png" alt="" className="w-19 h-19 object-contain opacity-90" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Get Discovered Faster</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Reach every player searching for a venue in your area, without depending on Instagram, word of mouth or hoping someone tags you in a story.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-between rounded-2xl border border-white/15 bg-black/75 p-6 shadow-[0_16px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm overflow-hidden">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
              <CalendarIcon />
            </div>
            <div className="absolute top-5 right-0 pointer-events-none">
              <img src="/venuepartners/Union.png" alt="" className="w-19 h-19 object-contain opacity-90" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Bookings without the back-and-forth</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                24/7 bookings on a calendar that prevents double-booking and gives you full control over slots, pricing and availability across every court you run.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-between rounded-2xl border border-white/15 bg-black/75 p-6 shadow-[0_16px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm overflow-hidden">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
              <CogIcon />
            </div>
            <div className="absolute top-5 right-0 pointer-events-none">
              <img src="/venuepartners/Union.png" alt="" className="w-19 h-19 object-contain opacity-90" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Payments that don't go missing</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Money flows in cleanly, with statements your accountant can read. See exactly where revenue is coming from, slot by slot.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-between rounded-2xl border border-white/15 bg-black/75 p-6 shadow-[0_16px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm overflow-hidden">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
              <LightbulbIcon />
            </div>
            <div className="absolute top-5 right-0 pointer-events-none">
              <img src="/venuepartners/Union.png" alt="" className="w-19 h-19 object-contain opacity-90" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">A real human, not a ticket queue</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Real partner support on the other end of the line. We help you set up, get listed and clear blockers fast, because nobody's growing while waiting on a support ticket.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* 3. Step 01: Create Your Partner Account */}
      <section className="scroll-section relative px-4 py-20 sm:px-6 sm:py-28 border-t border-white/5 overflow-hidden">
        <SectionGrid />
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 items-center">
          <AnimateOnScroll direction="left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
                GET STARTED IN MINS
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Create Your <br />
              <span className="text-[#c8f31d]">Partner Account</span>
            </h2>
            <p className="mt-6 text-base text-white/60 leading-relaxed sm:text-lg">
              Download the ACTIV Partner app and create your account in minutes. Add your contact details and primary venue information, and you're onboarded. No paperwork, no complicated setup, no waiting around for someone to call you back.
            </p>
          </AnimateOnScroll>

          <div className="hidden lg:flex flex-col items-center justify-center h-full">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent to-white/15" />
            <div className="flex h-14 w-14 shrink-0 rotate-45 items-center justify-center rounded-md border border-[#c8f31d]/40 bg-[#111] shadow-[0_0_15px_rgba(200,243,29,0.15)]">
              <span className="-rotate-45 text-sm font-bold text-[#c8f31d]">01</span>
            </div>
            <div className="w-px flex-1 bg-gradient-to-t from-transparent to-white/15" />
          </div>

          <AnimateOnScroll direction="right" className="flex justify-center relative py-10">
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0">
              <div className="w-[220px] h-[420px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/10 absolute bottom-10" />
              <div className="w-[260px] h-[470px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/25 absolute bottom-10" />
              <div className="w-[305px] h-[565px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/25 absolute bottom-10" />
              <div className="w-[355px] h-[590px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/30 absolute bottom-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(200,243,29,0.25),transparent_60%)] blur-3xl" />
            </div>

            <img
              src={venuePartnerImageUrl("iPhone 16 Plus Dark.png")}
              alt="ACTIV Partner account setup screen"
              className="relative z-10 w-full max-w-[270px] h-auto rounded-[36px] object-contain"
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 4. Step 02: Showcase What Your Venue Offers */}
      <section className="scroll-section relative px-4 py-20 sm:px-6 sm:py-28 border-t border-white/5 overflow-hidden">
        <SectionGrid />
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 items-center">
          <AnimateOnScroll direction="left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
                SETUP YOUR VENUE
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Showcase What <br />
              <span className="text-[#c8f31d]">Your Venue Offers</span>
            </h2>
            <p className="mt-6 text-base text-white/60 leading-relaxed sm:text-lg">
              Add your venue details, location, activities, photos and amenities, so players see exactly what they're booking before they show up. The more they see, the faster they decide.
            </p>
          </AnimateOnScroll>

          <div className="hidden lg:flex flex-col items-center justify-center h-full">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent to-white/15" />
            <div className="flex h-14 w-14 shrink-0 rotate-45 items-center justify-center rounded-md border border-[#c8f31d]/40 bg-[#111] shadow-[0_0_15px_rgba(200,243,29,0.15)]">
              <span className="-rotate-45 text-sm font-bold text-[#c8f31d]">02</span>
            </div>
            <div className="w-px flex-1 bg-gradient-to-t from-transparent to-white/15" />
          </div>

          <AnimateOnScroll direction="right" className="flex justify-center relative py-10">
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0">
              <div className="w-[75px] h-[330px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/10 absolute bottom-10" />
              <div className="w-[120px] h-[350px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/15 absolute bottom-10" />
              <div className="w-[165px] h-[390px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/20 absolute bottom-10" />
              <div className="w-[210px] h-[415px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/25 absolute bottom-10" />
              <div className="w-[255px] h-[435px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/25 absolute bottom-10" />
              <div className="w-[300px] h-[460px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/30 absolute bottom-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(200,243,29,0.25),transparent_60%)] blur-3xl" />
            </div>
            <img
              src={venuePartnerImageUrl("mocks.png")}
              alt="ACTIV Partner venue setup screen"
              className="relative z-10 w-full max-w-[450px] h-auto rounded-[36px] object-contain"
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 5. Step 03: Quality Venues Build Trust */}
      <section className="scroll-section relative px-4 py-20 sm:px-6 sm:py-28 border-t border-white/5 overflow-hidden">
        <SectionGrid />
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 items-center">
          <AnimateOnScroll direction="left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
                GET VERIFIED &amp; APPROVED
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Quality Venues <br />
              <span className="text-[#c8f31d]">Build Trust</span>
            </h2>
            <p className="mt-6 text-base text-white/60 leading-relaxed sm:text-lg">
              Submit your venue documents and business details for verification. Our team reviews every listing before it goes live, which keeps the standard high and the platform trustworthy. Once approved, your venue is discoverable to every nearby player ready to book.
            </p>
          </AnimateOnScroll>

          <div className="hidden lg:flex flex-col items-center justify-center h-full">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent to-white/15" />
            <div className="flex h-14 w-14 shrink-0 rotate-45 items-center justify-center rounded-md border border-[#c8f31d]/40 bg-[#111] shadow-[0_0_15px_rgba(200,243,29,0.15)]">
              <span className="-rotate-45 text-sm font-bold text-[#c8f31d]">03</span>
            </div>
            <div className="w-px flex-1 bg-gradient-to-t from-transparent to-white/15" />
          </div>

          <AnimateOnScroll direction="right" className="flex justify-center relative py-10">
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0">
              <div className="w-[220px] h-[420px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/10 absolute bottom-10" />
              <div className="w-[260px] h-[470px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/25 absolute bottom-10" />
              <div className="w-[305px] h-[565px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/25 absolute bottom-10" />
              <div className="w-[355px] h-[590px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/30 absolute bottom-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(200,243,29,0.25),transparent_60%)] blur-3xl" />
            </div>

            <img
              src={venuePartnerImageUrl("iPhone 16 Plus Dark (1).png")}
              alt="ACTIV Partner venue verification screen"
              className="relative z-10 w-full max-w-[270px] h-auto rounded-[36px] object-contain"
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 6. Step 04: Start Receiving Bookings & Earn */}
      <section className="scroll-section relative px-4 py-20 sm:px-6 sm:py-28 border-t border-white/5 overflow-hidden">
        <SectionGrid />
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 items-center">
          <AnimateOnScroll direction="left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
                WATCH YOUR VENUE GROW
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Start Receiving <br />
              <span className="text-[#c8f31d]">Bookings &amp; Earn</span>
            </h2>
            <p className="mt-6 text-base text-white/60 leading-relaxed sm:text-lg">
              Use the built-in tools to track bookings, manage availability, update pricing and run discount offers when the courts need filling. ACTIV handles the booking flow end to end, leaving you free to focus on what happens on the floor.
            </p>
          </AnimateOnScroll>

          <div className="hidden lg:flex flex-col items-center justify-center h-full">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent to-white/15" />
            <div className="flex h-14 w-14 shrink-0 rotate-45 items-center justify-center rounded-md border border-[#c8f31d]/40 bg-[#111] shadow-[0_0_15px_rgba(200,243,29,0.15)]">
              <span className="-rotate-45 text-sm font-bold text-[#c8f31d]">04</span>
            </div>
            <div className="w-px flex-1 bg-gradient-to-t from-transparent to-white/15" />
          </div>

          <AnimateOnScroll direction="right" className="flex justify-center relative py-10">
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0">
              <div className="w-[75px] h-[340px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/10 absolute bottom-10" />
              <div className="w-[120px] h-[370px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/15 absolute bottom-10" />
              <div className="w-[165px] h-[400px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/20 absolute bottom-10" />
              <div className="w-[210px] h-[418px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/25 absolute bottom-10" />
              <div className="w-[255px] h-[440px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/25 absolute bottom-10" />
              <div className="w-[300px] h-[465px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/30 absolute bottom-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(200,243,29,0.25),transparent_60%)] blur-3xl" />
            </div>

            <img
              src={venuePartnerImageUrl("mocks (1).png")}
              alt="ACTIV Partner bookings dashboard"
              className="relative z-10 w-full max-w-[450px] h-auto rounded-[36px] object-contain"
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 7. Bottom Call to Action Banner */}
      <section className="scroll-section relative flex min-h-[350px] w-full items-center justify-center overflow-hidden bg-[#0F0F0F] text-center border-t border-white/5 px-4 sm:min-h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: "url('/4689587144a8bdacab6d7838d59f191c1ca0cf3e.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/15" />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center py-12 sm:py-14">
          <h2 className="text-7xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-bold">
            Ready to get
            <span className="text-[#c8f31d] pl-2">ACTIV?</span>
          </h2>
          <div className="mt-6 flex w-full max-w-[840px] items-center gap-3 sm:gap-4">
            <span className="h-px w-[500px] flex-1 bg-white" />
            <p className="shrink-0 text-5xl font-medium text-white/90 sm:text-sm">
              because getting active should be easy
            </p>
            <span className="h-px flex-1 bg-white" />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            <a
              href="#"
              className="inline-flex min-w-[200px] h-[50px] items-center justify-center gap-2 rounded-sm bg-white px-3.5 py-2 text-1xs font-semibold text-black transition-colors hover:bg-[#c8f31d]"
            >
              <img src="/public/venuePartners/apple_svgrepo.com.png" alt="" />
              Download for iOS
            </a>
            <a
              href="#"
              className="inline-flex min-w-[200px] h-[50px] items-center justify-center gap-2 rounded-sm bg-white px-3.5 py-2 text-1xs font-semibold text-black transition-colors hover:bg-[#c8f31d]"
            >
              <img src="/public/venuePartners/android_svgrepo.com.png" alt="" />
              Download for Android
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:72px_72px]"
    />
  );
}

// Minimal Icons helper
function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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

function GooglePlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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

function EyeIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
}
function CalendarIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
}
function CogIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
}
function LightbulbIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></svg>;
}