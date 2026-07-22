import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import Filters from '@/assets/icons/car-list-icons/filters.svg';
import Search from '@/assets/icons/car-list-icons/search-filters.svg';
import ArrowDown from '@/assets/icons/car-list-icons/arrow-down.svg';
import { CarCard } from './CarCard';

export const CarList = () => {
  const filters = ['Electric', 'SUVS', 'Sedan', 'Sports'];

  const cars = [
    {
      id: 1,
      title: 'Model S Plaid',
      price: 89990,
      brand: 'Tesla',
      description: 'All-Wheel Drive',
      fullDescription: 'Experience the future of performance with zero emissions. Rapid acceleration and...',
      thumbnail: '/images/car.png',
      tags: ['Electric', '1,020 hp'],
      rating: 4.9,
      stock: 3,
    },
    {
      id: 12,
      title: 'Model S Plaid',
      price: 89990,
      brand: 'Tesla',
      description: 'All-Wheel Drive',
      fullDescription: 'Experience the future of performance with zero emissions. Rapid acceleration and...',
      thumbnail: '/images/car.png',
      tags: ['Electric', '1,020 hp'],
      rating: 4.9,
      stock: 3,
    },
    {
      id: 13,
      title: 'Model S Plaid',
      price: 89990,
      brand: 'Tesla',
      description: 'All-Wheel Drive',
      fullDescription: 'Experience the future of performance with zero emissions. Rapid acceleration and...',
      thumbnail: '/images/car.png',
      tags: ['Electric', '1,020 hp'],
      rating: 4.9,
      stock: 3,
    },
  ];

  return (
    <section className="pb-24">
      <div className="flex gap-5 px-4 py-4  border-b border-[#C3C6D7] lg:hidden">
        <button className="flex items-center justify-center gap-2 h-[36px] rounded-full px-4 py-2 bg-[#E5EEFF] font-inter font-semibold text-[14px] leading-[20px] tracking-[0.7px] text-center">
          <img src={Filters} alt="Filters" />
          Filters
        </button>

        <ul className="overflow-hidden">
          <Swiper spaceBetween={10} slidesPerView="auto">
            {filters.map((filter) => (
              <SwiperSlide key={filter} className="!w-auto">
                <li>
                  <button className="h-[36px] rounded-full px-4 py-2 bg-[#E5EEFF] font-inter font-semibold text-[14px] leading-[20px] tracking-[0.7px] text-center whitespace-nowrap">
                    {filter}
                  </button>
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>

      <div className="hidden lg:block px-10 py-8">
        <div className="flex items-center justify-between px-6 py-6 bg-[#EFF4FF] border rounded-xl border-[#C3C6D7] shadow-[0_1px_2px_0_#0000000D]">
          <div className="flex flex-col gap-2">
            <p className="font-normal text-[16px] leading-[24px] text-[#565E74]">Search</p>
            <div className="relative w-[217px] h-[41px]">
              <img src={Search} alt="" className="absolute left-4 top-1/2 -translate-y-1/2" />

              <input
                type="text"
                placeholder="Model or keyword"
                className="w-full h-full rounded-[8px] border border-[#737686] bg-white py-[10px] pr-4 pl-10 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-normal text-[16px] leading-[24px] text-[#565E74]">Brand</p>

            <button className="flex items-center justify-between w-[217px] h-[41px] rounded-[8px] border border-[#737686]  bg-white px-4 text-[16px] leading-[24px] text-[#565E74]">
              <span>All Brands</span>
              <img src={ArrowDown} alt="" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-normal text-[16px] leading-[24px] text-[#565E74]">Price Range</p>

            <input type="range" className="w-[217px] accent-[#004AC6]" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-normal text-[16px] leading-[24px] text-[#565E74]">Sort By</p>

            <button className="flex items-center justify-between w-[217px] h-[41px] rounded-[8px] border border-[#737686]  bg-white px-4 text-[16px] leading-[24px] text-[#565E74]">
              <span>Price: Low to High</span>
              <img src={ArrowDown} alt="" />
            </button>
          </div>

          <div className="flex gap-2">
            <button className="w-[133px] h-[42px] rounded-[8px] py-[9px] font-inter font-normal text-[16px] leading-[24px] text-center bg-[#004AC6]  text-white">
              Apply
            </button>
            <button className="w-[133px] h-[42px] rounded-[8px] py-[9px] font-inter font-normal text-[16px] leading-[24px] text-center bg-[#F8F9FF]  text-[#0B1C30] bg-[#F8F9FF] border border-[#C3C6D7]">
              Reset
            </button>
          </div>
        </div>
      </div>

      <p className="px-4 pt-6 pb-4 font-semibold text-[14px] leading-[20px] tracking-[0.7px] text-[#434655] lg:hidden">
        248 Vehicles Available
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-10 lg:pt-[49px] lg:pb-[96px]">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
};
