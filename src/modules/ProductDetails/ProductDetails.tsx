import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import '@smastrom/react-rating/style.css';
import { Rating } from '@smastrom/react-rating';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import { FreeMode, Thumbs } from 'swiper/modules';

import { request } from '@/services/apiService';

import useMediaQuery from '@/shared/hooks/useMediaQuery';

import type { Vehicle } from '@/shared/types/vehicle';

import { StatusMessage } from '@/shared/components/StatusMessage/StatusMessage';
import type { Review } from '@/shared/types/review';

export const ProductDetails = () => {
  const myStyles = {
    itemShapes: (
      <svg viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
    activeFillColor: '#D14B22',
    inactiveFillColor: '#D9DCE5',
    itemStrokeWidth: 0,
  };

  const isMobile = useMediaQuery('(max-width: 639px)');
  const swiperDirection = isMobile ? 'horizontal' : 'vertical';

  const { slug } = useParams();

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [productDetails, setProductDetails] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const [errorReview, setErrorReview] = useState({
    fullnameError: '',
    emailError: '',
    commentError: '',
    ratingError: '',
  });

  const [rating, setRating] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!productDetails) return;

    const errors = {
      fullnameError: '',
      emailError: '',
      commentError: '',
      ratingError: '',
    };

    if (!fullname.trim()) {
      errors.fullnameError = 'Full name is required';
    }

    if (!email.trim()) {
      errors.emailError = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.emailError = 'Invalid email address';
    }

    if (!comment.trim()) {
      errors.commentError = 'Comment is required';
    }

    if (!rating) {
      errors.ratingError = 'Please select a rating';
    }

    setErrorReview(errors);

    if (Object.values(errors).some(Boolean)) {
      return;
    }

    const review: Review = {
      reviewerName: fullname,
      reviewerEmail: email,
      rating,
      comment,
      date: new Date().toISOString(),
    };

    const key = `reviews_${productDetails.id}`;

    let reviews;

    try {
      const savedReviews = window.localStorage.getItem(key);

      reviews = savedReviews ? JSON.parse(savedReviews) : [];
    } catch {
      reviews = [];
    }

    reviews.push(review);

    window.localStorage.setItem(key, JSON.stringify(reviews));

    setFullname('');
    setEmail('');
    setComment('');
    setRating(0);

    setErrorReview({
      fullnameError: '',
      emailError: '',
      commentError: '',
      ratingError: '',
    });
  };

  const reviews = useMemo(() => {
    if (!productDetails) {
      return [];
    }

    const savedReviews = window.localStorage.getItem(`reviews_${productDetails.id}`);

    const localReviews = savedReviews ? JSON.parse(savedReviews) : [];

    return [...productDetails.reviews, ...localReviews];
  }, [productDetails]);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const response = await request<Vehicle>(`https://dummyjson.com/products/${slug}`);

        setProductDetails(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Something get wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [productDetails]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  if (loading) {
    return <StatusMessage type="loading" />;
  }

  if (error || !productDetails) {
    return <StatusMessage type="error" message={error} />;
  }

  return (
    <main className="grid grid-cols-4 bg-[#F8F9FF] lg:grid-cols-12 lg:gap-6 lg:gap-y-12 lg:px-10 py-12">
      <section className="col-span-4 lg:grid lg:grid-cols-6 lg:gap-4 lg:col-span-6">
        <div className="mb-4 lg:col-start-2 lg:col-end-[-1]">
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

        <div className="py-4 lg:py-0 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-[-1]">
          <Swiper
            className="
                flex items-center justify-between
                w-full
                lg:w-[80px] lg:h-[464px]
                xl:w-[80px] xl:h-[464px]
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
              <span className="font-semibold">{productDetails?.rating}</span>
              <span className="text-gray-500">({productDetails?.reviews.length} Reviews)</span>
            </div>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-[#12213A]">{productDetails?.title}</h1>

          <p className="mt-2 text-gray-600">{productDetails?.description}</p>
        </div>

        <div className="border border-[#C3C6D7] rounded-2xl bg-[#F1F5FF] p-5">
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-blue-700">${productDetails?.price}</p>

            <span className="mb-1 text-sm text-gray-500">MSRP</span>
          </div>

          <div className="mt-5 space-y-3">
            <p className="flex items-center gap-3 text-sm">
              <span className="text-blue-600">◉</span>
              Available for Immediate Delivery
            </p>

            <p className="flex items-center gap-3 text-sm">
              <span className="text-blue-600">▣</span>
              In Stock: {productDetails?.stock} units at Downtown Dealership
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {productDetails?.tags.map((item) => (
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
            <p className="mt-1 font-semibold">{productDetails?.warrantyInformation}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Shipping</p>
            <p className="mt-1 font-semibold">{productDetails?.shippingInformation}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Return Policy</p>
            <p className="mt-1 font-semibold">{productDetails?.returnPolicy}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">SKU</p>
            <p className="mt-1 font-semibold">{productDetails?.sku}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Full Description</h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">{productDetails?.description}</p>
        </div>
      </section>

      <section className="col-span-4 lg:col-span-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Customer Reviews</h3>
        </div>

        <div className="mt-6 space-y-6">
          {reviews.map((review) => (
            <article key={review.reviewerName} className="rounded-2xl border bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                    {review.reviewerName
                      .split(' ')
                      .map((name) => name[0])
                      .join('')
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h4 className="font-semibold">{review.reviewerName}</h4>

                    <p className="text-sm text-gray-500">
                      Verified Buyer • {new Date(review.date).toLocaleDateString('uk-UA')}
                    </p>
                  </div>
                </div>

                <div className="text-xl">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.rating ? 'text-orange-700' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-6 text-gray-600 italic leading-6">"{review.comment}"</p>
            </article>
          ))}
        </div>
      </section>

      <section className="col-span-4 h-fit rounded-2xl border bg-white p-6 lg:col-span-4">
        <h3 className="text-2xl font-bold text-[#12213A]">Share Your Experience</h3>

        <p className="mt-3 text-gray-600">Your review helps other buyers make an informed decision.</p>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-semibold">Full Name</label>

            <input
              type="text"
              value={fullname}
              placeholder="e.g. Robert Smith"
              onChange={(e) => {
                setFullname(e.target.value);
                setErrorReview((prev) => ({ ...prev, fullnameError: '' }));
              }}
              className="h-14 w-full rounded-xl border bg-[#F1F5FF] px-4 text-sm outline-none placeholder:text-gray-400 focus:border-blue-600"
            />
            {errorReview.fullnameError && <p className="mt-1 text-sm text-red-600">{errorReview.fullnameError}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Email</label>

            <input
              type="email"
              value={email}
              placeholder="e.g. robert@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorReview((prev) => ({
                  ...prev,
                  emailError: '',
                }));
              }}
              className="h-14 w-full rounded-xl border bg-[#F1F5FF] px-4 text-sm outline-none placeholder:text-gray-400 focus:border-blue-600"
            />

            {errorReview.emailError && <p className="mt-1 text-sm text-red-600">{errorReview.emailError}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Rating</label>

            <Rating
              value={rating}
              onChange={setRating}
              itemStyles={myStyles}
              style={{
                width: 100,
                height: 24,
              }}
            />

            {errorReview.ratingError && <p className="text-sm text-red-600">{errorReview.ratingError}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Comment</label>

            <textarea
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setErrorReview((prev) => ({ ...prev, commentError: '' }));
              }}
              placeholder="How was your experience?"
              className="h-32 w-full resize-none rounded-xl border bg-[#F1F5FF] p-4 text-sm outline-none placeholder:text-gray-400 focus:border-blue-600"
            />
            {errorReview.commentError && <p className="mt-1 text-sm text-red-600">{errorReview.commentError}</p>}
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
