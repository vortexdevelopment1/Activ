export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F0F0F] gap-8">
      <img src="/Activlogo.svg" alt="Loading" className="h-20 w-auto animate-pulse" />
      
      {/* Animated Green Line */}
      <div className="relative h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <div 
          className="absolute left-0 top-0 h-full w-1/3 rounded-full bg-[#c8f31d]"
          style={{ animation: 'loader-slide 2.2s infinite ease-in-out' }}
        />
      </div>

      <style>{`
        @keyframes loader-slide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(300%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
