import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import { FreeMode, Thumbs } from 'swiper/modules';

const images = [
  'https://swiperjs.com/demos/images/abstract-1.jpg',
  'https://swiperjs.com/demos/images/abstract-2.jpg',
  'https://swiperjs.com/demos/images/abstract-3.jpg',
  'https://swiperjs.com/demos/images/abstract-4.jpg',
  'https://swiperjs.com/demos/images/abstract-5.jpg',
  'https://swiperjs.com/demos/images/abstract-6.jpg',
  'https://swiperjs.com/demos/images/abstract-7.jpg',
  'https://swiperjs.com/demos/images/abstract-8.jpg',
  'https://swiperjs.com/demos/images/abstract-9.jpg',
  'https://swiperjs.com/demos/images/abstract-10.jpg',
];

const reviews = [
  {
    name: 'James D.',
    initials: 'JD',
    date: 'Oct 12, 2023',
    rating: 5,
    text: "Absolutely incredible driving dynamics. The transition to electric was seamless, and the dealer was extremely helpful with the home charging installation setup. Best purchase I've made this year.",
    helpful: 24,
  },
  {
    name: 'Sarah H.',
    initials: 'SH',
    date: 'Sept 28, 2023',
    rating: 4,
    text: 'The build quality is exceptional. Very quiet cabin and the sound system is studio grade. My only minor complaint is the learning curve for the infotainment screen.',
    helpful: 12,
  },
];

export const ProductDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="grid grid-cols-4 lg:grid-cols-12 lg:gap-6 lg:px-10 py-12">
      <section className="col-span-4 lg:col-span-7">
        <div className="mb-4">
          <Swiper
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
            }}
            className="mySwiper2"
          >
            {images.map((image) => (
              <SwiperSlide key={image}>
                <img src={image} alt="product" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="py-4 lg:py-0">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Thumbs]}
          >
            {images.map((image, index) => (
              <SwiperSlide key={image}>
                <img
                  src={image}
                  alt="thumbnail"
                  className={`rounded-[12px] cursor-pointer ${activeIndex === index ? 'border-2 border-blue-500' : ''}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="px-4 col-span-4 space-y-6 lg:col-span-5">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase text-blue-600">Executive Series</p>

            <div className="flex items-center gap-1 text-sm">
              <span className="text-orange-500">★</span>
              <span className="font-semibold">4.9</span>
              <span className="text-gray-500">(124 Reviews)</span>
            </div>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-[#12213A]">Vision M-Series Electric</h1>

          <p className="mt-2 text-gray-600">
            The future of grand touring. Engineered for maximum efficiency and unparalleled luxury performance.
          </p>
        </div>

        <div className="rounded-2xl bg-[#F1F5FF] p-5">
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-blue-700">$89,500</p>

            <span className="mb-1 text-sm text-gray-500">MSRP</span>
          </div>

          <div className="mt-5 space-y-3">
            <p className="flex items-center gap-3 text-sm">
              <span className="text-blue-600">◉</span>
              Available for Immediate Delivery
            </p>

            <p className="flex items-center gap-3 text-sm">
              <span className="text-blue-600">▣</span>
              In Stock: 3 units at Downtown Dealership
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {['Electric (EV)', 'AWD', 'Autopilot 3.0', 'Limited Edition'].map((item) => (
              <span key={item} className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#24324A]">
                {item}
              </span>
            ))}
          </div>

          <button className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 font-semibold text-white shadow">
            💬 Contact Dealer
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-6 border-y py-5">
          <div>
            <p className="text-xs text-gray-500">Warranty</p>
            <p className="mt-1 font-semibold">5 Years / 60k Miles</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Shipping</p>
            <p className="mt-1 font-semibold">Nationwide Delivery</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Return Policy</p>
            <p className="mt-1 font-semibold">7-Day Money Back</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Efficiency</p>
            <p className="mt-1 font-semibold">380 Mile Range</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Full Description</h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Experience the pinnacle of electric mobility with the Vision M-Series. Featuring a dual-motor setup that
            delivers 650 horsepower and 0-60 in just 3.2 seconds, this isn't just a car — it's a statement. The interior
            is draped in sustainable premium materials, featuring a 17-inch curved display and a 22-speaker spatial
            audio system for an immersive driving experience unlike any other.
          </p>
        </div>
      </section>
      <section className="col-span-4 lg:col-span-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Customer Reviews</h3>

          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500">Sort by:</p>

            <button className="rounded-lg border px-3 py-2">
              Newest First
              <img src="" alt="" />
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {reviews.map((review) => (
            <article key={review.name} className="rounded-2xl border bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                    {review.initials}
                  </div>

                  <div>
                    <h4 className="font-semibold">{review.name}</h4>

                    <p className="text-sm text-gray-500">Verified Buyer • {review.date}</p>
                  </div>
                </div>

                <div className="text-xl text-orange-700">
                  {'★'.repeat(review.rating)}
                  <span className="text-gray-300">{'★'.repeat(5 - review.rating)}</span>
                </div>
              </div>

              <p className="mt-6 text-gray-600 italic leading-6">"{review.text}"</p>

              <div className="mt-6 flex gap-5 text-sm text-gray-600">
                <button className="flex items-center gap-1">♡ Helpful ({review.helpful})</button>

                <button>⚑ Report</button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="col-span-4 rounded-2xl border bg-white p-6 lg:col-span-4">
        <h3 className="text-2xl font-bold text-[#12213A]">Share Your Experience</h3>

        <p className="mt-3 text-gray-600">Your review helps other buyers make an informed decision.</p>

        <form className="mt-6 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold">Full Name</label>

            <input
              type="text"
              placeholder="e.g. Robert Smith"
              className="h-14 w-full rounded-xl border bg-[#F1F5FF] px-4 text-sm outline-none placeholder:text-gray-400 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Rating</label>

            <div className="flex gap-1 text-3xl text-orange-600">
              {[1, 2, 3, 4, 5].map((star) => (
                <button type="button" key={star} className="transition hover:scale-110">
                  ☆
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Comment</label>

            <textarea
              placeholder="How was your experience?"
              className="h-32 w-full resize-none rounded-xl border bg-[#F1F5FF] p-4 text-sm outline-none placeholder:text-gray-400 focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="h-14 w-full rounded-xl bg-blue-700 font-semibold text-white transition hover:bg-blue-800"
          >
            Submit Review
          </button>
        </form>
      </section>
    </main>
  );
};
