import React from 'react';

import { MobileFilters } from './MobileFilters';
import { DesktopFilters } from './DesktopFilters';

import { SortBy } from '@/shared/constants/sortBy';

type Props = {
  isFiltersOpen: boolean;
  maxPrice: number;
  brands: string[];
  appliedFilters: { query: string; brand: string; price: number; sort: SortBy };
  setIsFiltersOpen: (value: boolean) => void;
  setAppliedFilters: (value: { query: string; brand: string; price: number; sort: SortBy }) => void;
};

export const CarFilters: React.FC<Props> = ({
  isFiltersOpen,
  maxPrice,
  brands,
  appliedFilters,
  setIsFiltersOpen,
  setAppliedFilters,
}) => {
  return (
    <>
      {isFiltersOpen ? (
        <MobileFilters
          brands={brands}
          maxPrice={maxPrice}
          filters={appliedFilters}
          setFilters={setAppliedFilters}
          setIsFiltersOpen={setIsFiltersOpen}
        />
      ) : (
        <DesktopFilters brands={brands} maxPrice={maxPrice} filters={appliedFilters} setFilters={setAppliedFilters} />
      )}
    </>
  );
};
