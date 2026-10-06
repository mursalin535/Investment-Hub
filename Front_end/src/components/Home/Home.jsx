import Hero from './Hero'
import TopCompanies from './Top_companies';
import Step from './Step';
import Unite from './Unite';
import Rvw from './Rvw';

function Home(){ 
  
    return( 
        <>
        <div className='w-full flex flex-col justify-center items-center gap-10 md:gap-20 pt-4 md:pt-[5vh] ~overflow-x-hidden'>

            <div className="w-full">
                <Hero/>
            </div>


<div className='w-full'>

<Unite/>

</div>

<div className='w-full'>
    <TopCompanies/>
</div>

<div className='w-full'>

    <Step/>

</div>



<div className='w-full'>
    <Rvw/>
</div>

        </div>
        </> 
    ) 
} 

export default Home;
