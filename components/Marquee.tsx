import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Marquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.marquee-inner-strip', {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: 'linear',
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  const text = "ANALYZE • DESIGN • BUILD • DELIVER • ";

  return (
    <div ref={marqueeRef} className="overflow-hidden w-full bg-[#050505] text-white py-12 border-y border-white/10">
      <div className="marquee-inner-strip flex whitespace-nowrap w-fit">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="text-5xl md:text-8xl font-black uppercase tracking-tight pr-12 opacity-80">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
