import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ContactForm } from './components/ContactForm';
import { Toaster } from './components/ui/sonner';

// Your actual Figma assets
import imgLandonStudio1 from "figma:asset/31b90ec24eb4d49e32a23c7465d7115c94fc153b.png";
import imgRectangle8 from "figma:asset/33cd1fd67b6e6feffc2f9ea5729b0bbbdc43b3c9.png";
import imgRectangle9 from "figma:asset/f1a1e2f036499fa1edfaa857a1dba84cd3b4d63d.png";
import imgCleanShot20251110At1314212X1 from "figma:asset/0435dcf9f857ba7e769dd823fb00bd1a6df29d3a.png";

const LOGO_PATH = imgLandonStudio1;
const VIDEO_PATH = '/_videos/v1/13b156371c749f2265f77a5845d730175faed609';
const SCREENSHOT_LEFT = imgRectangle8;
const SCREENSHOT_CENTER = imgCleanShot20251110At1314212X1;
const SCREENSHOT_RIGHT = imgRectangle9;

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const cardsInView = useInView(cardsRef, { once: false, amount: 0.2 });
  const contactInView = useInView(contactRef, { once: false, amount: 0.3 });

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-x-hidden bg-black">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9b9f61] to-white origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Animated Wrapper for Desktop */}
      <div className="relative w-full" style={{ minHeight: isMobile ? 'auto' : '2400px' }}>
        {/* Video Background - Full Screen */}
        <div className="fixed inset-0 w-full h-screen z-0">
          {/* Fallback background - warm beige/tan color */}
          <div className="absolute inset-0 bg-[#b5aca0]" />
          
          {/* Video overlay */}
          <video 
            autoPlay 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            controlsList="nodownload" 
            loop 
            muted
            playsInline
          >
            <source src={VIDEO_PATH} />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* Navigation Bar */}
        <motion.div 
          ref={navRef}
          className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-0"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative max-w-[1600px] mx-auto h-[80px] lg:h-[100px] flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="relative h-[60px] lg:h-[80px] w-[100px] lg:w-[140px] z-10 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                alt="landon.studio" 
                className="h-full w-full object-contain"
                src={LOGO_PATH}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div 
                className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-black rounded-[69px] px-12 py-3 transition-all duration-500"
                animate={{ 
                  backgroundColor: isScrolled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)',
                  backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)'
                }}
              >
                <div className="flex gap-12 items-center">
                  {['HOME', 'ABOUT', 'CONTACT', 'LABS', 'PHOTOS'].map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="font-['Inter:Black',sans-serif] font-black text-[15px] text-white cursor-pointer relative group"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.08 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                      <motion.span 
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-white origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Studio Button */}
            <motion.button
              className="bg-[#9b9f61] rounded-[40px] px-6 lg:px-8 py-2 lg:py-3 font-['Inter:Black',sans-serif] font-black text-[13px] lg:text-[15px] text-white z-10 transition-colors"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: '#8a8e55',
                boxShadow: '0 10px 30px rgba(155, 159, 97, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              STUDIO
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden flex flex-col gap-1.5 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileTap={{ scale: 0.9 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span 
                  key={i}
                  className="w-6 h-0.5 bg-white rounded-full"
                  whileHover={{ width: i === 1 ? 28 : 24 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Text Section */}
        <motion.div 
          ref={heroRef}
          className="relative z-10 flex items-center justify-center min-h-screen px-4"
          style={!isMobile ? { y: heroY, opacity: heroOpacity, scale: heroScale } : {}}
        >
          <div className="text-center max-w-[1400px] mx-auto pt-20 lg:pt-0">
            <motion.div
              className="font-['Jersey_10:Regular',sans-serif] text-white text-center"
              initial={{ opacity: 0, y: 100 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p 
                className="text-[50px] sm:text-[80px] lg:text-[150px] leading-[0.9] tracking-[-3px] mb-2 lg:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                BIG THINGS ARE COMING
              </motion.p>
              <motion.p 
                className="text-[30px] sm:text-[60px] lg:text-[150px] leading-[0.9] tracking-[-3px]"
                initial={{ opacity: 0, x: 50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                FOR NOW, HERES WHERE TO FIND ME
              </motion.p>
            </motion.div>
            
            {/* Scroll Indicator */}
            <motion.div
              className="mt-16 lg:mt-24 inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.3
              }}
            >
              <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
                <motion.div 
                  className="w-1.5 h-2 bg-white rounded-full"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Cards Section */}
        <motion.div 
          ref={cardsRef}
          className="relative z-20 min-h-screen flex items-center justify-center px-4 py-20 lg:py-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          {/* Background Frame */}
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm border border-black rounded-[69px] w-[90%] max-w-[1364px] h-[500px] lg:h-[644px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={cardsInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Cards Container */}
          <div className="relative w-full max-w-[1600px] mx-auto">
            {/* For Mobile: Stack Cards Vertically */}
            <div className="lg:hidden flex flex-col items-center gap-8">
              {[
                { src: SCREENSHOT_LEFT, delay: 0.4, url: 'https://www.landonOS.com' },
                { src: SCREENSHOT_CENTER, delay: 0.6, url: 'https://www.landonray.photos' },
                { src: SCREENSHOT_RIGHT, delay: 0.8, url: 'https://www.landonstrempel.com' }
              ].map((card, idx) => (
                <motion.a
                  key={idx}
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full max-w-[400px] block"
                  initial={{ opacity: 0, y: 100 }}
                  animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: card.delay }}
                  whileHover={{ scale: 1.05, rotate: idx === 1 ? 0 : idx === 0 ? -3 : 3 }}
                >
                  <div className="relative h-[300px] rounded-[14px] overflow-hidden shadow-2xl">
                    <motion.img 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover"
                      src={card.src}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* For Desktop: Overlapping Layout */}
            <div className="hidden lg:block relative h-[700px]">
              {/* Left Card - Tilted */}
              <motion.a
                href="https://www.landonOS.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-[50px] top-1/2 -translate-y-1/2 block"
                initial={{ opacity: 0, x: -200, rotate: 0 }}
                animate={cardsInView ? { opacity: 1, x: 0, rotate: -2.16 } : {}}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  scale: 1.08, 
                  rotate: -4, 
                  zIndex: 30,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative h-[445px] w-[705px] rounded-[14px] overflow-hidden shadow-2xl">
                  <motion.img 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover"
                    src={SCREENSHOT_LEFT}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.a>

              {/* Center Card - On Top */}
              <motion.a
                href="https://www.landonray.photos"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 block"
                initial={{ opacity: 0, y: 150, scale: 0.8 }}
                animate={cardsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -20,
                  zIndex: 40,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative h-[473px] w-[717px] rounded-[12px] overflow-hidden shadow-2xl">
                  <motion.img 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover"
                    src={SCREENSHOT_CENTER}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.a>

              {/* Right Card - Tilted */}
              <motion.a
                href="https://www.landonstrempel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-[50px] top-1/2 -translate-y-1/2 block"
                initial={{ opacity: 0, x: 200, rotate: 0 }}
                animate={cardsInView ? { opacity: 1, x: 0, rotate: 3.45 } : {}}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  scale: 1.08, 
                  rotate: 6, 
                  zIndex: 30,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative h-[445px] w-[705px] rounded-[14px] overflow-hidden shadow-2xl">
                  <motion.img 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover"
                    src={SCREENSHOT_RIGHT}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          ref={contactRef}
          id="contact"
          className="relative z-20 min-h-screen flex items-center justify-center px-4 py-20 lg:py-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <ContactForm inView={contactInView} />
        </motion.div>

        {/* Bottom Spacer */}
        <div className="h-32" />
      </div>

      {/* Toast Notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
          },
        }}
      />
    </div>
  );
}
