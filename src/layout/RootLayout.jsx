import React, { useEffect, useRef } from 'react';
import Navbar from '../components/shared/Navbar';
import { Outlet, useLocation } from 'react-router';
import Footer from '../components/shared/Footer';

const scrollPositions = {};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathname = useRef(null);

  useEffect(() => {
    // pathname change হওয়ার আগে scroll save করতে হবে
    // তাই cleanup function-এ save করি
    return () => {
      // এই component unmount/re-run হওয়ার আগে
      // অর্থাৎ pathname change হওয়ার ঠিক আগে save হবে
      scrollPositions[pathname] = window.scrollY;
    };
  }, [pathname]);

  useEffect(() => {
    const prev = prevPathname.current;
    prevPathname.current = pathname;

    // Detail page থেকে back → Homepage
    if (scrollPositions[pathname] !== undefined) {
      const savedY = scrollPositions[pathname];
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo({ top: savedY, behavior: "smooth" });
        }, 80);
      });
    } else {
      // নতুন page → top-এ যাও
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return null;
};

const RootLayout = () => {
  return (
    <div className='bg-base-200'>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;