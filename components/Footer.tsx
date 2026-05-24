import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Dynamically scrubs opacity & scale using scroll progression instead of transition
  const textScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer ref={footerRef} className="bg-black text-white font-sans pt-12 md:pt-20 border-t border-white h-screen flex flex-col">

      {/* Top Section: Info Grid */}
      <motion.div
        className="px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-12 shrink-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Column 1: IDENTIFICATION */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 text-white/80">
            Identification
          </h3>
          <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed">
            Rehan Shaik
          </p>
          <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed text-white/60">
            Software Developer
          </p>
          <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed text-white/60">
            Andhra Pradesh, India
          </p>
        </motion.div>

        {/* Column 2: CHANNELS */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 text-white/80">
            Channels
          </h3>
          <div className="flex flex-col gap-2">
            <a
              href="mailto:rehanshaik3106@gmail.com"
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1"
            >
              Email ↗
            </a>
            <a
              href="https://www.linkedin.com/in/rehan-shaik-980b2b360/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/rehanshaik108834-collab"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1"
            >
              GitHub ↗
            </a>
          </div>
        </motion.div>

        {/* Column 3: AVAILABILITY + YEAR */}
        <motion.div variants={itemVariants} className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 text-white/80">
              Availability
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide text-white">
                Available For Work
              </p>
            </div>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-white/60 leading-relaxed">
              Currently studying and actively seeking software engineering internships. Let's create something extraordinary together.
            </p>
          </div>

          <div className="mt-8 md:mt-0">
            <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-white">
              2026
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Section: Branding Text */}
      <motion.div
        style={{ opacity: textOpacity, scale: textScale }}
        className="w-full flex-1 flex flex-col justify-end items-center overflow-hidden select-none"
      >
        <h1 className="font-sans font-black text-[28vw] md:text-[30vw] lg:text-[33vw] leading-[0.7] text-white uppercase tracking-tighter flex items-center justify-center w-full">
          Rehan
          <span className="text-xl md:text-4xl lg:text-6xl font-medium -mt-[10vw] ml-2 opacity-60">
            ®
          </span>
        </h1>
      </motion.div>
    </footer>
  );
};

export default Footer;