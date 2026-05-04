import { useSeoMeta } from '@unhead/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  Headphones,
  BookOpen,
  Users,
  ExternalLink,
  ChevronDown,
  Zap,
  Radio,
  Mic2,
  GraduationCap,
  Handshake,
  PartyPopper,
  Wine,
  Ticket,
  ArrowRight,
  Sparkles,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Image URLs
const HERO_BG = '/nosville-2027-banner.jpg';
const NOSTRICH = 'https://blossom.primal.net/93619b5fe46b04bc12e37977cfd8637475057c29322948eec0e835e1ab13c1be.jpg';
const DJ_BOOTH_1 = 'https://blossom.ditto.pub/41336f3e4929e1627f13250c025f2bfb9b8294f465d7d5f95508360a68b32d38.jpeg';
const DJ_BOOTH_2 = 'https://blossom.ditto.pub/f601a084861d4cf0dace08ac13e4e2caf21371f51134d0c722a617c85733e290.jpeg';
const TUNESTR_PHOTO = 'https://blossom.ditto.pub/72954a27485829472f226a2dd3e34e054da5342224d38ecbde81f6a83671453f.jpeg';
const LIVE_STAGE = 'https://blossom.ditto.pub/4767aa6657be925beb258ff35fc09f7a8764b69ba3ec234c8aea318ca18609b9.jpeg';
const NEON_SIGN = 'https://blossom.ditto.pub/2f2dd3b1b1ce2494956b400d18af2b4d27ae71603d105dc7f6e79f9d3fb6c810.jpeg';
const TICKET_IMG = '/nosville-2027-banner.jpg';

