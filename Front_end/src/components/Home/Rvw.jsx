import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, TrendingUp, ShieldCheck, DollarSign } from 'lucide-react';
import Marquee from 'react-fast-marquee';

const reviews = [
  {
    id: 1,
    name: "Anisur Rahman",
    role: "Senior Software Engineer",
    location: "Dhaka",
    review: "Investment Hub has completely changed how I manage my savings. The interface is intuitive, and the returns have been consistent. Highly recommended!",
    rating: 5,
    img: "/anisur_rahman.webp",
  },
  {
    id: 2,
    name: "Farhana Akter",
    role: "Business Owner",
    location: "Sylhet",
    review: "As a business owner, I value transparency and security. This platform provides both. It's the most reliable investment tool I've found in Bangladesh.",
    rating: 5,
    img: "/farhana_akter.webp",
  },
  {
    id: 3,
    name: "Mahidul Hasan",
    role: "Corporate Executive",
    location: "Chittagong",
    review: "I was skeptical about online investments, but the team's professionalism and the legal framework won me over. A great way to build wealth.",
    rating: 5,
    img: "/mahidul_hasan.webp",
  },
  {
    id: 4,
    name: "Nursrat Jahan",
    role: "Education Consultant",
    location: "Rajshahi",
    review: "Even without much financial expertise, I found the platform incredibly easy to use. It's helping me secure my family's future.",
    rating: 4,
    img: "/nursrat_jahan.webp",
  },
  {
    id: 5,
    name: "Tania Sultana",
    role: "Creative Director",
    location: "Barisal",
    review: "The diversity of options is impressive. It allows me to spread my capital across different sectors safely. Excellent customer support!",
    rating: 5,
    img: "/tania_sultana.webp",
  },
  {
    id: 6,
    name: "Zubair Ahmed",
    role: "Freelance Professional",
    location: "Khulna",
    review: "I love how I can start with a manageable amount and see it grow. The documentation is clear and the process is very transparent.",
    rating: 5,
    img: "/zubair_ahmed.webp",
  }
];

