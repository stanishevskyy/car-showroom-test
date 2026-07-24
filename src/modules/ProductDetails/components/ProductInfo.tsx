import type React from 'react';

import type { Vehicle } from '@/shared/types/vehicle';

type Props = {
  productDetails: Vehicle;
};

export const ProductInfo: React.FC<Props> = ({ productDetails }) => {
  return (
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

        <button className="cursor-pointer mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 font-semibold text-white shadow">
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
  );
};
