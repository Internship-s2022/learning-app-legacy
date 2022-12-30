import { SwiperOptions } from 'swiper/types/swiper-options';

export interface CustomSwiperProps extends SwiperOptions {
  children: JSX.Element[];
  slidesPerView: number;
}
