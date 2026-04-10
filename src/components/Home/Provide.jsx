import {motion} from "framer-motion"
import { DollarSign, TrendingUp, Wallet, Banknote } from "lucide-react"

export default function Provide(){

const Provides=[
    {
        img:'/money_security.webp',
        tittle:'Money Security',
        des:'We prioritize your financial safety with multi-layered protection and advanced risk management protocols.'
    }
    ,{
        img:'/trustable_clients.webp',
        tittle:'Trustable Clients',
        des:'Join a network of verified investors and professionals committed to transparent and ethical growth.'
    },{
        img:'/networking.webp',
        tittle:'Global Networking',
        des:'Connect with global market leaders and expand your investment reach across international borders.'
    }
    ,{
        img:'/guideline.webp',
        tittle:'Expert Guideline',
        des:'Receive personalized roadmaps and expert advice tailored to navigate the complexities of modern finance.'
    }
]

    return(
        <>
<motion.div className="w-full flex flex-col justify-center items-center gap-10 relative overflow-hidden">

    {/* Subtle Background Decorative Elements */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/30 blur-[100px] rounded-full -mr-40 -mt-40 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-200/30 blur-[100px] rounded-full -ml-40 -mb-40 pointer-events-none" />

    <motion.div 
        className="absolute top-[-5%] right-[-2%] opacity-10 text-emerald-600 -rotate-12 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0, x: 50 }}
        whileInView={{ scale: 1.1, opacity: 0.15, x: 0 }}
        transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
        viewport={{ once: false }}
    >
        <DollarSign size={350} strokeWidth={1} />
    </motion.div>

    <motion.div 
        className="absolute bottom-[-5%] left-[-2%] opacity-10 text-emerald-600 rotate-12 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0, x: -50 }}
        whileInView={{ scale: 1.1, opacity: 0.15, x: 0 }}
        transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
        viewport={{ once: false }}
    >
        <TrendingUp size={350} strokeWidth={1} />
    </motion.div>

    {/* Top Heading */}
    <motion.div className="w-full min-h-[60vh] flex flex-col justify-center items-center relative py-20">
        
        {/* Floating Finance Icons as "BG Touch" */}
        {[
            { pos: "top-10 right-20", Icon: Banknote, delay: 1.5, size: 50, rotate: 15 },
            { pos: "bottom-20 left-20", Icon: Wallet, delay: 1.7, size: 45, rotate: -15 }
        ].map(({ pos, Icon, delay, size, rotate }, i) => (
            <motion.div
                key={i}
                className={`absolute ${pos} opacity-30 text-emerald-600 pointer-events-none z-0`}
                initial={{ opacity: 0, y: 20, rotate: rotate - 20 }}
                whileInView={{ opacity: 0.6, y: 0, rotate: rotate }}
                transition={{ 
                    delay, 
                    duration: 0.8,
                    type: "spring", 
                    stiffness: 50 
                }}
                viewport={{ once: false }}
            >
                <Icon size={size} strokeWidth={1.5} />
            </motion.div>
        ))}

        <motion.div className="w-full flex flex-row justify-start items-center gap-5 z-10 px-4 md:px-10"
            initial={{x:-100, opacity:0}}
            whileInView={{x:0,opacity:1}}
            transition={{delay:0.2,duration:0.5,ease:'easeInOut'}}
            viewport={{amount:0.5,once:false}}
        >
            <motion.h1
                className="text-[10vw] heading leading-tight px-10 py-4"
                initial={{ 
                    backgroundColor: "#ffffff", 
                    color: "#4b5563",
                    borderRadius: "0px"
                }}
                whileInView={{ 
                    backgroundColor: "#4ade80", 
                    color: "#ffffff",
                    borderRadius: "9999px"
                }}
                transition={{ delay: 0.6, duration: 0.5, ease: "circIn" }}
                viewport={{ amount: 0.5, once: false }}
            >All Solution</motion.h1>
            <motion.h1 className="text-[10vw] heading leading-tight">//</motion.h1>
        </motion.div>

         <motion.div className="w-full flex flex-row justify-end items-center gap-5 z-10 px-4 md:px-10"
            initial={{x:100, opacity:0}}
            whileInView={{x:0,opacity:1}}
            transition={{delay:0.4,duration:0.5,ease:'easeInOut'}}
            viewport={{amount:0.6,once:false}}
         >
            <motion.h1 className="text-[9vw] heading leading-tight">//</motion.h1>
            <motion.h1 className="text-[9vw] heading leading-tight">One Platform</motion.h1>
        </motion.div>

    </motion.div>

    {/* Solutions Header */}
    <motion.div 
        className="w-full flex flex-col justify-center items-center gap-4 py-16 px-4"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        viewport={{ once: false }}
    >
        <h2 className="text-4xl md:text-6xl font-bold text-center text-emerald-500 heading">
            Comprehensive Solutions
        </h2>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl text-center font-medium">
            We provide strategic financial solutions to help you build, grow, and protect your wealth.
        </p>
    </motion.div>

    {/*Bottom - 4 Equal Divs*/}
    <motion.div className="w-full min-h-[80vh] flex flex-col md:flex-row justify-center items-center gap-6 px-4 md:px-10 pb-20">
        {Provides.map((item, index) => (
            <motion.div 
                key={index}
                className="group relative w-full md:w-1/4 h-[50vh] md:h-[70vh] overflow-hidden rounded-3xl cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: false }}
            >
                {/* Image Container with bg fixed */}
                <div 
                  className="absolute inset-0 transition-transform duration-700 scale-120 group-hover:scale-130"
style={{ 
    backgroundImage: `url(${item.img})`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',        // ✅ this is the correct property
    backgroundPosition: 'center',
}}
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-emerald-950/70 transition-colors duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 heading">
                            {item.tittle}
                        </h3>
                        <p className="text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed jost-light">
                            {item.des}
                        </p>
                    </div>
                </div>
            </motion.div>
        ))}
    </motion.div>

</motion.div>

        </>
    )
}