'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  BsFacebook,
  BsInstagram,
  BsList,
  BsTiktok,
  BsTwitter,
} from 'react-icons/bs';
import { LoggedInImage } from './LoggedInImage';
import { AniamtePresence, MotionDiv, MotionNav } from './Motion';
import { ShoppingCart } from './ShoppingCart';

const navVariants = {
  initial: { width: 0 },
  animate: {
    width: '100%',
    transition: { duration: 0.5, ease: 'easeIn' },
  },
  exit: { width: 0, opacity: 0, transition: { duration: 0.5 } },
};

const headerVariants = {
  initial: { opacity: 0, width: 0 },
  animate: {
    opacity: 1,
    width: '100%',

    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: { width: 0, transition: { duration: 0.5 } },
};

export const Navbar = () => {
  const { data: session } = useSession();
  const navLinks = [
    { name: 'Home', link: '/' },
    { name: 'Story', link: '/story' },
    { name: 'Products', link: '/products' },
    {
      name: `${session ? 'Profile' : 'Sign in'}`,
      link: `${session ? '/profile' : '/signin'}`,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true); // Enable animations once the component has mounted
  }, []);

  const iconStyle = {
    width: '25px',
    height: '25px',
    transition: 'transform 0.3s ease-in-out',
  };

  return (
    <header className="w-full sm:flex items-center mx-auto h-16 text-white absolute z-10 top-5 left-1/2 transform -translate-x-1/2">
      <AnimatePresence>
        {!isOpen ? (
          <MotionNav
            variants={headerVariants}
            initial="initial"
            animate={isAnimated && 'animate'}
            exit="exit"
            className="hidden sm:flex space-x-3 max-w-[500px] justify-center  mx-auto relative"
          >
            <div className="glass rounded-full flex items-center p-5 cursor-pointer hover:scale-110 transition-all">
              <BsTwitter style={iconStyle} />
            </div>
            <div className="glass rounded-full p-5 flex items-center cursor-pointer hover:scale-110 transition-all">
              <BsFacebook style={iconStyle} />
            </div>
            <div
              onMouseEnter={() => setIsOpen(!isOpen)}
              className="glass rounded-full p-5 cursor-pointer hover:scale-110 transition-all"
            >
              <BsList style={iconStyle} />
            </div>
            <div className="glass rounded-full p-5 cursor-pointer hover:scale-110 transition-all ">
              <BsTiktok style={iconStyle} />
            </div>
            <div className="glass rounded-full p-5 cursor-pointer hover:scale-110 transition-all ">
              <BsInstagram style={iconStyle} />
            </div>
          </MotionNav>
        ) : (
          <motion.nav
            variants={navVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onMouseLeave={() => setIsOpen(!isOpen)}
            className="glass max-w-[500px] mx-auto p-5 w-full rounded-full  h-16"
          >
            <ul className="flex justify-around space-x-5 max-w-[500px] mx-auto relative">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hamburger menu for small screens */}
      <div className="sm:hidden drawer flex justify-center">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="flex justify-center items-center relative w-11/12 mx-auto">
          <div className="drawer-content glass rounded-full p-5 cursor-pointer hover:scale-110 transition-end">
            {/* Page content here */}

            <label htmlFor="my-drawer">
              <BsList style={iconStyle} />
            </label>
          </div>
          <div className="absolute right-5 sm:hidden">
            {session?.user ? <LoggedInImage /> : ''}
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content z-30 glass bg-opacity-30">
            {/* Sidebar content here */}

            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.link}>
                  <Link href={link.link}>{link.name}</Link>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute right-20 z-20">
        <ShoppingCart />
      </div>
      <div className="absolute right-5 hidden sm:block">
        <LoggedInImage />
      </div>
    </header>
  );
};
