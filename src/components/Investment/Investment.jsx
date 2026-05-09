import { motion } from 'framer-motion'
import Hero from './Hero.jsx'
import MiddleDiv from './MiddleDiv.jsx'
import AskingForm from './AskingForm.jsx'

export default function Investment() {
    return(
        <motion.div 
            className='w-full flex flex-col justify-center items-center gap-10 md:gap-20 pb-20'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className='w-full'>
                <Hero/>
            </div>

            <div className='w-full'>
                <MiddleDiv/>
            </div>

            <div className='w-full'>
                <AskingForm/>
            </div>

        </motion.div>
    )
}
