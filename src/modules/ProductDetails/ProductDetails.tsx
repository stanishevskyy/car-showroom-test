import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { request } from '@/services/apiService';

import type { Vehicle } from '@/shared/types/vehicle';

import { StatusMessage } from '@/shared/components/StatusMessage/StatusMessage';

import { ProductGallery } from './components/ProductGallery';
import { ProductInfo } from './components/ProductInfo';
import { ProductsReviews } from './components/ProductsReviews';
import { SubmitReview } from './components/SubmitReview';

export const ProductDetails = () => {
  const { slug } = useParams();

  const [productDetails, setProductDetails] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    <main className="grid grid-cols-4 gap-y-8 bg-[#F8F9FF] lg:grid-cols-12 lg:gap-6 lg:gap-y-12 lg:px-10 py-12">
      <p className="col-span-full flex items-center gap-2 text-sm text-[#737686] px-4">
        <Link to="/" className="cursor-pointer hover:text-[#004AC6]">
          Home
        </Link>

        <span>/</span>

        <span className="font-medium text-[#12213A]">{productDetails.title}</span>
      </p>
      <ProductGallery productDetails={productDetails} />
      <ProductInfo productDetails={productDetails} />
      <ProductsReviews productDetails={productDetails} />
      <SubmitReview productDetails={productDetails} />
    </main>
  );
};
