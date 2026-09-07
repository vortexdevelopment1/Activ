"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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

export default function Players() {
  // Video should be fully visible as soon as it can actually play, with a
  // short fallback timer so the poster/black background never lingers past ~1s.
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVideoVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="players" className="bg-[#0F0F0F] text-white w-full overflow-hidden">
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
          className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-700 ease-out ${videoVisible ? "opacity-100" : "opacity-0"
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
              ACTIV For Players – Pan India Coverage
            </span>
          </div>

          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl md:text-7xl">
            Find it.
            <br />
            Book it. <span className="text-[#c8f31d]">Play it.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Every verified gym, court, studio and wellness venue in your city, in one app. Live availability, instant booking, none of the WhatsApp dance to get there.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs font-medium text-white/80">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c8f31d]" /> Pay-per-session</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c8f31d]" /> Easy booking</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c8f31d]" /> Verified venues</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-3 rounded-[13px] bg-black pl-1.5 pr-5 py-1.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] border border-[#c8f31d]/70 shadow-[0_0_15px_rgba(200,243,29,0.2)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c8f31d] text-black">
                <AppleIcon />
              </span>
              Download for iOS
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-3 rounded-[13px] bg-black pl-1.5 pr-5 py-1.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] border border-[#c8f31d]/70 shadow-[0_0_15px_rgba(200,243,29,0.2)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c8f31d] text-black">
                <GooglePlayIcon />
              </span>
              Download for Android
            </a>
          </div>
        </div>
      </section>

      {/* 2. Why Activ Section */}
      <section className="scroll-section relative overflow-hidden border-t border-white/5 px-4 py-20 sm:px-6 sm:py-28">
        <SectionGrid />
        <AnimateOnScroll direction="left" className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
              WHY ACTIV
            </span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
            Booking a session shouldn't take longer <br className="hidden sm:inline" />
            than <span className="text-[#c8f31d]">The Session Itself</span>
          </h2>
          <p className="mt-6 text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            The hardest part of being active in India isn't the activity, it's the loop you go through to get to it. Searching Instagram, asking the group chat, calling three places, hoping someone replies before the slot's gone. ACTIV cuts the loop. You see what's available, you book, you show up.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll direction="right" className="relative mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative flex min-h-[250px] flex-col justify-between rounded-2xl border border-white/15 bg-black/75 p-5 shadow-[0_16px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
              <EyeIcon />
            </div>
            <div className="absolute top-5 right-0 pointer-events-none">
              <img src="/players/Union.png" alt="" className="w-19 h-19 object-contain" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Verified venues only</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Every venue on ACTIV is reviewed by our team before it goes live. Real photos, real reviews, real availability.
              </p>
            </div>
          </div>

          <div className="relative flex min-h-[210px] flex-col justify-between rounded-2xl border border-white/15 bg-black/75 p-5 shadow-[0_16px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
              <CalendarIcon />
            </div>
            <div className="absolute top-5 right-0 pointer-events-none">
              <img src="/players/Union.png" alt="" className="w-19 h-19 object-contain" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Live slots, real prices</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                The slot you see is the slot you book. No surge pricing, no "let me check," no arriving to find it taken.
              </p>
            </div>
          </div>

          <div className="relative flex min-h-[210px] flex-col justify-between rounded-2xl border border-white/15 bg-black/75 p-5 shadow-[0_16px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
              <CogIcon />
            </div>
            <div className="absolute top-5 right-0 pointer-events-none">
              <img src="/players/Union.png" alt="" className="w-19 h-19 object-contain" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Easy booking</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Pick, pay, confirmed. The booking lands in your inbox before you've finished deciding what to wear.
              </p>
            </div>
          </div>

          <div className="relative flex min-h-[210px] flex-col justify-between rounded-2xl border border-white/15 bg-black/75 p-5 shadow-[0_16px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
              <LightbulbIcon />
            </div>
            <div className="absolute top-5 right-0 pointer-events-none">
              <img src="/players/Union.png" alt="" className="w-19 h-19 object-contain" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Sport and wellness, one app</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                Badminton on Saturday, yoga on Tuesday, the gym in between. All of it in one place, so your week doesn't live in seven.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* 3. Step 01: From "I should" to "I'm there" */}
      <section className="scroll-section relative overflow-hidden border-t border-white/5 px-4 py-20 sm:px-6 sm:py-28">
        <SectionGrid />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
          <AnimateOnScroll direction="left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
                How It Works
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              From "I should" <br />
              to <span className="text-[#c8f31d]">"I'm there"</span>
            </h2>
            <p className="mt-6 text-base text-white/60 leading-relaxed sm:text-lg">
              Start with what you want to do. Choose the activity that fits your mood, your schedule, or your energy. From football and badminton to gyms, wellness and more — ACTIV helps you find it.
            </p>
          </AnimateOnScroll>

          {/* Middle: Step connector */}
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
              src="/players/iPhoneDark.png"
              alt="ACTIV app home screen showing venues around you"
              className="relative z-10 w-full max-w-[270px] h-auto rounded-[36px] object-contain"
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 4. Step 02: Find what's Near You */}
      <section className="scroll-section relative overflow-hidden border-t border-white/5 px-4 py-20 sm:px-6 sm:py-28">
        <SectionGrid />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
          <AnimateOnScroll direction="left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
                OPEN THE APP
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Find what's <br />
              <span className="text-[#c8f31d]">Near You</span>
            </h2>
            <p className="mt-6 text-base text-white/60 leading-relaxed sm:text-lg">
              Open ACTIV and explore verified venues near you. Browse by sport, activity, or what's available now. Compare your options, check the details, and find a place that fits what you're looking for.
            </p>
          </AnimateOnScroll>

          {/* Middle: Step connector */}
          <div className="hidden lg:flex flex-col items-center justify-center h-full">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent to-white/15" />
            <div className="flex h-14 w-14 shrink-0 rotate-45 items-center justify-center rounded-md border border-[#c8f31d]/40 bg-[#111] shadow-[0_0_15px_rgba(200,243,29,0.15)]">
              <span className="-rotate-45 text-sm font-bold text-[#c8f31d]">02</span>
            </div>
            <div className="w-px flex-1 bg-gradient-to-t from-transparent to-white/15" />
          </div>

          <AnimateOnScroll direction="right" className="flex justify-center relative py-10">
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0">
              <div className="w-[75px] h-[370px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/10 absolute bottom-10" />
              <div className="w-[120px] h-[400px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/15 absolute bottom-10" />
              <div className="w-[165px] h-[430px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/20 absolute bottom-10" />
              <div className="w-[210px] h-[455px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/25 absolute bottom-10" />
              <div className="w-[250px] h-[478px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/25 absolute bottom-10" />
              <div className="w-[295px] h-[500px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/30 absolute bottom-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(200,243,29,0.2),transparent_60%)] blur-2xl" />
            </div>

            <div className="flex justify-center relative py-10">
              <img
                src="/players/mocks.png"
                alt="ACTIV app showing nearby venues list"
                className="relative z-10 w-full max-w-[450px] h-auto rounded-[36px] object-contain"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 5. Step 03: Book in The App */}
      <section className="scroll-section relative overflow-hidden border-t border-white/5 px-4 py-20 sm:px-6 sm:py-28">
        <SectionGrid />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
          <AnimateOnScroll direction="left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
                PICK YOUR SLOT
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Book in <br />
              <span className="text-[#c8f31d]">The App</span>
            </h2>
            <p className="mt-6 text-base text-white/60 leading-relaxed sm:text-lg">
              Live slots, real prices, no phone calls. UPI, card, wallet, whatever works. Confirmation lands instantly, and the venue gets notified the moment you book.
            </p>
          </AnimateOnScroll>

          {/* Middle: Step connector */}
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
              src="/players/iPhoneDark(2).png"
              alt="ACTIV app slot booking screen"
              className="relative z-10 w-full max-w-[270px] h-auto rounded-[36px] object-contain"
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 6. Step 04: Walk in Expected */}
      <section className="scroll-section relative overflow-hidden border-t border-white/5 px-4 py-20 sm:px-6 sm:py-28">
        <SectionGrid />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
          <AnimateOnScroll direction="left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
                SHOW UP
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Walk in <br />
              <span className="text-[#c8f31d]">Expected</span>
            </h2>
            <p className="mt-6 text-base text-white/60 leading-relaxed sm:text-lg">
              No reception confusion, no "are you the 6 pm booking?" The venue knows your name and your slot before you arrive. Every session gets logged, so the streak builds itself.
            </p>
          </AnimateOnScroll>

          {/* Middle: Step connector */}
          <div className="hidden lg:flex flex-col items-center justify-center h-full">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent to-white/15" />
            <div className="flex h-14 w-14 shrink-0 rotate-45 items-center justify-center rounded-md border border-[#c8f31d]/40 bg-[#111] shadow-[0_0_15px_rgba(200,243,29,0.15)]">
              <span className="-rotate-45 text-sm font-bold text-[#c8f31d]">04</span>
            </div>
            <div className="w-px flex-1 bg-gradient-to-t from-transparent to-white/15" />
          </div>

          <AnimateOnScroll direction="right" className="flex justify-center relative py-10">
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0">
              <div className="w-[75px] h-[320px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/10 absolute bottom-10" />
              <div className="w-[120px] h-[350px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/15 absolute bottom-10" />
              <div className="w-[165px] h-[385px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/20 absolute bottom-10" />
              <div className="w-[210px] h-[415px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/25 absolute bottom-10" />
              <div className="w-[255px] h-[440px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/25 absolute bottom-10" />
              <div className="w-[295px] h-[465px] rounded-t-full border-t-4 border-l-4 border-r-4 border-b-0 border-[#c8f31d]/30 absolute bottom-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(200,243,29,0.25),transparent_60%)] blur-3xl" />
            </div>

            <img
              src="/players/mocks(1).png"
              alt="ACTIV app booking successful screen"
              className="relative z-10 w-full max-w-[450px] h-auto rounded-[36px] object-contain"
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 7. Target Audiences / Who it's for */}
      <section className="scroll-section relative overflow-hidden border-t border-white/5 px-4 py-20 sm:px-6 sm:py-28">
        <SectionGrid />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <AnimateOnScroll direction="left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#c8f31d]">
                WHO IT'S FOR
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Whoever you are <br />
              Whatever the <span className="text-[#c8f31d]">Move</span>
            </h2>
            <p className="mt-6 text-base text-white/60 leading-relaxed sm:text-lg">
              ACTIV isn't a fitness app. It's a booking app for everyone who plays, trains, practices, or shows up. The first-timer is as welcome as the regular, the comeback as welcome as the streak.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" className="flex flex-col gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-black/75 p-5 shadow-[0_16px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c8f31d]/60 bg-black/75 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <SearchLinesIcon />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">The Saturday regular</h3>
                <p className="mt-1 text-xs text-white/50">Same studio, same friend group, same 7am start. ACTIV remembers your favourites and books them in three taps.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-black/75 p-5 shadow-[0_16px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c8f31d]/60 bg-black/75 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <CalendarBoxCheckIcon />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">The first-time anything</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-black/75 p-5 shadow-[0_16px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c8f31d]/60 bg-black/75 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <RunningPersonIcon />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">The comeback</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-black/75 p-5 shadow-[0_16px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c8f31d]/60 bg-black/75 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
                <RunningPersonIcon />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">The friend group plan</h3>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 8. Bottom Call to Action Banner */}
      <section className="scroll-section relative flex min-h-[400px] w-full items-center justify-center overflow-hidden bg-[#0F0F0F] text-center border-t border-white/5 px-4 py-16 sm:min-h-[600px] sm:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: "url('/4689587144a8bdacab6d7838d59f191c1ca0cf3e.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/40 sm:bg-black/15" />

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-white">
            Make your <br />
            <span className="text-[#c8f31d]">Move!</span>
          </h2>

          <div className="mt-6 flex w-full items-center justify-center gap-3 sm:gap-4">
            <span className="h-px hidden sm:block flex-1 bg-white/40" />
            <p className="text-sm sm:text-base md:text-lg font-medium text-white/90 px-2 text-center">
              because getting active should be easy
            </p>
            <span className="h-px hidden sm:block flex-1 bg-white/40" />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row w-full max-w-md sm:max-w-none justify-center gap-3 sm:gap-4">
            <a
              href="#"
              className="inline-flex w-full sm:w-auto min-w-[200px] h-[50px] items-center justify-center gap-2 rounded-xl sm:rounded-sm bg-white px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#c8f31d]"
            >
              <AppleIcon />
              Download for iOS
            </a>
            <a
              href="#"
              className="inline-flex w-full sm:w-auto min-w-[200px] h-[50px] items-center justify-center gap-2 rounded-xl sm:rounded-sm bg-white px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#c8f31d]"
            >
              <GooglePlayIcon />
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

function SearchLinesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="15" y2="12" />
      <line x1="3" y1="18" x2="11" y2="18" />
      <circle cx="18" cy="15" r="3" />
      <line x1="20.2" y1="17.2" x2="22" y2="19" />
    </svg>
  );
}

function CalendarBoxCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

function RunningPersonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17l-2 3" />
      <path d="M13 14l-2-4-3 1" />
      <path d="M6 18l2-4 3-2 3 1 2-2" />
      <circle cx="14" cy="5" r="1" />
    </svg>
  );
}