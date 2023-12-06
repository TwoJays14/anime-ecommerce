import Image from 'next/image';
import Image1 from '../../public/1.png';
import Image2 from '../../public/2.png';
import Image3 from '../../public/3.png';
import Image4 from '../../public/4.png';
import Image5 from '../../public/5.png';
import Image6 from '../../public/6.png';
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
    x: '-100%',
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
  return (
    <div className="overflow-hidden relative">
      <motion.div
        variants={imgVariants as imgVariantsType}
        initial="initial"
        animate="animate"
        className="flex rounded-lg h-screen  space-x-2 "
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
      <div className="flex flex-col justify-center items-center absolute top-1/3 left-1/2 transform -translate-x-1/2 p-8   bg-slate-800 z-10 rounded-[5rem] text-white backdrop-blur-sm bg-opacity-60 max-w-11/12">
        <h3 className="text-[5rem] uppercase font-bold tracking-tighter">
          celestials
        </h3>
        <p>NFT collection that will capture your heart and soul</p>
      </div>
    </div>
  );
};
