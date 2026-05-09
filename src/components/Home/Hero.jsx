import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Hero() {
    const [index, setIndex] = useState(0)

    const Heading = [
        {
            title: "INVEST",
            subtitle: "Together",
            description: "Join a community of smart investors. Pool your resources and grow your wealth with professional guidance and collective power.",
            img1: "/invest_heading1.webp",
            img2: "/invest_heading2.webp",
            color: "text-green-700",
            highlight: "text-green-600"
        },
        {
            title: "EARN",
            subtitle: "Passively",
            description: "Watch your money work for you. Our automated systems and expert strategies ensure consistent returns on your investments.",
            img1: "/earn_heading1.webp",
            img2: "/earn_heading2.webp",
            color: "text-blue-700",
            highlight: "text-blue-600"
        },
        {
            title: "GROW",
            subtitle: "Exponentially",
            description: "Scale your portfolio with ease. Access exclusive opportunities and high-growth markets that were previously out of reach.",
            img1: "/growth_heading1.webp",
            img2: "/growth_heading2.webp",
            color: "text-amber-700",
            highlight: "text-amber-600"
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % Heading.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <motion.div className='w-full min-h-[85vh] md:h-[85vh] relative z-10 overflow-hidden bg-gray-100 rounded-2xl'
            initial={{ x: -60, scale: 0.95, opacity: 0 }}
            whileInView={{ x: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ amount: 0.3, once:false }}
        >

            {/* Background Layer */}
            <motion.div className='w-full h-full absolute inset-0 z-0 flex flex-row justify-center items-center opacity-20 md:opacity-30 pointer-events-none'>

                {/* Left Side: Paper Money and Bars */}
                <motion.div className='hidden md:flex w-1/3 h-full relative flex-row justify-center items-end gap-10 py-10'>
                    <motion.div className="absolute top-10 left-0 w-full h-1/2 flex justify-center items-start">
                        <motion.div
                            animate={{ y: [0, 10, 0], rotate: [-15, -12, -15], scale: [1, 1.02, 1] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute w-32 h-16 lg:w-48 lg:h-24 rounded-lg shadow-2xl border-2 border-green-800/30 flex justify-center items-center overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)',
                                transform: 'rotateX(20deg) rotateY(10deg)'
                            }}
                        >
                            <div className="absolute inset-2 border border-white/20 rounded flex justify-center items-center">
                                <span className="text-2xl lg:text-4xl font-bold text-white/40">$</span>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -10, 0], rotate: [10, 15, 10], scale: [1, 1.05, 1] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute w-36 h-20 lg:w-52 lg:h-28 rounded-lg shadow-2xl border-2 border-green-900/40 flex justify-center items-center overflow-hidden translate-y-10 -translate-x-5"
                            style={{
                                background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #4ade80 100%)',
                                transform: 'rotateX(15deg) rotateY(-5deg)'
                            }}
                        >
                            <div className="absolute inset-2 border-2 border-white/30 rounded flex justify-center items-center">
                                <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full border-2 border-white/20 flex justify-center items-center">
                                    <span className="text-3xl lg:text-5xl font-black text-white/50">$</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div animate={{ height: ['80%', '75%', '80%'] }} transition={{ duration: 3, repeat: Infinity }} className='w-1/14 h-[80%] bg-green-700 rounded-4xl' />
                    <motion.div animate={{ height: ['70%', '75%', '70%'] }} transition={{ duration: 3, repeat: Infinity, delay: 0.2 }} className='w-1/14 h-[70%] bg-green-600 rounded-4xl' />
                    <motion.div animate={{ height: ['60%', '65%', '60%'] }} transition={{ duration: 3, repeat: Infinity, delay: 0.4 }} className='w-1/14 h-[60%] bg-green-500 rounded-4xl' />
                    <motion.div animate={{ height: ['50%', '55%', '50%'] }} transition={{ duration: 3, repeat: Infinity, delay: 0.6 }} className='w-1/14 h-[50%] bg-green-400 rounded-4xl' />
                    <motion.div animate={{ height: ['40%', '45%', '40%'] }} transition={{ duration: 3, repeat: Infinity, delay: 0.8 }} className='w-1/14 h-[40%] bg-green-300 rounded-4xl' />
                </motion.div>

                <motion.div className='w-full md:w-1/3 h-full' />

                {/* Right Side: Animated Coins */}
                <motion.div className='hidden md:flex w-1/3 h-full flex flex-col justify-center items-center'>
                    <motion.div className='w-full h-[12%] flex justify-start items-center'>
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className='text-4xl lg:text-6xl jost text-yellow-500 rounded-4xl border-4 w-[15%] flex justify-center items-center border-black shadow-lg'>$</motion.span>
                    </motion.div>

                    <motion.div className='w-full h-[70%] relative flex justify-center items-center'>
                        <motion.div
                            animate={{ y: [0, -15, 0], rotateX: [45, 50, 45], rotateY: [-15, -20, -15], rotateZ: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className='w-[150px] h-[150px] lg:w-[220px] lg:h-[220px] rounded-full transform z-8 absolute translate-x-10 -translate-y-5 border-2 border-green-900/40 flex justify-center items-center'
                            style={{
                                background: 'radial-gradient(circle at 35% 35%, #16a34a 0%, #15803d 60%, #064e3b 100%)',
                                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5), 10px 15px 25px rgba(0,0,0,0.4)',
                            }}
                        >
                            <span className='text-4xl lg:text-6xl font-bold text-yellow-300/60 select-none'>$</span>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0], rotateX: [35, 30, 35], rotateY: [10, 15, 10], rotateZ: [0, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className='w-[170px] h-[170px] lg:w-[240px] lg:h-[240px] rounded-full transform z-10 absolute flex justify-center items-center overflow-hidden border-b-8 border-r-4 border-green-900/60'
                            style={{
                                background: 'radial-gradient(circle at 30% 30%, #22c55e 0%, #16a34a 50%, #14532d 100%)',
                                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.3), 15px 20px 35px rgba(0,0,0,0.5)',
                            }}
                        >
                            <span className='text-6xl lg:text-8xl font-black text-yellow-300 drop-shadow-[2px_4px_4px_rgba(0,0,0,0.6)] select-none z-10'>$</span>
                        </motion.div>
                    </motion.div>

                    <motion.div className='w-full h-[12%] flex justify-end items-center'>
                        <motion.span animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className='text-4xl lg:text-6xl jost text-yellow-500 rounded-4xl border-4 w-[15%] flex justify-center items-center border-black shadow-lg'>$</motion.span>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Main Content Layer */}
            <motion.div className='w-full h-full relative z-20 flex flex-col justify-center items-center px-4 md:px-10 py-20 md:py-0'>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-full flex flex-col justify-center items-center"
                    >
                        {/* Title Section with Floating Image Assets */}
                        <motion.div className='w-full h-auto md:h-[35%] flex justify-center items-end pb-10 relative'>
                            <motion.img
                                initial={{ x: -100, opacity: 0, rotate: -20, scale: 0.8 }}
                                animate={{ x: 0, opacity: 1, rotate: -8, scale: 1 }}
                                transition={{ delay: 0.3, duration: 1.2, type: "spring" }}
                                src={Heading[index].img1}
                                className="absolute left-[5%] md:left-[15%] bottom-[-20%] md:bottom-[-10%] w-24 h-24 md:w-44 md:h-44 object-cover rounded-2xl md:rounded-3xl shadow-2xl border-4 border-white z-30"
                            />
                            <motion.img
                                initial={{ x: 100, opacity: 0, rotate: 20, scale: 0.8 }}
                                animate={{ x: 0, opacity: 1, rotate: 12, scale: 1 }}
                                transition={{ delay: 0.5, duration: 1.2, type: "spring" }}
                                src={Heading[index].img2}
                                className="absolute right-[5%] md:left-[15%] top-[-30%] md:top-[-20%] w-24 h-24 md:w-44 md:h-44 object-cover rounded-2xl md:rounded-3xl shadow-2xl border-4 border-white z-30"
                            />

                            <h1 className='text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-gray-800 flex flex-row items-center gap-2 md:gap-4 text-center'>
                                <span className={`${Heading[index].color} italic drop-shadow-sm`}>{Heading[index].title}</span>
                                <span className="text-gray-400 font-light">{Heading[index].subtitle}</span>
                            </h1>
                        </motion.div>

                        {/* Description Section */}
                        <motion.div className='w-full max-w-4xl h-auto md:h-[40%] flex flex-col justify-start items-center text-center gap-6 md:gap-8 pt-10 md:pt-0'>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-600 leading-relaxed px-4'
                            >
                                {Heading[index].description}
                            </motion.p>
                        </motion.div>

                        {/* Slide Indicator Dots */}
                        <div className="flex gap-3 absolute bottom-6 md:bottom-10">
                            {Heading.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${i === index ? 'w-8 md:w-12 bg-gray-800' : 'w-1.5 md:w-2 bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}
