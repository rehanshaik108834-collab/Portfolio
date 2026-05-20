import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  /** Color of the curtain — should match the *previous* section's background */
  curtainColor?: string;
  /** How far from the bottom of the viewport the section should trigger */
  triggerOffset?: string;
}

/**
 * Wraps a section with a full-cover curtain that slides up (scaleY 1→0)
 * once the section enters the viewport, revealing the content beneath.
 */
const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  curtainColor = '#050505',
  triggerOffset = '120px',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: `0px 0px ${triggerOffset} 0px`,
  });

  return (
    <div ref={ref} className="relative overflow-hidden">
      {children}

      {/* Curtain panel — sits on top, shrinks upward to reveal section */}
      <motion.div
        className="absolute inset-0 z-40 origin-top pointer-events-none"
        style={{ backgroundColor: curtainColor, transformOrigin: 'top' }}
        initial={{ scaleY: 1 }}
        animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{
          duration: 0.75,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </div>
  );
};

export default SectionReveal;
