import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import useMediaQuery from '@/shared/hooks/useMediaQuery';

import type { Vehicle } from '@/shared/types/vehicle';

type Props = {
  productDetails: Vehicle;
};

export const ProductGallery: React.FC<Props> = ({ productDetails }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const swiperDirection = isMobile ? 'horizontal' : 'vertical';
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="col-span-4 lg:grid lg:grid-cols-6 lg:gap-4 lg:col-span-6">
      <div className="mb-4 lg:col-start-2 lg:-col-end-1">
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
          className="mySwiper2"
        >
          {productDetails?.images.map((image) => (
            <SwiperSlide key={image}>
              <img src={image} alt="product" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="py-4 lg:py-0 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:-row-end-1">
        <Swiper
          className="
                  flex items-center justify-between
                  w-full
                  lg:w-20 lg:h-116
                  xl:w-20 xl:h-116
              "
          direction={swiperDirection}
          onSwiper={setThumbsSwiper}
          spaceBetween={18}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[Thumbs]}
        >
          {productDetails?.images.map((image, index) => (
            <SwiperSlide key={image}>
              <img
                src={image}
                alt="thumbnail"
                className={`rounded-xl cursor-pointer ${activeIndex === index ? 'border-2 border-blue-500' : ''}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