const TICKET_URL = '#';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CountdownTimer() {
  const targetDate = new Date('2027-07-15T19:00:00-05:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = targetDate - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-3 sm:gap-5 justify-center">
      {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity" />
            <div className="relative bg-black/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 min-w-[70px] sm:min-w-[90px]">
              <span className="text-3xl sm:text-5xl font-bold bg-gradient-to-b from-white to-purple-200 bg-clip-text text-transparent font-mono tabular-nums">
                {String(timeLeft[unit]).padStart(2, '0')}
              </span>
            </div>
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-purple-300/70 mt-2 font-medium">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

function GlowingCard({
  children,
  className = '',
  glowColor = 'from-purple-600 to-pink-600',
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowColor} rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-500`} />
      <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 h-full hover:border-purple-500/30 transition-all duration-500">
        {children}
      </div>
    </div>
  );
}

const galleryImages = [
  { src: LIVE_STAGE, alt: 'Live V4V music performances on stage with Tunestr livestream displays' },
  { src: DJ_BOOTH_1, alt: 'DJ booth with vibrant neon lights at the venue' },
  { src: 'https://blossom.primal.net/1b13ed0c52fda04a62a74aca9d579224da633b29bde3cefe04f3449afdace3b0.jpg', alt: 'NosVille community gathering' },
  { src: DJ_BOOTH_2, alt: 'DJs performing at the neon-lit booth' },
  { src: 'https://blossom.primal.net/56ffb52f90d0f440b26947f1dd7724a930eeeb01e2b323f549cdad9abb7120d6.jpg', alt: 'Nostr community members networking at the event' },
  { src: TUNESTR_PHOTO, alt: 'Artists and attendees at the Tunestr photo backdrop' },
  { src: 'https://blossom.primal.net/011ffc485e801c25a047a9132b4c8100115f09eeec0b34d024c3bc6d7e8ceb89.jpg', alt: 'Attendees enjoying the nightclub atmosphere' },
  { src: NEON_SIGN, alt: 'Neon sign at We All Scream nightclub' },
  { src: 'https://blossom.primal.net/f128ef24c91ef9e85ab040e7bc0d68ea899655b363291b888a22289a18ddd9a2.jpg', alt: 'Nostr enthusiasts at the NosVille event' },
];

function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-sm text-white/50 font-medium tabular-nums">
        {index + 1} / {images.length}
      </div>

      {/* Prev button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 sm:left-6 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 sm:right-6 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}

function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleClose = useCallback(() => setLightboxIndex(null), []);
  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);
  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => prev === null ? null : (prev + 1) % galleryImages.length);
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {galleryImages.map((img, i) => (
          <AnimatedSection
            key={i}
            delay={i * 80}
            className={i === 0 ? 'col-span-2 md:col-span-2 row-span-2' : ''}
          >
            <button
              onClick={() => setLightboxIndex(i)}
              className="relative overflow-hidden rounded-2xl group aspect-[4/3] w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0014]"
              aria-label={`View full size: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </AnimatedSection>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}

const Index = () => {
  const siteUrl = 'https://nosville-2027.surge.sh';
  const ogImage = 'https://image.nostr.build/4f4bf11b81647ac81cf8575ca255f8b2523b74842a77b454ca5c680eb1848262.jpg';
  const title = 'NosVille 2027 — The Exclusive Nostr Event of Bitcoin 2027';
  const description = 'Join the Nostr community for an unforgettable event in Nashville. Live V4V music, DJs, education, onboarding, and networking. July 15-17, 2027 — Nashville, TN.';

  useSeoMeta({
    // Core
    title,
    description,

    // Open Graph
    ogType: 'website',
    ogUrl: siteUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogImageWidth: '1024',
    ogImageHeight: '1024',
    ogImageType: 'image/jpeg',
    ogImageAlt: 'NosVille 2027 — The Exclusive Nostr Event of Bitcoin 2027, Nashville, TN',
    ogSiteName: 'NosVille',
    ogLocale: 'en_US',

    // Twitter / X
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterImageAlt: 'NosVille 2027 — The Exclusive Nostr Event of Bitcoin 2027',
    twitterSite: '@nosville',

    // Additional SEO
    robots: 'index, follow',
    author: 'NosVille',
  });

  return (
    <div className="min-h-screen bg-[#0a0014] text-white overflow-x-hidden">
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center isolate">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0a0014]/80 to-[#0a0014]" />
        </div>

        {/* Animated particles / glow effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-600/15 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[200px]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Badge */}
          <AnimatedSection delay={0}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900/60 to-pink-900/60 backdrop-blur-xl border border-purple-400/20 rounded-full px-5 py-2 mb-8">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium tracking-wide text-purple-200">The Exclusive Nostr Event of Bitcoin 2027 · Coming Soon</span>
            </div>
          </AnimatedSection>

          {/* Title */}
          <AnimatedSection delay={200}>
            <h1 className="mb-6">
              <span className="block text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-[0.85]">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
                  NOS
                </span>
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-2xl">
                  VILLE
                </span>
              </span>
            </h1>
          </AnimatedSection>

          {/* Subtitle */}
          <AnimatedSection delay={400}>
            <p className="text-lg sm:text-xl md:text-2xl text-purple-200/80 max-w-2xl mx-auto mb-4 font-light leading-relaxed">
              Where the Nostr community flocks together for an unforgettable experience in Music City
            </p>
          </AnimatedSection>

          {/* Date/Time pill */}
          <AnimatedSection delay={500}>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base text-purple-200/70 mb-10">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-400" />
                July 15-17, 2027
              </span>
              <span className="hidden sm:inline text-purple-500/40">|</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink-400" />
                Nashville, TN
              </span>
            </div>
          </AnimatedSection>

          {/* Countdown */}
          <AnimatedSection delay={600}>
            <CountdownTimer />
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection delay={800}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <a
                href="mailto:v4v@tunestr.io"
                className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Ticket className="relative z-10 w-5 h-5" />
                <span className="relative z-10">Sponsor NosVille</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 text-lg font-bold rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-105"
              >
                Explore the Experience
                <ChevronDown className="w-5 h-5 text-pink-400 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-purple-400/50" />
        </div>
      </section>

      {/* ============================================ */}
      {/* SPONSORSHIP SECTION */}
      {/* ============================================ */}
      <section id="sponsors" className="relative py-24 sm:py-32 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 isolate">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/8 rounded-full blur-[200px] -z-10" />
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/8 rounded-full blur-[160px] -z-10" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-500/8 rounded-full blur-[160px] -z-10" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Ticket image */}
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-pink-500/20 rounded-[2rem] blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src={TICKET_IMG}
                    alt="NosVille 2027 event"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </AnimatedSection>

            {/* Right: Ticket CTA */}
            <AnimatedSection delay={200}>
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-900/50 to-amber-900/20 backdrop-blur-sm border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-semibold text-amber-300 tracking-wide">Sponsorship Opportunities</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4">
                    <span className="text-white">Become a</span>
                    <br />
                    <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                      Sponsor
                    </span>
                  </h2>
                  <p className="text-lg text-purple-200/70 leading-relaxed max-w-lg">
                    Partner with NosVille 2027 and reach the Nostr community. Get in front of Bitcoiners, developers, and V4V enthusiasts at the premier Nostr event of 2027.
                  </p>
                </div>

                {/* What's included */}
                <div className="space-y-3">
                  {[
                    { icon: Music, text: 'Live V4V music & DJ performances' },
                    { icon: GraduationCap, text: 'Educational presentations & onboarding' },
                    { icon: Users, text: 'Networking with Nostr devs & community' },
                    { icon: Star, text: 'Brand visibility to Bitcoin & Nostr audience' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-amber-400" />
                      </div>
                      <span className="text-purple-100/80 font-medium">{text}</span>
                    </div>
                  ))}
                </div>

                {/* Contact button */}
                <div className="pt-2">
                  <a
                    href="mailto:v4v@tunestr.io"
                    className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-12 py-5 text-xl font-black rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_50px_rgba(245,158,11,0.3)] hover:shadow-[0_0_80px_rgba(245,158,11,0.5)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Ticket className="relative z-10 w-6 h-6 text-black" />
                    <span className="relative z-10 text-black">Contact Us</span>
                    <ArrowRight className="relative z-10 w-6 h-6 text-black group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="mt-4 text-sm text-purple-300/40 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5" />
                    Sponsorship inquiries & partnership opportunities
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VENUE SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 sm:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-sm uppercase tracking-[0.3em] text-pink-400 font-semibold mb-4">The Venue</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Venue TBD
                </span>
                <br />
                <span className="text-white/90">Nashville</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-purple-200/70">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  Nashville, TN
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Venue highlights grid */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-16 max-w-md mx-auto">
            <AnimatedSection delay={100}>
              <GlowingCard glowColor="from-amber-600 to-purple-600">
                <MapPin className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Nashville</h3>
                <p className="text-purple-200/60 text-sm leading-relaxed">
                  Nashville, TN — venue details coming soon
                </p>
              </GlowingCard>
            </AnimatedSection>
          </div>

          {/* Venue link */}
          <AnimatedSection>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-pink-400/70 font-medium">
                Venue details coming soon
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================ */}
      {/* EXPERIENCE SECTION */}
      {/* ============================================ */}
      <section id="experience" className="relative py-24 sm:py-32 px-4">
        {/* Background accent */}
        <div className="absolute inset-0 isolate overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[160px] -z-10" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-600/10 rounded-full blur-[160px] -z-10" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection>
            <div className="text-center mb-20">
              <span className="inline-block text-sm uppercase tracking-[0.3em] text-amber-400 font-semibold mb-4">The Experience</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                <span className="text-white">NosVille 2027.</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                  The Nostr Experience.
                </span>
              </h2>
            </div>
          </AnimatedSection>

          {/* Experience Cards */}
          <div className="space-y-24">
            {/* GROW NOSTR ROOM */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <AnimatedSection>
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3]">
                  <img
                    src={TUNESTR_PHOTO}
                    alt="Nostr community gathering"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-transparent" />
                </div>
              </AnimatedSection>
              <AnimatedSection delay={200}>
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-900/40 to-transparent border-l-2 border-emerald-400 pl-4 py-2 pr-6 rounded-r-full">
                    <BookOpen className="w-6 h-6 text-emerald-400" />
                    <span className="text-sm uppercase tracking-[0.2em] text-emerald-300 font-semibold">Room Three</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black">
                    Grow Nostr Room
                  </h3>
                  <div className="space-y-4 text-purple-200/70 leading-relaxed">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Educational Presentations</strong> &mdash; Learn about the Nostr protocol and its ecosystem</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Nostr & Bitcoin Vendors</strong> &mdash; Discover projects and vendors showcased on site</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Onboarding Stations</strong> &mdash; New to Nostr? Get set up and connected by community experts</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* NOSTRICH FLOCKING */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <AnimatedSection delay={200} className="order-2 lg:order-1">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-900/40 to-transparent border-l-2 border-amber-400 pl-4 py-2 pr-6 rounded-r-full">
                    <Users className="w-6 h-6 text-amber-400" />
                    <span className="text-sm uppercase tracking-[0.2em] text-amber-300 font-semibold">The Main Event</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black">
                    Nostrich Flocking
                  </h3>
                  <p className="text-xl text-purple-200/80 italic">
                    Find the signal amidst the noise with the Nostr community
                  </p>
                  <div className="space-y-4 text-purple-200/70 leading-relaxed">
                    <div className="flex items-start gap-3">
                      <Handshake className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Network with Your Favorite Online Nyms</strong> &mdash; Finally meet the people behind the profiles</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Meet Nostr Vendors & Developers</strong> &mdash; Connect with the builders shaping the future of the protocol</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wine className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Indoor & Outdoor Socializing</strong> &mdash; Two stories of spaces to connect and celebrate</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection className="order-1 lg:order-2">
                <div className="relative overflow-hidden rounded-3xl aspect-square max-w-md mx-auto">
                  <img
                    src={NOSTRICH}
                    alt="Nostrich mascot"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0014]/80 via-transparent to-transparent" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PHOTO GALLERY */}
      {/* ============================================ */}
      <section className="relative py-24 sm:py-32 px-4">
        <div className="absolute inset-0 isolate overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block text-sm uppercase tracking-[0.3em] text-purple-400 font-semibold mb-4">Gallery</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-pink-300 to-amber-300 bg-clip-text text-transparent">
                  The Vibe Is Real
                </span>
              </h2>
            </div>
          </AnimatedSection>
          <PhotoGallery />
        </div>
      </section>

      {/* ============================================ */}
      {/* EVENT DETAILS / INFO CARD */}
      {/* ============================================ */}
      <section className="relative py-24 sm:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-[2rem] blur-lg opacity-30" />
              <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden">
                {/* Card header with neon sign image */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img
                    src={NEON_SIGN}
                    alt="Neon sign at venue"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
                  <div className="absolute bottom-6 left-6 sm:left-8">
                    <h3 className="text-3xl sm:text-4xl font-black">Event Details</h3>
                  </div>
                </div>

                {/* Details grid */}
                <div className="p-6 sm:p-10 space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold uppercase tracking-wider mb-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </div>
                      <p className="text-xl font-bold">July 15-17, 2027</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold uppercase tracking-wider mb-2">
                        <Clock className="w-4 h-4" />
                        Time
                      </div>
                      <p className="text-xl font-bold">Nashville, TN</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold uppercase tracking-wider mb-2">
                        <MapPin className="w-4 h-4" />
                        Venue
                      </div>
                      <p className="text-xl font-bold">Nashville</p>
                      <p className="text-purple-200/60">Nashville, TN</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold uppercase tracking-wider mb-2">
                        <Zap className="w-4 h-4" />
                        Part Of
                      </div>
                      <p className="text-xl font-bold">Bitcoin 2027</p>
                      <p className="text-purple-200/60">The premier Bitcoin event in Nashville</p>
                    </div>
                  </div>

                  {/* Quick highlights */}
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex flex-wrap gap-3">
                      {['Live Music', 'DJ Rooftop Stage', 'V4V Performances', 'Educational Talks', 'Nostr Onboarding', 'Three Bars', 'Rooftop Patio', 'Vendor Showcase', 'Tunestr Livestream'].map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-200/80 text-sm font-medium hover:bg-purple-500/20 hover:border-purple-400/30 transition-all cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a
                      href="mailto:v4v@tunestr.io"
                      className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:shadow-[0_0_60px_rgba(245,158,11,0.4)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400" />
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Ticket className="relative z-10 w-5 h-5 text-black" />
                      <span className="relative z-10 text-black">Sponsor NosVille</span>
                      <ArrowRight className="relative z-10 w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-105"
                    >
                      <MapPin className="w-5 h-5 text-pink-400" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL TICKET CTA BANNER */}
      {/* ============================================ */}
      <section className="relative py-20 sm:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 isolate">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 via-purple-900/10 to-transparent -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[200px] -z-10" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <AnimatedSection>
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                <span className="text-white">Ready to</span>
                <br />
                <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-pink-400 bg-clip-text text-transparent">
                  Join the Flock?
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-purple-200/60 max-w-xl mx-auto">
                Get in front of the Nostr community. Sponsorship packages available for brands, projects, and companies looking to connect with Bitcoiners.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:v4v@tunestr.io"
                  className="group relative inline-flex items-center justify-center gap-3 px-14 py-6 text-xl font-black rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_60px_rgba(245,158,11,0.35)] hover:shadow-[0_0_100px_rgba(245,158,11,0.55)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Ticket className="relative z-10 w-6 h-6 text-black" />
                  <span className="relative z-10 text-black">Contact Us</span>
                  <ArrowRight className="relative z-10 w-6 h-6 text-black group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <p className="text-sm text-purple-300/30">
                July 15-17, 2027 &bull; Nashville, TN
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================ */}
      {/* STICKY FLOATING TICKET BUTTON (mobile) */}
      {/* ============================================ */}
      <div className="fixed bottom-6 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:bottom-8 pointer-events-none">
        <a
          href="mailto:v4v@tunestr.io"
          className="pointer-events-auto group relative flex sm:inline-flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_4px_40px_rgba(245,158,11,0.4)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Ticket className="relative z-10 w-5 h-5 text-black" />
          <span className="relative z-10 text-black font-black">Sponsor NosVille</span>
          <ArrowRight className="relative z-10 w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="relative py-16 pb-28 px-4">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black mb-2">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">NOS</span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">VILLE</span>
            </h2>
            <p className="text-purple-200/50 text-sm">
              The Exclusive Nostr Event of Bitcoin 2027 · Coming Soon
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-purple-200/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              July 15-17, 2027
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              7 PM &ndash; 1 AM
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Nashville, TN
            </span>
          </div>

          <div className="pt-8 border-t border-white/5">
            <p className="text-purple-300/30 text-xs">
              Vibed with{' '}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300/50 transition-colors underline underline-offset-2"
              >
                Shakespeare
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
