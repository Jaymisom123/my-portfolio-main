'use client';
import WorkSlider from '../../components/WorkSlider';
import Bulb from '../../components/Bulb';
import Circles from '../../components/Circles';

import {motion} from 'framer-motion';
import {fadeIn} from '../../variants';

const Work = () => {
  return (
    <div className='min-h-screen bg-primary/30 py-20 sm:py-24 lg:py-28 flex items-start'>
      <Circles />
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          <div className='text-center flex w-full xl:w-[32rem] flex-col lg:text-left mb-8 xl:mb-0'>
            <motion.h2 
              variants={fadeIn('up', 0.2)} 
              initial='hidden' 
              animate='show' 
              exit='hidden' 
              className='h2 xl:mt-4'>
              🚀 <span className='text-accent'>Meus Projetos</span>
            </motion.h2>
            <motion.p 
               variants={fadeIn('up', 0.4)} 
               initial='hidden' 
               animate='show' 
               exit='hidden' 
               className='text-white/80 leading-relaxed max-w-[520px] mx-auto lg:mx-0'>
              Aqui você encontra alguns dos meus projetos em produção, criados com tecnologias como React, Next.js, Node.js e MongoDB. 
              Todos foram pensados para oferecer ótima experiência do usuário, com design responsivo e funcionalidades reais.
              Fique à vontade para explorar e interagir com cada um!
            </motion.p>
          </div>
          <motion.div 
             variants={fadeIn('down', 0.6)} 
             initial='hidden' 
             animate='show' 
             exit='hidden' 
             className='w-full xl:max-w-[70%]'>
            <WorkSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
    );
};

export default Work;