const Rvw = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 6000;
    const step = 100 / (interval / 100);
    let timer;
    let progressTimer;

    if (isAutoPlaying) {
      timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
        setProgress(0);
      }, interval);

      progressTimer = setInterval(() => {
        setProgress(prev => Math.min(prev + step, 100));
      }, 100);
    }

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [isAutoPlaying, activeIndex]);

  const activeReview = reviews[activeIndex];

  const handleManualNav = (index) => {
    setActiveIndex(index);
    setProgress(0);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 20000);
  };

  const polygonShapes = [
    "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
    "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
    "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
  ];

  return (
    <section className="w-full py-20 px-4 md:px-10 bg-white overflow-hidden relative">

      {/* Page-level background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ rotate: 360, y: [0, 40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-50/30 opacity-40 border border-emerald-100"
          style={{ clipPath: polygonShapes[2] }}
        />
        <motion.div
          animate={{ rotate: -360, x: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-10 w-32 h-32 bg-blue-50/40 opacity-50 border border-blue-100"
          style={{ clipPath: polygonShapes[1] }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: 45 }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-[15%] w-24 h-24 bg-emerald-50/50 opacity-40 border border-emerald-200"
          style={{ clipPath: polygonShapes[0] }}
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-[10%] w-16 h-16 bg-slate-50 opacity-60 border border-slate-200"
          style={{ clipPath: polygonShapes[2] }}
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-12 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="w-full flex flex-col items-center text-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
            <span className="text-emerald-600 text-[10px] md:text-xs font-black tracking-[0.4em] uppercase">
              Success Stories
            </span>
            <div className="w-6 h-[1.5px] bg-emerald-500 rounded-full" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight heading">
            What Our <span className="text-emerald-500">Investors</span> Say
          </h2>

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-700 text-xs font-bold tracking-wider">
              500+ Active Investors Trust Us
            </span>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 min-h-[450px]">

          {/* ✅ Left: Scattered Shapes + Popping Image */}
          <motion.div
            className="w-full lg:w-1/2 relative flex justify-center items-center"
            style={{ minHeight: '420px' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >

            {/* Shape 1 — Large faint rotating hexagon, top-left */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-2 left-2 w-44 h-44 opacity-[0.06] border-2 border-emerald-600"
              style={{ clipPath: polygonShapes[1] }}
            />

            {/* Shape 2 — Medium filled pentagon, bottom-right, soft green */}
            <motion.div
              animate={{ y: [0, 18, 0], rotate: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 right-6 w-32 h-32 bg-emerald-100 opacity-40"
              style={{ clipPath: polygonShapes[0] }}
            />

            {/* Shape 3 — Small outlined octagon, top-right */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute top-8 right-8 w-16 h-16 opacity-20 border-2 border-blue-400"
              style={{ clipPath: polygonShapes[2] }}
            />

            {/* Shape 4 — Tiny filled hexagon, bottom-left */}
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-14 left-4 w-10 h-10 bg-blue-300 opacity-20"
              style={{ clipPath: polygonShapes[1] }}
            />

            {/* Shape 5 — Medium outlined pentagon, left-mid, tilted */}
            <motion.div
              animate={{ rotate: [10, 30, 10], x: [0, 8, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 opacity-10 border border-slate-400"
              style={{ clipPath: polygonShapes[0] }}
            />

            {/* Shape 6 — Large faint filled octagon, bottom-center, very subtle */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 h-52 bg-slate-100 opacity-20"
              style={{ clipPath: polygonShapes[2] }}
            />

            {/* Shape 7 — Small filled pentagon, top-center, blue tint */}
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-100 opacity-30"
              style={{ clipPath: polygonShapes[0] }}
            />

            {/* Shape 8 — Thin rotating hexagon ring, right-mid */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-24 h-24 opacity-[0.08] border border-emerald-400"
              style={{ clipPath: polygonShapes[1] }}
            />

            {/* ✅ Center image — pops above all shapes */}
            <div className="relative z-20 w-52 h-52 md:w-64 md:h-64 flex items-center justify-center">

              {/* Glow ring behind image */}
              <div
                className="absolute inset-[-8px] bg-emerald-400/20 blur-xl"
                style={{ clipPath: polygonShapes[2] }}
              />

              {/* Outer border frame */}
              <div
                className="absolute inset-0 bg-emerald-500 opacity-25 rotate-6 shadow-2xl"
                style={{ clipPath: polygonShapes[2] }}
              />

              {/* Image container */}
              <div
                className="relative w-full h-full bg-white shadow-[0_30px_60px_rgba(0,0,0,0.18)] overflow-hidden p-1.5"
                style={{ clipPath: polygonShapes[2] }}
              >
                <div
                  className="w-full h-full overflow-hidden bg-slate-50"
                  style={{ clipPath: polygonShapes[2] }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeReview.id}
                      src={activeReview.img}
                      alt={activeReview.name}
                      className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                      initial={{ opacity: 0, scale: 1.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6 }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent" />
                </div>
              </div>

              {/* Floating TrendingUp icon */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-2 p-3 bg-white rounded-2xl shadow-xl text-emerald-600 z-30 border border-emerald-50"
              >
                <TrendingUp size={20} strokeWidth={2.5} />
              </motion.div>

              {/* Floating DollarSign icon */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-2 p-3 bg-white rounded-2xl shadow-xl text-blue-600 z-30 border border-blue-50"
              >
                <DollarSign size={20} strokeWidth={2.5} />
              </motion.div>

              {/* Floating Verified badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-3 -right-2 flex items-center gap-1 px-3 py-1.5 bg-white rounded-full shadow-xl border border-emerald-50 z-30"
              >
                <ShieldCheck size={12} className="text-emerald-500" />
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider">Verified</span>
              </motion.div>

            </div>
          </motion.div>

          {/* Right: Review Content */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-center gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${i < activeReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-100'}`}
                    />
                  ))}
                </div>

                {/* Review */}
                <div className="relative">
                  <Quote className="absolute -top-10 -left-8 w-20 h-20 text-emerald-500 opacity-10" />
                  <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 leading-relaxed jost-light italic">
                    "{activeReview.review}"
                  </p>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <span className="text-2xl md:text-3xl font-black text-slate-800 heading">
                    {activeReview.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-12 bg-emerald-500 rounded-full" />
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                      {activeReview.role} • {activeReview.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation + Progress */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => handleManualNav((activeIndex - 1 + reviews.length) % reviews.length)}
                className="p-4 rounded-2xl border-2 border-slate-50 hover:bg-emerald-50 hover:border-emerald-100 text-slate-400 hover:text-emerald-600 transition-all active:scale-95 shadow-sm bg-white"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => handleManualNav((activeIndex + 1) % reviews.length)}
                className="p-4 rounded-2xl border-2 border-slate-50 hover:bg-emerald-50 hover:border-emerald-100 text-slate-400 hover:text-emerald-600 transition-all active:scale-95 shadow-sm bg-white"
              >
                <ChevronRight size={22} />
              </button>

              {/* Progress bar */}
              <div className="flex-1 flex flex-col gap-1">
                <div className="w-full h-[3px] bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">
                  {activeIndex + 1} / {reviews.length}
                </span>
              </div>
            </div>

            {/* Overall rating */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 w-fit"
            >
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-800 heading leading-none">4.9</span>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="h-8 w-[1px] bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-700">Overall Rating</span>
                <span className="text-[10px] text-slate-400 font-semibold">Based on 500+ reviews</span>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Bottom Marquee */}
        <div className="w-full mt-10 relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <Marquee pauseOnHover={true} speed={40} gradient={false} className="py-6">
            {reviews.map((rvw, i) => (
              <motion.div
                key={rvw.id}
                onClick={() => handleManualNav(i)}
                whileHover={{ y: -8 }}
                className={`mx-4 p-5 rounded-[2.5rem] cursor-pointer transition-all duration-500 min-w-[240px] border-2 group ${
                  activeIndex === i
                    ? 'bg-emerald-600 border-transparent shadow-xl shadow-emerald-100'
                    : 'bg-white border-slate-50 hover:border-emerald-100 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 overflow-hidden shrink-0 transition-transform duration-500 ${activeIndex === i ? 'scale-110 border-2 border-white/40' : 'border border-slate-50'}`}
                    style={{ clipPath: polygonShapes[2] }}
                  >
                    <img src={rvw.img} alt={rvw.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`font-black text-xs truncate heading uppercase tracking-wider ${activeIndex === i ? 'text-white' : 'text-slate-800'}`}>
                      {rvw.name}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${activeIndex === i ? 'text-white/70' : 'text-slate-400'}`}>
                      {rvw.location}
                    </span>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(rvw.rating)].map((_, si) => (
                        <Star key={si} size={8} className={`${activeIndex === i ? 'fill-yellow-300 text-yellow-300' : 'fill-yellow-400 text-yellow-400'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Marquee>
        </div>

      </div>
    </section>
  );
};

export default Rvw;