import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import WorkGallery from './components/WorkGallery';
import Skills from './components/Skills';
import Marquee from './components/Marquee';
import Contact from './components/Contact';

import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ParallaxSection from './components/ParallaxSection';

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's native lag smoothing to prevent stutters
    gsap.ticker.lagSmoothing(0);

    // Animation Loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#e1e1e1]">
      <div className="noise-overlay"></div>
      <CustomCursor />
      <Header />
      <main>
        <ParallaxSection zIndex={10}>
          <Hero />
        </ParallaxSection>
        
        <ParallaxSection zIndex={20}>
          <Intro />
        </ParallaxSection>
        
        <ParallaxSection zIndex={30}>
          <WorkGallery />
        </ParallaxSection>
        
        <ParallaxSection zIndex={40}>
          <Skills />
          <Marquee />
          <Contact />
        </ParallaxSection>
      </main>
      <ParallaxSection zIndex={70}>
        <Footer />
      </ParallaxSection>
    </div>
  );
}