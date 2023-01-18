import { useEffect, useState } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowDimensions.width >= 1200;
  const isLaptop = windowDimensions.width >= 1024 && windowDimensions.width < 1200;
  const isTablet = windowDimensions.width >= 640 && windowDimensions.width < 1024;
  const isPhone = windowDimensions.width < 640;

  return { ...windowDimensions, isDesktop, isTablet, isPhone, isLaptop };
}
