import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: "01",
      title: "Scope",
      content: (
        <>
          <p className="text-[15px] text-white/60 mb-3">This policy applies to:</p>
          <ul className="space-y-2 text-[15px] text-white/60">
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>End users booking activities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Venue partners listing venues</span>
            </li>
          </ul>
        </>
      )
    },
    {
      id: "02",
      title: "Information We Collect",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-medium mb-2 text-[15px]">From Users:</h4>
            <ul className="space-y-2 text-[15px] text-white/60">
              <li className="flex items-start gap-2">
                <span className="text-[#c8f31d] mt-1">-</span>
                <span>Name, phone number, email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c8f31d] mt-1">-</span>
                <span>Booking details and preferences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c8f31d] mt-1">-</span>
                <span>Payment history</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2 text-[15px]">From Venue Partners:</h4>
            <ul className="space-y-2 text-[15px] text-white/60">
              <li className="flex items-start gap-2">
                <span className="text-[#c8f31d] mt-1">-</span>
                <span>Business name and details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c8f31d] mt-1">-</span>
                <span>KYC documents (ID, bank details, GST if applicable)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c8f31d] mt-1">-</span>
                <span>Venue location and amenities</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2 text-[15px]">System Information:</h4>
            <ul className="space-y-2 text-[15px] text-white/60">
              <li className="flex items-start gap-2">
                <span className="text-[#c8f31d] mt-1">-</span>
                <span>Device details and app analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c8f31d] mt-1">-</span>
                <span>ACTIV App chat support details</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "03",
      title: "How We Use Information",
      content: (
        <>
          <p className="text-[15px] text-white/60 mb-3">We use data to:</p>
          <ul className="space-y-2 text-[15px] text-white/60">
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Enable bookings and transactions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Match users with relevant venues</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Process payments and payouts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Verify partners (KYC)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Improve platform experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Prevent fraud</span>
            </li>
          </ul>
        </>
      )
    },
    {
      id: "04",
      title: "Data Sharing",
      content: (
        <>
          <p className="text-[15px] text-white/60 mb-3">We may share data with:</p>
          <ul className="space-y-2 text-[15px] text-white/60 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Venue partners (for fulfilling booking)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Payment gateways</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Service providers</span>
            </li>
          </ul>
          <div className="inline-block border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3 py-1.5 rounded-md text-[#c8f31d] text-sm">
            We do not sell your personal data.
          </div>
        </>
      )
    },
    {
      id: "05",
      title: "Data Security",
      content: (
        <p className="text-[15px] text-white/60 leading-relaxed">
          We implement standard security practices to protect data against unauthorized access.
        </p>
      )
    },
    {
      id: "06",
      title: "Data Retention",
      content: (
        <>
          <p className="text-[15px] text-white/60 mb-3">We retain data:</p>
          <ul className="space-y-2 text-[15px] text-white/60">
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>As long as the account is active</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>As required by law</span>
            </li>
          </ul>
        </>
      )
    },
    {
      id: "07",
      title: "User & Partner Rights",
      content: (
        <>
          <p className="text-[15px] text-white/60 mb-3">You may:</p>
          <ul className="space-y-2 text-[15px] text-white/60 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Access or update your data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Request deletion</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Contact support</span>
            </li>
          </ul>
          <a href="mailto:support@activ.live" className="inline-flex items-center gap-2 border border-[#c8f31d]/30 bg-[#c8f31d]/10 px-3 py-1.5 rounded-md text-[#c8f31d] text-sm transition-colors hover:bg-[#c8f31d]/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            support@activ.live
          </a>
        </>
      )
    },
    {
      id: "08",
      title: "Cookies & Tracking",
      content: (
        <>
          <p className="text-[15px] text-white/60 mb-3">We use cookies for:</p>
          <ul className="space-y-2 text-[15px] text-white/60">
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Analytics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c8f31d] mt-1">-</span>
              <span>Personalization</span>
            </li>
          </ul>
        </>
      )
    },
    {
      id: "09",
      title: "Children's Use",
      content: (
        <ul className="space-y-2 text-[15px] text-white/60">
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>Platform intended for 18+ users</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>Minors must use under guardian supervision</span>
          </li>
        </ul>
      )
    },
    {
      id: "10",
      title: "Updates",
      content: (
        <p className="text-[15px] text-white/60 leading-relaxed">
          We may update this policy periodically. Continued use of the platform indicates acceptance of the updated policy.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 mt-[60px]">
            Privacy <span className="text-[#c8f31d]">Policy</span>
          </h1>
          <p className="text-sm text-white/50">Effective Date: 21st March 2024</p>
        </div>

        {/* Intro */}
        <div className="rounded-[20px] border border-white/5 bg-[#141414] p-6 sm:p-8 mb-10">
          <p className="text-[15px] sm:text-base text-white/70 leading-relaxed">
            This Privacy Policy describes how <strong className="text-white">ACTIVPULSE BOOKING PRIVATE LIMITED</strong> ("ACTIV", "we", "our", "us") collects, uses, and protects information of both users and venue partners using the ACTIV platform.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="rounded-[20px] border border-white/5 bg-[#141414] p-6 sm:p-8 hover:border-[#c8f31d]/20 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-[#c8f31d]/10 text-xs font-semibold text-[#c8f31d]">
                  {section.id}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#c8f31d]">
                  {section.title}
                </h2>
              </div>
              <div className="pl-10">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-10 rounded-[20px] border border-[#c8f31d]/20 bg-[#c8f31d]/5 p-6 sm:p-8 text-center">
          <h3 className="text-lg font-bold text-white mb-3">Contact Information</h3>
          <p className="text-[15px] text-white/70 mb-2">ACTIVPULSE BOOKING PRIVATE LIMITED</p>
          <p className="text-[15px] text-white/70">
            Email: <a href="mailto:support@activ.live" className="text-[#c8f31d] hover:underline">support@activ.live</a>
          </p>
        </div>
      </div>
    </div>
  );
}
