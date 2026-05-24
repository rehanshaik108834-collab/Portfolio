import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const Intro = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center center"]
  });

  // Scroll mapping: 
  // Map progress from 0 to 1 as the section enters the view.
  const y1 = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const y2 = useTransform(scrollYProgress, [0.1, 0.5], [80, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  const y3 = useTransform(scrollYProgress, [0.2, 0.6], [80, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  const y4 = useTransform(scrollYProgress, [0.3, 0.7], [80, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <section ref={containerRef} id="about" className="min-h-screen w-full bg-white text-black font-sans px-6 md:px-12 lg:px-16 py-24 overflow-hidden flex items-center justify-center relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 w-full max-w-[1600px] mx-auto">

        {/* Left Column: Context Label */}
        <motion.div
          className="md:col-span-3 lg:col-span-3 pt-2"
          style={{ y: y1, opacity: opacity1 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <h2 className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest">
            Background & Data
          </h2>
        </motion.div>

        {/* Right Column: The Data List */}
        <div className="md:col-span-9 lg:col-span-9 flex flex-col gap-10 md:gap-12">

          {/* 01. EDUCATION */}
          <motion.div style={{ y: y2, opacity: opacity2 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              01. Education
            </h3>
            <div className="flex flex-col">
              <p className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Indian Institute of Information Technology, Sri City
              </p>
              <p className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                Bachelor of Technology in Computer Science & Engineering (2024 – 2028)
              </p>
            </div>
          </motion.div>

          {/* 02. ACTIVITIES & INVOLVEMENT */}
          <motion.div style={{ y: y3, opacity: opacity3 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              02. Activities & Involvement
            </h3>

            <div className="flex flex-col gap-6">
              <div>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  Web Development Member — IOTA Club
                </p>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Projects Club, IIIT Sri City (Sep 2025 – May 2026)
                </p>
                <p className="font-sans text-lg md:text-xl lg:text-2xl font-normal text-black/70 leading-tight tracking-tight mt-3">
                  Contributing to technical event organization, frontend-focused competitions,
                  and web-based initiatives while collaborating on creative problem-solving workflows.
                </p>
              </div>

              <div>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  Web Development Member — NexSync Club
                </p>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Smart Mobility Club, IIIT Sri City (Sep 2025 – May 2026)
                </p>
                <p className="font-sans text-lg md:text-xl lg:text-2xl font-normal text-black/70 leading-tight tracking-tight mt-3">
                  Developing and maintaining the official club website, improving user experience,
                  and supporting smart mobility–focused technical events and digital initiatives.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 03. FOCUS */}
          <motion.div style={{ y: y4, opacity: opacity4 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              03. Focus
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Software Development
              </li>
              <li className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Building & Scaling Complete Applications
              </li>
              <li className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                AI Integration & System Architecture
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Intro;