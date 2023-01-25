import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AutoplayOptions, PaginationOptions } from 'swiper/types';
import React, { useRef, useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, IconButton } from '@mui/material';

import styles from './swiper.module.css';
import { CustomSwiperProps } from './types';

SwiperCore.use([Autoplay, Navigation, Pagination]);

const pagination: PaginationOptions = {
  dynamicBullets: true,
  renderBullet: function (_, className) {
    return `<span class="${className} ${styles.pagination}"></span>`;
  },
};

const autoplay: AutoplayOptions = { delay: 7000, pauseOnMouseEnter: true };

const CustomSwiper = ({
  children,
  slidesPerView,
  showButtonsNav = true,
  ...props
}: CustomSwiperProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Box className={styles.container}>
      {showButtonsNav && (
        <IconButton aria-label="Swipe previous button" ref={prevRef} disabled={currentIndex === 0}>
          {children.length > slidesPerView ? <NavigateBeforeIcon fontSize="large" /> : <></>}
        </IconButton>
      )}
      <Swiper
        className={styles.swiperContainer}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        autoplay={autoplay}
        pagination={pagination}
        onActiveIndexChange={(swiper) => {
          setCurrentIndex(swiper.activeIndex);
        }}
        slidesPerView={slidesPerView}
        centerInsufficientSlides={true}
        {...props}
      >
        {children.map((child, i) => (
          <SwiperSlide key={i} className={styles.swiperSlide}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
      {showButtonsNav && (
        <IconButton
          aria-label="Swipe next button"
          ref={nextRef}
          disabled={currentIndex === children.length - slidesPerView}
        >
          {children.length > slidesPerView ? <NavigateNextIcon fontSize="large" /> : <></>}
        </IconButton>
      )}
    </Box>
  );
};

export default CustomSwiper;
