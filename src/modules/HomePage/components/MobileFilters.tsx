import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Search from '@/assets/icons/car-list-icons/search-filters.svg';

import { SortBy } from '@/shared/constants/sortBy';
import { getSearchWith } from '@/shared/utils/getSearchWith';

type Props = {
  maxPrice: number;
  brands: string[];
  filters: { query: string; brand: string; price: number; sort: SortBy };
  setIsFiltersOpen: (value: boolean) => void;
  setFilters: (value: { query: string; brand: string; price: number; sort: SortBy }) => void;
};

export const MobileFilters: React.FC<Props> = ({ maxPrice, brands, setIsFiltersOpen, setFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const brand = searchParams.get('brand') || 'All brands';
  const price = Number(searchParams.get('price')) || maxPrice;
  const sort = searchParams.get('sortBy') || SortBy.Alphabetically;

  const [queryValue, setQueryValue] = useState(query);
  const [selectedBrand, setSelectedBrand] = useState(brand);
  const [selectedPrice, setSelectedPrice] = useState(price);
  const [selectedSort, setSelectedSort] = useState(sort);

  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
      <div
        className="
          absolute 
          bottom-0 
          left-0 
          right-0 
          max-h-screen
          overflow-y-auto
          rounded-t-3xl 
          bg-white 
          px-6 
          py-6
        "
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Filter Search</h2>

          <button onClick={() => setIsFiltersOpen(false)}>✕</button>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase text-[#737686]">Search</p>

            <div className="relative">
              <img src={Search} alt="Search" className="absolute left-4 top-1/2 -translate-y-1/2" />

              <input
                value={queryValue}
                onChange={(e) => setQueryValue(e.target.value)}
                placeholder="Search vehicle title..."
                className="h-12 w-full rounded-xl border px-10"
              />
            </div>
          </div>

          <div className="relative w-full">
            <p className="mb-2 text-xs font-semibold uppercase text-[#737686]">Brand</p>

            <button
              type="button"
              onClick={() => setIsBrandOpen((prev) => !prev)}
              className="flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 text-left"
            >
              <span>{selectedBrand}</span>

              <svg
                className={`h-5 w-5 transition-transform ${isBrandOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isBrandOpen && (
              <div className="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border bg-white shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBrand('All brands');
                    setIsBrandOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-100"
                >
                  All brands
                </button>

                {brands.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => {
                      setSelectedBrand(brand);
                      setIsBrandOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-100 ${
                      selectedBrand === brand ? 'bg-blue-50 font-semibold text-blue-600' : ''
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-[#737686]">Price Range: {selectedPrice}</p>

            <input
              type="range"
              min={0}
              max={maxPrice}
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(Number(e.target.value))}
              className="w-full accent-[#004AC6]"
            />
          </div>

          <div className="relative w-full">
            <p className="mb-2 text-xs font-semibold uppercase text-[#737686]">Sort By</p>

            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 text-left"
            >
              <span>{selectedSort}</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`h-5 w-5 transition-transform ${isSortOpen ? 'rotate-180' : ''}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isSortOpen && (
              <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border bg-white shadow-lg">
                {Object.values(SortBy).map((sort) => (
                  <button
                    key={sort}
                    type="button"
                    onClick={() => {
                      setSelectedSort(sort);
                      setIsSortOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left transition-colors hover:bg-gray-100 ${
                      selectedSort === sort ? 'bg-blue-50 font-semibold text-blue-600' : ''
                    }`}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => {
              setQueryValue('');
              setSelectedBrand('All brands');
              setSelectedPrice(maxPrice);
              setSelectedSort(SortBy.Alphabetically);

              setFilters({
                query: '',
                brand: 'All brands',
                price: maxPrice,
                sort: SortBy.Alphabetically,
              });

              setSearchParams({});
              setIsFiltersOpen(false);
            }}
            className="h-12 flex-1 rounded-xl border"
          >
            Reset
          </button>

          <button
            onClick={() => {
              setFilters({
                query: queryValue,
                brand: selectedBrand,
                price: selectedPrice,
                sort: selectedSort as SortBy,
              });

              const newSearch = getSearchWith(searchParams, {
                query: queryValue,
                brand: selectedBrand,
                price: String(selectedPrice),
                sortBy: selectedSort,
              });

              setIsFiltersOpen(false);
              setSearchParams(newSearch);
            }}
            className="h-12 flex-1 rounded-xl bg-[#004AC6] text-white"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
