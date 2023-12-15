'use client';
import Image from 'next/image';
import Image1 from '../../public/1.png';
import Image2 from '../../public/2.png';
import Image3 from '../../public/3.png';
import Image4 from '../../public/4.png';
import Image5 from '../../public/5.png';
import Image6 from '../../public/6.png';
import Image7 from '../../public/7.png';
import Image8 from '../../public/8.png';
import Image9 from '../../public/9.png';
import Image10 from '../../public/10.png';
import Image11 from '../../public/11.png';
import Image12 from '../../public/12.png';
import { motion, Variants } from 'framer-motion';

type imgVariantsType = Variants & {
  initial: { x: number };
  animate: {
    x: string;
    transition: { duration: number; repeat: number; repeatType: string };
  };
};

const imgVariants = {
  initial: { x: 0 },
  animate: {
    x: '-1300px',
    transition: {
      duration: 30,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'linear',
    },
  },
};

const imgVariants2 = {
  initial: { x: 0 },
  animate: {
    x: '1300px',
    transition: {
      duration: 30,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'linear',
    },
  },
};
export const Background = () => {
  const images = [Image1, Image2, Image3, Image4, Image5, Image6];
  const images2 = [Image7, Image8, Image9, Image10, Image11, Image12];
  return (
    <div className="overflow-hidden relative h-screen gap-2 flex flex-col">
      <motion.div
        variants={imgVariants as imgVariantsType}
        initial="initial"
        animate="animate"
        className="flex rounded-lg h-2/4 space-x-2 "
      >
        {images.map((image, index) => (
          <Image
            src={image}
            alt={`img${index}`}
            key={index}
            className="object-cover w-full h-full
            "
          />
        ))}
      </motion.div>
      <motion.div
        variants={imgVariants2 as imgVariantsType}
        initial="initial"
        animate="animate"
        className="flex flex-row-reverse rounded-lg h-2/4 space-x-2 "
      >
        {images2.map((image, index) => (
          <Image
            src={image}
            alt={`img${index}`}
            key={index}
            className="object-cover w-full h-full
            "
          />
        ))}
      </motion.div>
      <div className="background-sign glass flex flex-col justify-center items-center absolute top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10  rounded-[5rem] text-white ">
        <h1 className="text-center sm:text-xl md:text-3xl lg:text-7xl uppercase font-bold  tracking-tighter">
          animarket
        </h1>
        <p>Anime character collection that will capture your heart and soul</p>
      </div>
    </div>
  );
};
