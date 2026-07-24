import React, { useMemo } from 'react';

import type { Vehicle } from '@/shared/types/vehicle';

type Props = {
  productDetails: Vehicle;
};

export const ProductsReviews: React.FC<Props> = ({ productDetails }) => {
  const reviews = useMemo(() => {
    if (!productDetails) {
      return [];
    }

    const savedReviews = window.localStorage.getItem(`reviews_${productDetails.id}`);

    const localReviews = savedReviews ? JSON.parse(savedReviews) : [];

    return [...productDetails.reviews, ...localReviews];
  }, [productDetails]);

  return (
    <section className="col-span-4 px-4 lg:col-span-8 lg:px-0">
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
                    .map((name: string) => name[0])
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
  );
};
