import React, { useState } from 'react';

import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

import type { Vehicle } from '@/shared/types/vehicle';
import type { Review } from '@/shared/types/review';

type Props = {
  productDetails: Vehicle;
};

export const SubmitReview: React.FC<Props> = ({ productDetails }) => {
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

  return (
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
          className="cursor-pointer h-14 w-full rounded-xl bg-blue-700 font-semibold text-white transition hover:bg-blue-800"
        >
          Submit Review
        </button>
      </form>
    </section>
  );
};
