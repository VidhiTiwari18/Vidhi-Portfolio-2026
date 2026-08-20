import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import aboutImg from '../assets/about-black-blazer.jpg';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const AboutSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  // 1. Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(200);
  const spotlightY = useMotionValue(200);

  // 2. Springs for 3D Physics
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), { damping: 18, stiffness: 220 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), { damping: 18, stiffness: 220 });

  // 3. Top-Level Unconditional Transform for Spotlight Background
  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(circle 240px at ${x}px ${y}px, rgba(255,255,255,0.35), rgba(212,175,55,0.18), transparent 80%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsCardHovered(true);

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      id="about" 
      className="relative w-screen min-h-screen bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-24 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden flex items-center"
    >
      {/* ================= BACKGROUND GLOWS & FLOATING PARTICLES ================= */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/6 w-[32rem] h-[32rem] bg-[#D4AF37] rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/6 right-1/4 w-[28rem] h-[28rem] bg-[#8C6D4F] rounded-full blur-[170px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-4 mb-10"
        >
          <span 
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            01 / ABOUT ME
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Main Grid: Content + Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ================= LEFT CONTENT (7 COLS) ================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Cinematic Headline */}
            <motion.div variants={fadeUpVariants} className="relative mb-6 select-none">
              <h2
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] tracking-tight uppercase leading-[0.88]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]">
                  I DON'T JUST WRITE CODE.
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.3)]">
                  I BUILD WHAT'S NEXT.
                </span>
              </h2>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[14.5px] font-light text-[#B3A497] leading-[1.85] tracking-wide mb-10 max-w-xl"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              I'm <span className="text-[#F3DBB3] font-medium">Vidhi Tiwari</span>, a Computer Science student and aspiring software engineer focused on AI, full-stack development, and problem solving. I build practical products that combine intelligent systems, clean interfaces, and reliable engineering — turning ideas into experiences that are useful, scalable, and built to make an impact.
            </motion.p>

            {/* Four organized identity / achievement metrics */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-10 w-full pt-7 pb-3 border-t border-[#8C6D4F]/25"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 w-full">
                {/* 01 — Academics */}
                <div className="min-w-0 px-5 sm:px-6 lg:px-7 py-5 sm:py-6 border-r border-[#D4AF37]/20">
                  <span className="block text-[8px] tracking-[0.3em] text-[#8C6D4F] mb-4">01</span>
                  <span
                    className="block text-[2.7rem] sm:text-[3.1rem] leading-none font-light text-[#D4AF37] tracking-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    8.78
                  </span>
                  <span className="block mt-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-[#F4EBE2]">
                    B.Tech CGPA
                  </span>
                  <span className="block mt-2 text-[9px] sm:text-[10px] leading-[1.5] text-[#95877C] max-w-[150px]">
                    Consistent Academic Excellence
                  </span>
                </div>

                {/* 02 — Technical Focus */}
                <div className="min-w-0 px-5 sm:px-6 lg:px-7 py-5 sm:py-6 border-r border-[#D4AF37]/20">
                  <span className="block text-[8px] tracking-[0.3em] text-[#8C6D4F] mb-4">02</span>
                  <span
                    className="block text-[2rem] sm:text-[2.35rem] leading-[0.9] font-light text-[#F4EBE2] tracking-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    FULL STACK
                  </span>
                  <span
                    className="block mt-1 text-[1.7rem] sm:text-[2rem] leading-[0.9] font-light text-[#D4AF37] tracking-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    + GEN AI
                  </span>
                  <span className="block mt-3 text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase text-[#A8988B]">
                    Core Focus
                  </span>
                  <span className="block mt-2 text-[9px] sm:text-[10px] leading-[1.5] text-[#95877C]">
                    AI / Web Applications
                  </span>
                </div>

                {/* 03 — Athlete */}
                <div className="min-w-0 px-5 sm:px-6 lg:px-7 py-5 sm:py-6 border-r border-[#D4AF37]/20">
                  <span className="block text-[8px] tracking-[0.3em] text-[#8C6D4F] mb-4">03</span>
                  <span
                    className="block text-[1.95rem] sm:text-[2.3rem] leading-[0.9] font-light text-[#D4AF37] tracking-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    NATIONAL
                  </span>
                  <span
                    className="block mt-1 text-[1.55rem] sm:text-[1.9rem] leading-[0.9] font-light text-[#F4EBE2] tracking-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    LEVEL ATHLETE
                  </span>
                  <span className="block mt-3 text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase text-[#A8988B]">
                    Achievement
                  </span>
                  <span className="block mt-2 text-[9px] sm:text-[10px] leading-[1.5] text-[#95877C]">
                    Basketball Player
                  </span>
                </div>

                {/* 04 — Leadership */}
                <div className="min-w-0 px-5 sm:px-6 lg:px-7 py-5 sm:py-6">
                  <span className="block text-[8px] tracking-[0.3em] text-[#8C6D4F] mb-4">04</span>
                  <span
                    className="block text-[1.95rem] sm:text-[2.3rem] leading-[0.9] font-light text-[#D4AF37] tracking-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    PRESIDENT
                  </span>
                  <span className="block mt-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-[#F4EBE2]">
                    Codec Club
                  </span>
                  <span className="block mt-2 text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase text-[#A8988B]">
                    Leadership
                  </span>
                  <span className="block mt-2 text-[9px] sm:text-[10px] leading-[1.5] text-[#95877C] max-w-[155px]">
                    Organized events &amp; led teams
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT PORTRAIT FRAME (PERFECT LOCKED GEOMETRY) ================= */}
          <div className="lg:col-span-5 flex items-center justify-center relative perspective-[1400px]">
            
            {/* Strong cinematic gold aura — intentionally visible around the portrait */}
            <motion.div
              aria-hidden="true"
              animate={{
                opacity: [0.48, 0.78, 0.48],
                scale: [1, 1.035, 1],
              }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-10 z-0 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.38)_0%,rgba(212,175,55,0.20)_34%,rgba(212,175,55,0.08)_56%,transparent_76%)] blur-[28px] pointer-events-none"
            />

            {/* Focused gold light on the left/right edges of the frame */}
            <motion.div
              aria-hidden="true"
              animate={{ opacity: [0.45, 0.95, 0.45] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-4 z-0 rounded-xl border border-[#D4AF37]/45 shadow-[0_0_18px_rgba(212,175,55,0.55),0_0_55px_rgba(212,175,55,0.30),inset_0_0_20px_rgba(212,175,55,0.10)] pointer-events-none"
            />

            {/* Vertical cinematic light streaks */}
            <motion.div
              aria-hidden="true"
              animate={{ opacity: [0.15, 0.55, 0.15] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-7 top-[10%] h-[80%] w-5 z-0 rounded-full bg-[#D4AF37]/35 blur-[18px] pointer-events-none"
            />
            <motion.div
              aria-hidden="true"
              animate={{ opacity: [0.18, 0.65, 0.18] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="absolute -right-7 top-[10%] h-[80%] w-5 z-0 rounded-full bg-[#D4AF37]/40 blur-[18px] pointer-events-none"
            />

            {/* Drifting Gold Spark Embers on Hover */}
            {isCardHovered && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10, x: -20 }}
                  animate={{ opacity: [0, 1, 0], y: -50, x: -30 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute top-1/4 -left-6 w-1.5 h-1.5 bg-[#F3DBB3] rounded-full blur-[1px] shadow-[0_0_8px_#D4AF37] pointer-events-none z-30"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20, x: 20 }}
                  animate={{ opacity: [0, 1, 0], y: -60, x: 40 }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
                  className="absolute bottom-1/3 -right-6 w-2 h-2 bg-[#D4AF37] rounded-full blur-[1px] shadow-[0_0_10px_#D4AF37] pointer-events-none z-30"
                />
              </>
            )}

            {/* 3D Holographic Main Card Container */}
            <motion.div
              ref={cardRef}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 p-3.5 border border-[#D4AF37]/55 rounded-sm bg-[#120F0C]/90 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_24px_rgba(212,175,55,0.28),0_0_70px_rgba(212,175,55,0.14)] cursor-pointer group transition-all duration-500 hover:border-[#D4AF37] hover:shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_34px_rgba(212,175,55,0.45),0_0_90px_rgba(212,175,55,0.22)]"
            >
              {/* Dynamic Laser Border Pulse on Card Perimeter */}
              <div className="absolute inset-0 rounded-sm pointer-events-none overflow-hidden">
                <motion.div 
                  animate={{ x: isCardHovered ? ['-100%', '200%'] : '-100%' }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent skew-x-12"
                />
              </div>

              {/* Locked Corner Gold Accent Brackets */}
              <div className="pointer-events-none">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 shadow-[0_0_16px_rgba(212,175,55,0.75)]" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-[0_0_16px_rgba(212,175,55,0.75)]" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37] transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 shadow-[0_0_16px_rgba(212,175,55,0.75)]" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5 shadow-[0_0_16px_rgba(212,175,55,0.75)]" />
              </div>

              {/* Portrait Image Canvas */}
              <div className="relative overflow-hidden w-full max-w-[390px] aspect-[4/5] bg-black rounded-sm">
                {/* Main Portrait */}
                <img
                  src={aboutImg}
                  alt="Vidhi Tiwari"
                  className="w-full h-full object-cover object-top filter brightness-[0.94] contrast-[1.06] saturate-[1.02] group-hover:brightness-105 group-hover:contrast-[1.12] transition-all duration-700 ease-out"
                />

                {/* Mouse-Tracked Holographic Glass Spotlight Sweep */}
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
                  style={{
                    background: spotlightBg,
                    opacity: isCardHovered ? 1 : 0,
                  }}
                />

                {/* Bottom Film Noir Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Monoline Signature */}
                <div className="absolute bottom-4 right-4 z-20 select-none">
                  <span 
                    className="text-3xl text-[#F2D8A7] drop-shadow-[0_0_12px_rgba(242,216,167,0.5)] transition-colors duration-300 group-hover:text-white"
                    style={{ fontFamily: "'Herr Von Muellerhoff', cursive" }}
                  >
                    Vidhi
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;