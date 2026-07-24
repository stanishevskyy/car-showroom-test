import type React from 'react';
import { useMemo, useState } from 'react';

import 'swiper/css';

import { CarCard } from './CarCard';

import Filters from '@/assets/icons/car-list-icons/filters.svg';

import type { Vehicle } from '@/shared/types/vehicle';
import { SortBy } from '@/shared/constants/sortBy';

import { StatusMessage } from '@/shared/components/StatusMessage/StatusMessage';
import { CarFilters } from './CarFilters';
import { NoVehiclesFound } from '@/shared/components/NoVehiclesFound';

type Props = {
  error: string;
  vehicles: Vehicle[];
};

export const CarList: React.FC<Props> = ({ error, vehicles }) => {
  const brands = Array.from(new Set(vehicles.map((vehicle) => vehicle.brand)));
  const maxPrice = useMemo(() => {
    return vehicles.length ? Math.max(...vehicles.map((vehicle) => vehicle.price)) : 0;
  }, [vehicles]);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState({
    query: '',
    brand: 'All brands',
    price: maxPrice,
    sort: SortBy.Alphabetically,
  });

  const filteredProcuts = useMemo(() => {
    let filteredProducts = [...vehicles];

    if (appliedFilters.query.trim() !== '') {
      filteredProducts = filteredProducts.filter((vehicle) =>
        vehicle.title.trim().toLowerCase().includes(appliedFilters.query.trim().toLowerCase()),
      );
    }

    if (appliedFilters.brand !== 'All brands') {
      filteredProducts = filteredProducts.filter(
        (vehicle) => vehicle.brand.trim().toLowerCase() === appliedFilters.brand.trim().toLowerCase(),
      );
    }

    if (Number(appliedFilters.price) !== Number(maxPrice)) {
      filteredProducts = filteredProducts.filter((vehicle) => Number(vehicle.price) <= Number(appliedFilters.price));
    }

    switch (appliedFilters.sort) {
      case SortBy.Alphabetically:
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case SortBy.HighPrice:
        filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case SortBy.LowPrice:
        filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      default:
        return filteredProducts;
    }

    return filteredProducts;
  }, [appliedFilters, vehicles, maxPrice]);

  if (error) {
    return <StatusMessage type="error" message={error} />;
  }

  return (
    <section className="pb-24">
      <div className="flex gap-5 px-4 py-4  border-b border-[#C3C6D7] lg:hidden">
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="flex items-center justify-center gap-2 h-9 rounded-full px-4 py-2 bg-[#E5EEFF] font-inter font-semibold text-[14px] leading-5 tracking-[0.7px] text-center"
        >
          <img src={Filters} alt="Filters" />
          Filters
        </button>
      </div>

      <CarFilters
        isFiltersOpen={isFiltersOpen}
        maxPrice={maxPrice}
        brands={brands}
        appliedFilters={appliedFilters}
        setIsFiltersOpen={setIsFiltersOpen}
        setAppliedFilters={setAppliedFilters}
      />

      <p className="px-4 pt-6 pb-4 font-semibold text-[14px] leading-5 tracking-[0.7px] text-[#434655] lg:hidden">
        {filteredProcuts.length} Vehicles Available
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-10 lg:pt-12.25 lg:pb-24">
        {filteredProcuts.length === 0 ? (
          <NoVehiclesFound />
        ) : (
          filteredProcuts.map((vehicle) => <CarCard key={vehicle.id} vehicle={vehicle} />)
        )}
      </div>
    </section>
  );
};
