import { motion } from 'framer-motion';

export default function About() {



  return (
    <>
      <motion.div className="w-full flex flex-col justify-center items-center relative z-20 py-10 md:py-20 gap-20 md:gap-32 overflow-hidden">

        {/* top section */}
        <motion.div className="w-full min-h-[40vh] md:h-[50vh] flex flex-row justify-center items-center px-4 md:px-10 gap-4 md:gap-0"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeInOut" }}
          viewport={{ amount: 0.2, once: false }}
        >
          {/* main */}
          <motion.div className="w-[70%] h-full flex flex-col justify-center items-center z-20 relative">
            <div className="relative w-full px-4 md:px-20 py-8 md:py-16 flex flex-col gap-2 md:gap-4">

              {/* background */}
              <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [-2, 0, -2] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute h-[110%] w-[100%] md:w-[105%] bg-slate-50/90 border border-slate-200/50 rounded-[2rem] md:rounded-[3.5rem] shadow-xl overflow-hidden backdrop-blur-sm"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1.5px, transparent 0),
                      linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%)
                    `,
                    backgroundSize: '6px 6px, 100% 100%'
                  }}
                >
                  <div className="absolute inset-4 border border-dashed border-slate-300/60 rounded-[1.5rem] md:rounded-[3rem]" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-8 md:h-14 bg-slate-50/95 border-x border-b border-slate-200/60 rounded-b-[1.5rem] md:rounded-b-[2rem] shadow-sm flex justify-center items-end pb-1 md:pb-2">
                    <div className="w-6 md:w-12 h-2 md:h-4 rounded-full bg-gradient-to-r from-slate-300 via-white to-slate-300 border border-slate-200 shadow-inner" />
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [5, 15, 5], rotate: [-3, -1, -3] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute h-[100%] w-[105%] md:w-[115%] bg-[#F5F1E9] border border-[#E8E2D5] -top-2 -skew-x-2 rounded-[2rem] md:rounded-[3.5rem] shadow-lg overflow-hidden -z-10"
                />
              </div>

              {/* text */}
              <motion.div className="relative z-10 flex flex-row justify-start items-center gap-2 md:gap-5">
                <div className="h-6 md:h-12 w-[2px] bg-emerald-600/20 rounded-full" />
                <motion.span className="text-xl sm:text-3xl md:text-[6vw] lg:text-[7vw] heading text-slate-700 tracking-tight leading-tight">
                  Ever Thought
                </motion.span>
              </motion.div>

              <motion.div className="relative z-10 flex justify-end items-center">
                <motion.span className="text-xl sm:text-3xl md:text-[6vw] lg:text-[7vw] heading text-slate-700 tracking-tight leading-tight flex flex-wrap justify-end items-center gap-2 md:gap-3">
                  Of{" "}
                  <span className="bg-emerald-500 rounded-xl md:rounded-3xl px-3 md:px-8 py-1 md:py-2 text-white shadow-lg border border-emerald-400 text-lg sm:text-2xl md:text-[5vw] lg:text-[6vw]">
                    Investment
                  </span>
                </motion.span>
              </motion.div>

            </div>
          </motion.div>

          {/* right side ? */}
          <motion.div className="w-[30%] h-full flex justify-center items-center z-20"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
            viewport={{ amount: 0.5, once: false }}
          >
            <motion.div className="w-16 h-16 sm:w-24 sm:h-24 md:w-[60%] md:aspect-square bg-green-400 rounded-full flex justify-center items-center shadow-inner">
              <motion.span className="text-3xl sm:text-5xl md:text-[10vw] heading text-white">?</motion.span>
            </motion.div>
          </motion.div>

        </motion.div>

        {/* bottom grid — always 3 columns */}
        <motion.div
          className="w-full h-auto flex flex-row justify-center items-start px-2 md:px-10 gap-2 md:gap-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >

          {/* left column */}
          <motion.div className="w-[35%] flex flex-col justify-center items-end gap-4 md:gap-10">
            <motion.div
              className="w-full flex flex-col justify-center items-center md:items-end gap-2 md:gap-3 border-r-2 border-b-2 border-slate-300 pr-2 pb-3 md:pr-10 md:pb-5"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: false }}
            >
              <img src='/lack_of_knowledge.webp' className='w-full aspect-video rounded-xl md:rounded-4xl shadow-md object-cover' />
              <h1 className='text-[10px] sm:text-sm md:text-2xl heading text-slate-700 text-center'>Lack of Knowledge</h1>
            </motion.div>

            <motion.div
              className="w-full flex flex-col justify-center items-center md:items-end gap-2 md:gap-3 border-r-2 border-slate-300 pr-2 md:pr-10"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: false }}
            >
              <img src='/where.webp' className='w-full aspect-video rounded-xl md:rounded-4xl shadow-md object-cover' />
              <h1 className='text-[10px] sm:text-sm md:text-2xl heading text-slate-700 text-center'>Where to Invest</h1>
            </motion.div>

            <motion.div
              className="w-full flex flex-col justify-center items-center md:items-end gap-2 md:gap-3 border-r-2 border-t-2 border-slate-300 pr-2 pt-3 md:pr-10 md:pt-5"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: false }}
            >
              <img src='/how.webp' className='w-full aspect-video rounded-xl md:rounded-4xl shadow-md object-cover' />
              <h1 className='text-[10px] sm:text-sm md:text-2xl heading text-slate-700 text-center'>How to Invest</h1>
            </motion.div>
          </motion.div>

          {/* center column */}
          <motion.div className="w-[30%] flex flex-col justify-center items-center gap-4 md:gap-10">
            <motion.div
              className="w-full flex flex-col justify-center items-center gap-2 md:gap-3 border-b-2 border-slate-300 pb-3 md:pb-5"
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: false }}
            >
              <img src='/funding.webp' className='w-full aspect-video rounded-xl md:rounded-4xl shadow-md object-cover' />
              <h1 className='text-[10px] sm:text-sm md:text-2xl heading text-slate-700 text-center'>Not Enough Funding</h1>
            </motion.div>

            <motion.div
              className="w-full flex justify-center items-center p-2 md:p-5"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              viewport={{ once: false }}
            >
              <motion.span
                className="text-[10px] sm:text-sm md:text-3xl w-full heading flex justify-center items-center rounded-xl md:rounded-4xl rotate-3 md:rotate-12 bg-emerald-500 text-white shadow-xl text-center px-2 py-3 md:px-4 md:py-2"
                animate={{ rotate: [3, 1, 5, 3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                Faced These Problems?
              </motion.span>
            </motion.div>

            <motion.div
              className="w-full border-t-2 border-slate-300 flex flex-col justify-center items-center pt-3 md:pt-5"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: false }}
            >
              <div className="flex gap-1 md:gap-2">
                <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-bounce" />
                <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-bounce delay-100" />
                <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-bounce delay-200" />
              </div>
            </motion.div>
          </motion.div>

          {/* right column */}
          <motion.div className="w-[35%] flex flex-col justify-center items-start gap-4 md:gap-10">
            <motion.div
              className="w-full flex flex-col justify-center items-center md:items-start gap-2 md:gap-3 border-l-2 border-b-2 border-slate-300 pl-2 pb-3 md:pl-10 md:pb-5"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: false }}
            >
              <img src='/clients.webp' className='w-full aspect-video rounded-xl md:rounded-4xl shadow-md object-cover' />
              <h1 className='text-[10px] sm:text-sm md:text-2xl heading text-slate-700 text-center'>No Clients</h1>
            </motion.div>

            <motion.div
              className="w-full flex flex-col justify-center items-center md:items-start gap-2 md:gap-3 border-l-2 border-slate-300 pl-2 md:pl-10"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: false }}
            >
              <img src='/trust.webp' className='w-full aspect-video rounded-xl md:rounded-4xl shadow-md object-cover' />
              <h1 className='text-[10px] sm:text-sm md:text-2xl heading text-slate-700 text-center'>No Trustworthiness</h1>
            </motion.div>

            <motion.div
              className="w-full flex flex-col justify-center items-center md:items-start gap-2 md:gap-3 border-l-2 border-t-2 border-slate-300 pl-2 pt-3 md:pl-10 md:pt-5"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: false }}
            >
              <img src='/scam.webp' className='w-full aspect-video rounded-xl md:rounded-4xl shadow-md object-cover' />
              <h1 className='text-[10px] sm:text-sm md:text-2xl heading text-slate-700 text-center'>Fear of Scams</h1>
            </motion.div>
          </motion.div>

        </motion.div>

        {/*bottom*/}

        <motion.div>

        </motion.div>

      </motion.div>
    </>
  );
}