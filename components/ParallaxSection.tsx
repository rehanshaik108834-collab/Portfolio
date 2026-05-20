import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  zIndex?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children, zIndex = 1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track this section's progress. 
  // We start the effect only when the BOTTOM of the section enters the bottom of the viewport ("end end")
  // and finish when the BOTTOM hits the top ("end start").
  // This ensures we never cut off content while the user is still reading it!
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  // Visual effects: 
  // Translate down by a fixed small amount (15vh) instead of a percentage, 
  // so tall sections don't get pushed down massively.
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "15vh"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity, zIndex }}
      className="w-full relative origin-top shadow-2xl"
    >
      <div className="w-full bg-[#050505]">
        {children}
      </div>
    </motion.div>
  );
};

export default ParallaxSection;
