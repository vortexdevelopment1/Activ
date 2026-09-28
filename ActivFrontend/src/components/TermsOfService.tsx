import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: "01",
      title: "Platform Role",
      content: (
        <ul className="space-y-2 text-[15px] text-white/60">
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>ACTIV is an intermediary connecting players with venue partners.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>We do not own, operate, or manage any venue listed on the platform.</span>
          </li>
        </ul>
      )
    },
    {
      id: "02",
      title: "User and Partner Policies",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-medium mb-2 text-[15px]">Users</h4>
            <ul className="space-y-2 text-[15px] text-white/60">
              <li className="flex items-start gap-2">
                <span className="text-[#c8f31d] mt-1">-</span>
                <span>Must provide accurate information during registration.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c8f31d] mt-1">-</span>
                <span>Must follow venue-specific rules and guidelines.</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2 text-[15px]">Venue Partners</h4>
            <ul className="space-y-2 text-[15px] text-white/60">
              <li className="flex items-start gap-2">
                <span className="text-[#c8f31d] mt-1">-</span>
                <span>Must provide accurate listings and availability.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c8f31d] mt-1">-</span>
                <span>Must honor confirmed bookings made through the platform.</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "03",
      title: "Booking & Payments",
      content: (
        <ul className="space-y-2 text-[15px] text-white/60">
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>Payments are processed securely via third-party gateways.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>By confirming a booking, you agree to pay the specified amount.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>ACTIV is not responsible for any payment failures due to network issues.</span>
          </li>
        </ul>
      )
    },
    {
      id: "04",
      title: "Cancellations & Refunds",
      content: (
        <ul className="space-y-2 text-[15px] text-white/60">
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>Cancellations must be made within the venue's specified cancellation window.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>Refunds for eligible cancellations will be processed to the original payment method.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>Late cancellations may not be eligible for a refund.</span>
          </li>
        </ul>
      )
    },
    {
      id: "05",
      title: "Venue Rules & Liability",
      content: (
        <ul className="space-y-2 text-[15px] text-white/60">
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>Users must adhere to the rules set by the venue partner.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>ACTIV is not liable for any injuries, accidents, or loss of property at the venue.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>Any disputes regarding the venue experience must be resolved directly with the venue management.</span>
          </li>
        </ul>
      )
    },
    {
      id: "06",
      title: "Intellectual Property",
      content: (
        <ul className="space-y-2 text-[15px] text-white/60">
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>All content, logos, and software on the platform are the property of ACTIV.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>Users may not copy, modify, or distribute any part of the platform without permission.</span>
          </li>
        </ul>
      )
    },
    {
      id: "07",
      title: "Termination of Account",
      content: (
        <ul className="space-y-2 text-[15px] text-white/60">
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>We reserve the right to suspend or terminate accounts that violate these terms.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c8f31d] mt-1">-</span>
            <span>Fraudulent activity or abuse of the platform will result in immediate ban.</span>
          </li>
        </ul>
      )
    },
    {
      id: "08",
      title: "Changes to Terms",
      content: (
        <p className="text-[15px] text-white/60 leading-relaxed">
          ACTIV reserves the right to modify these terms at any time. Continued use of the platform after updates constitutes acceptance of the revised terms.
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
            Terms of <span className="text-[#c8f31d]">Service</span>
          </h1>
          <p className="text-sm text-white/50">These terms govern your use of the ACTIV platform.</p>
          <p className="text-sm text-white/50 mt-1">Last Updated: 21st March 2024</p>
        </div>

        {/* Intro */}
        <div className="rounded-[20px] border border-white/5 bg-[#141414] p-6 sm:p-8 mb-10">
          <p className="text-[15px] sm:text-base text-white/70 leading-relaxed">
            By accessing or using the ACTIV platform, you agree to be bound by these <strong className="text-white">Terms of Service</strong>. Please read them carefully before making a booking or listing a venue.
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
