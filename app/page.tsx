'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { BsTwitter, BsTiktok, BsInstagram, BsFacebook } from 'react-icons/bs';
import { MdDehaze } from 'react-icons/md';
import { Background } from './components/Background';

const navVariants = {
  initial: { width: '0' },
  animate: {
    width: '100%',
    transition: { duration: 0.5, ease: 'easeIn' },
    exit: { width: 0, opacity: 0, transition: { duration: 0.5 } },
  },
};

const headerVariants = {
  initial: { opacity: 0, width: '10%' },
  animate: {
    opacity: 1,
    width: 0,

    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: { opacity: 0, width: 0, transition: { duration: 0.5 } },
};

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <header className="w-full mx-auto h-16  absolute z-10 top-5 left-1/2 transform -translate-x-1/2">
        <AnimatePresence>
          {!isOpen ? (
            <motion.div
              variants={headerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex justify-around space-x-3 max-w-[500px] mx-auto relative"
            >
              <div className="bg-white rounded-full p-5 ">Text</div>
              <div className="bg-white rounded-full p-5 ">Text</div>
              <div
                onMouseEnter={() => setIsOpen(!isOpen)}
                className="bg-white rounded-full p-5"
              >
                Text
              </div>
              <div className="bg-white rounded-full p-5 ">Text</div>
              <div className="bg-white rounded-full p-5 ">Text</div>
            </motion.div>
          ) : (
            <motion.nav
              variants={navVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onMouseLeave={() => setIsOpen(!isOpen)}
              className="bg-white max-w-[500px] mx-auto p-5 w-full rounded-full  h-16"
            >
              <ul className="flex justify-around space-x-5 max-w-[500px] mx-auto relative">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/">Story</Link>
                </li>
                <li>
                  <Link href="/">Products</Link>
                </li>
                <li>
                  <Link href="/">Sign in</Link>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <Background />
      
    </div>
  );
};
export default HomePage;
