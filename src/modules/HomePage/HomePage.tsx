import { useEffect, useState } from 'react';

import { request } from '@/services/apiService';

import { CarList } from './components/CarList';
import { HeroSection } from './components/HeroSection';

import type { VehiclesResponse } from '@/shared/types/vehiclesResponse';
import type { Vehicle } from '@/shared/types/vehicle';
import { StatusMessage } from '@/shared/components/StatusMessage/StatusMessage';

export const HomePage = () => {
  const [data, setData] = useState<VehiclesResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const vehicles: Vehicle[] = data?.products ?? [];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const response = await request<VehiclesResponse>('https://dummyjson.com/products/category/vehicle');

        setData(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  if (loading) {
    return <StatusMessage type="loading" />;
  }

  return (
    <main className="bg-[#F8F9FF]">
      <HeroSection />
      <CarList error={error} vehicles={vehicles} />
    </main>
  );
};
