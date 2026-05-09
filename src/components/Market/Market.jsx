import {motion} from 'framer-motion'
import Highlights from './Highlights'
import MainAdds from './MainAdds'


export default function Market(){
    return(
        <>
        <div className='w-full flex flex-col justify-center items-center gap-0 overflow-x-hidden'>

            <div className='w-full'>
                <Highlights/>
            </div>

            <div className='w-full'>
                <MainAdds/>
            </div>

        </div>
        </>
    )
}