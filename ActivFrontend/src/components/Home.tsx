"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface HomeProps {
  onNavigate: (sectionId: string) => void;
}

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

export default function Home({ onNavigate }: HomeProps) {
  // Video should be fully visible as soon as it can actually play, with a
  // short fallback timer so the poster/black background never lingers past ~1s.
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVideoVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
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

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex min-h-[640px] w-full items-end overflow-hidden bg-[#0F0F0F] sm:min-h-[730px]"
      >
        {/* Background video with overlay (FIXED: real <video> tag, correct /public path, no iframe zoom hack) */}
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-700 ease-out ${
            videoVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/Home.mp4"
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

        {/* Gradient overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-[2] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-[2] pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-14 pt-40 sm:px-6 sm:pb-20">
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8f31d]" />
            <span className="text-xs font-medium text-white/90">
              India&apos;s Sports &amp; Wellbeing Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl md:text-7xl">
            Make your
            <br />
            <span className="text-[#c8f31d]">Move</span>
          </h1>

          {/* Body copy */}
          <p className="mt-5 max-w-md text-base leading-relaxed text-#E6ECD7 sm:text-lg">
            Live availability across turfs, courts, gyms, studios, and wellness
            venues near you. Find the right session, book directly, and pay
            securely. No calling, no WhatsApp groups, no second-guessing.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#players"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("players");
              }}
              className="group inline-flex items-center gap-3 rounded-[13px] bg-black pl-1.5 pr-5 py-1.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] border border-[#c8f31d]/70 shadow-[0_0_15px_rgba(200,243,29,0.2)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c8f31d] text-black">
                <PlayerIcon />
              </span>
              I&apos;m a player
            </a>

            <a
              href="#venue-partners"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("venue-partners");
              }}
              className="group inline-flex items-center gap-3 rounded-[13px] bg-black pl-1.5 pr-5 py-1.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] border border-[#c8f31d]/70 shadow-[0_0_15px_rgba(200,243,29,0.2)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c8f31d] text-black">
                <VenueIcon />
              </span>
              I run a venue
            </a>
          </div>
        </div>
      </section>

      {/* Section 1: What We Do */}
      <section className="scroll-section relative bg-[#0F0F0F] px-4 py-20 sm:px-6 sm:py-28 overflow-hidden border-t border-white/5">
        {/* Decorative background: fading grid + diagonal hatch corner (matches Figma) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GridBackground />
          <DiagonalHatch className="absolute bottom-0 left-0 h-40 w-40 opacity-70" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll direction="left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
                What We Do
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Making Active <br /> Living <span className="text-[#c8f31d]">Accessible</span> for Everyone
            </h2>
            <p className="mt-6 text-base text-#E6ECD7 leading-relaxed sm:text-lg">
              The hardest part of being active isn't the activity. It's everything before it. Finding a place worth going to, checking if it's open, calling, messaging, second-guessing, sometimes giving up. ACTIV cuts the whole pre-game out. You see what's free, you book, you show up.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/15 bg-black/75 p-6 backdrop-blur-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <EyeIcon />
              </div>
              <h3 className="text-lg font-semibold text-white">Real venues, near you</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Vetted turfs, courts, gyms, studios and wellness spaces, all in one app. The places worth showing up to, with none of the hunt.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-black/75 p-6 backdrop-blur-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <LightningIcon />
              </div>
              <h3 className="text-lg font-semibold text-white">Instant Bookings</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Live availability, direct booking, and secure payments. The booking lands in your dashboard before the player finishes tying their laces.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-black/75 p-6 backdrop-blur-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <ChartIcon />
              </div>
              <h3 className="text-lg font-semibold text-white">Growth Insights</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Revenue, occupancy and peak-hour patterns, updated through the day. Pricing and scheduling stop being guesses.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-black/75 p-6 backdrop-blur-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <ShieldCheckIcon />
              </div>
              <h3 className="text-lg font-semibold text-white">Verified Quality</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Every venue on ACTIV is reviewed by our team before it goes live, so players know what they're walking into.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 2: For Players */}
      <section id="players" className="scroll-section relative bg-[#0F0F0F] px-4 py-20 sm:px-6 sm:py-28 overflow-hidden border-t border-white/5">
        {/* Decorative background: full-width triangle-wave zigzag + top-right mesh accent (matches Figma) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <TriangleWave className="opacity-90" />
          <TriangleLines className="-top-6 right-0 h-72 w-72 opacity-70" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll direction="left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
                For Players
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Booking a session shouldn't take longer than <span className="text-[#c8f31d]">The Session Itself</span>
            </h2>
            <p className="mt-6 text-base text-white/60 leading-relaxed sm:text-lg">
              Verified gym, turf, court, fitness studio, and wellness venue in your city, in one app. The Saturday regular and the first-timer get the same clean flow. No calling, no WhatsApp, no second-guessing. Just the move you wanted to make, starting where it should have started.
            </p>

            <div className="mt-8">
              <a
                href="#home"
                className="inline-flex items-center gap-2 rounded-full bg-[#EAE6DF] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                See how it works <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-medium text-white/80">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c8f31d]" /> Pay per session</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c8f31d]" /> Easy booking</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c8f31d]" /> Verified venues</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" className="flex flex-col gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-black/75 p-5 backdrop-blur-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <SearchListIcon />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white">Find what's good</h3>
                <p className="mt-1 text-[13px] text-white/50">Badminton, pickleball, gym, and many more, — find it instantly.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-black/75 p-5 backdrop-blur-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <CalendarCheckIcon />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white">Book in seconds</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-black/75 p-5 backdrop-blur-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <RunIcon />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white">Try anything</h3>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 3: For Venue Partners */}
      <section id="venue-partners" className="scroll-section relative bg-[#0F0F0F] px-4 py-20 sm:px-6 sm:py-28 overflow-hidden border-t border-white/5">
        {/* Decorative background: full-width triangle-wave zigzag + top-right mesh accent + chevron (matches Figma) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <TriangleWave className="opacity-90" />
          <TriangleLines className="-top-6 right-0 h-72 w-72 opacity-70" />
          <ChevronBracket className="top-[110px] right-[190px] h-20 w-12 opacity-70" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll direction="left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
                For Venue Partners
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Empty courts cost the same as <span className="text-[#c8f31d]">Full Ones</span>
            </h2>
            <p className="mt-6 text-base text-#E6ECD7 leading-relaxed sm:text-lg">
              ACTIV is how venues across India fill them. We put your slots in front of every player searching in your area, take the booking admin off your plate, and give you data on what's working. No setup fees. No long contracts. No four-week sales call before anything starts working.
            </p>

            <div className="mt-8">
              <a
                href="#home"
                className="inline-flex items-center gap-2 rounded-full bg-[#EAE6DF] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                See how it works <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-medium text-white/80">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c8f31d]" /> Self-onboard in minutes</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c8f31d]" /> Zero setup fees</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c8f31d]" /> Go live within 24 hours of verification</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" className="flex flex-col gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-black/75 p-5 backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c8f31d]/60 bg-black/75 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <GlobeIcon />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white">Get Discovered Instantly</h3>
                <p className="mt-1 text-[13px] text-white/50">Your venue appears in search the moment a player decides to play. More visibility, more bookings, none of it dependent on the algorithm liking you that week.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-black/75 p-5 backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c8f31d]/60 bg-black/75 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <RotateIcon />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white">Automate Your Operations</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-black/75 p-5 backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c8f31d]/60 bg-black/75 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <HeartIcon />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white">Build Community Loyalty</h3>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 4: Why Trust Activ (Testimonials) - With AbstractDesign.png Background Image */}
      <section className="scroll-section relative bg-[#0F0F0F] px-4 py-20 sm:px-6 sm:py-28 overflow-hidden border-t border-white/5">
        {/* AbstractDesign.png Background Image Container */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-80 z-0 overflow-hidden flex justify-center">
          <img
            src="/players/AbstractDesign.png"
            alt=""
            className="w-full h-full object-contain brightness-125 contrast-110"
            style={{
              maskImage: "linear-gradient(to bottom, black 20%, rgba(0,0,0,0.5) 60%, transparent 95%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 20%, rgba(0,0,0,0.5) 60%, transparent 95%)"
            }}
          />
        </div>

        {/* Decorative background: side circle arcs (matches Figma) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <CircleArc className="top-1/2 -left-52 -translate-y-1/2 h-[420px] w-[420px] opacity-60" />
          <CircleArc className="top-1/2 -right-52 -translate-y-1/2 h-[420px] w-[420px] opacity-60" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
              WHY TRUST ACTIV
            </span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
            Built with the people <br /> running the <span className="text-[#c8f31d]">Floor.</span>
          </h2>
          <p className="mt-4 text-base text-#E6ECD7 max-w-xl mx-auto">
            Every feature on ACTIV started as a frustration from a venue owner. Their feedback decides what we ship next, and what we choose not to ship at all.
          </p>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimateOnScroll
            direction="left"
            className="flex flex-col justify-between rounded-2xl border border-white/15 bg-black/75 p-8 backdrop-blur-sm"
          >
            <p className="text-sm text-white/80 leading-relaxed">
              Before ACTIV, our bookings lived in three places. A WhatsApp group, a notebook at the front desk, and someone's memory. Cleaning that up gave us back hours every week, and the visibility brought in players we'd never have reached on our own.
            </p>
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-semibold text-white">Rajesh Menon</h4>
              <p className="text-xs text-white/50 mt-0.5">Owner, SmashZone Badminton Arena, Banglore</p>
            </div>
          </AnimateOnScroll>

          <div className="flex flex-col justify-between rounded-2xl border border-white/15 bg-black/75 p-8 backdrop-blur-sm">
            <p className="text-sm text-white/80 leading-relaxed">
              Most of my day used to disappear into replying to enquiries about timings and slot availability. The app handles all of it now, which means I'm back on the mat where I should be, and the studio runs itself in the background.
            </p>
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-semibold text-white">Priya Sharma</h4>
              <p className="text-xs text-white/50 mt-0.5">Founder, FlowState Yoga Studio, Mumbai</p>
            </div>
          </div>

          <AnimateOnScroll
            direction="right"
            className="flex flex-col justify-between rounded-2xl border border-white/15 bg-black/75 p-8 backdrop-blur-sm"
          >
            <p className="text-sm text-white/80 leading-relaxed">
              The dashboard alone has changed how we run the place. I can see peak hours, what's selling, what's empty, and where the energy of the gym goes. We stopped guessing, and revenue followed shortly after.
            </p>
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-semibold text-white">Amit Patel</h4>
              <p className="text-xs text-white/50 mt-0.5">Manager, FitCore Gym & Wellness, Hyderabad</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}

// Full-width triangle-wave / zigzag mesh (the dominant repeating X pattern
// spanning the full section width, matching the Figma background exactly)
function TriangleWave({ className = "" }: { className?: string }) {
  const P = 311; // measured horizontal period of one zigzag cell
  const H = 547; // measured vertical span (top apex to bottom apex)
  const N = 5; // number of cells (wide enough to cover large screens)
  const lines = [];
  for (let i = 0; i < N; i++) {
    const x1 = i * P;
    const x2 = (i + 1) * P;
    lines.push(
      <line key={`d-${i}`} x1={x1} y1={0} x2={x2} y2={H} stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />,
      <line key={`u-${i}`} x1={x1} y1={H} x2={x2} y2={0} stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
    );
  }
  return (
    <svg
      className={`absolute inset-0 h-full w-full ${className}`}
      viewBox={`0 0 ${N * P} ${H}`}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {lines}
    </svg>
  );
}

// Decorative background elements (Figma-matched)
function GridBackground() {
  return (
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-pattern" width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M 72 0 L 0 0 0 72" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
}

function DiagonalHatch({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="diagonal-hatch" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" />
        </pattern>
        <mask id="hatch-fade">
          <rect width="160" height="160" fill="url(#hatch-fade-gradient)" />
          <radialGradient id="hatch-fade-gradient" cx="0" cy="1" r="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#diagonal-hatch)" mask="url(#hatch-fade)" />
    </svg>
  );
}

// Low-poly triangulated mesh (Delaunay network), matching the continuous
// triangle line-art pattern used in the "For Players" / "For Venue Partners" backgrounds
function TriangleLines({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute ${className}`}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="330" y1="10" x2="420" y2="40" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="330" y1="10" x2="340" y2="150" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="330" y1="10" x2="250" y2="160" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="330" y1="10" x2="150" y2="90" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="420" y1="40" x2="480" y2="140" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="420" y1="40" x2="340" y2="150" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="480" y1="140" x2="500" y2="260" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="480" y1="140" x2="340" y2="150" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="480" y1="140" x2="390" y2="250" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="500" y1="260" x2="470" y2="380" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="500" y1="260" x2="390" y2="250" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="500" y1="260" x2="480" y2="470" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="470" y1="380" x2="420" y2="460" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="470" y1="380" x2="300" y2="430" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="470" y1="380" x2="390" y2="250" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="470" y1="380" x2="480" y2="470" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="420" y1="460" x2="300" y2="430" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="420" y1="460" x2="60" y2="430" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="420" y1="460" x2="480" y2="470" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="300" y1="430" x2="230" y2="340" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="300" y1="430" x2="150" y2="420" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="300" y1="430" x2="60" y2="430" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="300" y1="430" x2="390" y2="250" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="230" y1="340" x2="260" y2="220" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="230" y1="340" x2="150" y2="420" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="230" y1="340" x2="180" y2="250" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="230" y1="340" x2="390" y2="250" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="260" y1="220" x2="340" y2="150" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="260" y1="220" x2="180" y2="250" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="260" y1="220" x2="250" y2="160" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="260" y1="220" x2="390" y2="250" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="340" y1="150" x2="250" y2="160" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="340" y1="150" x2="390" y2="250" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="150" y1="420" x2="60" y2="430" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="150" y1="420" x2="180" y2="250" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="60" y1="430" x2="180" y2="250" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="60" y1="430" x2="150" y2="90" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="60" y1="430" x2="480" y2="470" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="180" y1="250" x2="250" y2="160" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="180" y1="250" x2="150" y2="90" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <line x1="250" y1="160" x2="150" y2="90" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
    </svg>
  );
}

function ChevronBracket({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute ${className}`}
      viewBox="0 0 60 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M48 8 L12 50 L48 92" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.5" />
    </svg>
  );
}

function CircleArc({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute ${className}`} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="198" stroke="#ffffff" strokeOpacity="0.09" strokeWidth="1" />
      <circle cx="200" cy="200" r="150" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1" />
      <circle cx="200" cy="200" r="105" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
    </svg>
  );
}

// Icons
function PlayerIcon() {
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

function VenueIcon() {
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
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  );
}

function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
  );
}

function SearchListIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="15" y1="12" x2="3" y2="12" />
      <line x1="11" y1="18" x2="3" y2="18" />
      <circle cx="18" cy="15" r="3" />
      <line x1="22" y1="19" x2="20.2" y2="17.2" />
    </svg>
  );
}

function CalendarCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function RunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18.5" cy="5.5" r="1.5" />
      <path d="M11.5 9.5 8 13l-4-1" />
      <path d="m14 13-1.5 4.5L16 21" />
      <path d="m7 19 2-4 3-1 3-3 2-3" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function RotateIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 21h5v-5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}