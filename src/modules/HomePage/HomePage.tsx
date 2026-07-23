import { useEffect, useState } from 'react';

import { request } from '@/services/apiService';

import { CarList } from './components/CarList';
import { HeroSection } from './components/HeroSection';

import type { VehiclesResponse } from '@/shared/types/vehiclesResponse';
import type { Vehicle } from '@/shared/types/Vehicle';

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

  return (
    <main className="bg-[#F8F9FF]">
      <HeroSection />
      {!loading && <CarList loading={loading} vehicles={vehicles} />}
    </main>
  );
};
