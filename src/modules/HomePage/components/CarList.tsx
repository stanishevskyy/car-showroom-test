import type React from 'react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { CarCard } from './CarCard';

import Filters from '@/assets/icons/car-list-icons/filters.svg';
import Search from '@/assets/icons/car-list-icons/search-filters.svg';
import ArrowDown from '@/assets/icons/car-list-icons/arrow-down.svg';

import type { Vehicle } from '@/shared/types/Vehicle';
import { getSearchWith } from '@/shared/utils/getSearchWith';
import { SortBy } from '@/shared/constants/sortBy';

type Props = {
  loading: boolean;
  vehicles: Vehicle[];
};

export const CarList: React.FC<Props> = ({ loading, vehicles }) => {
  const brands = Array.from(new Set(vehicles.map((vehicle) => vehicle.brand)));
  const maxPrice = vehicles.length ? Math.max(...vehicles.map((vehicle) => vehicle.price)) : 0;

  const [searchParams, setSearchParams] = useSearchParams();
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState({
    query: '',
    brand: 'All brands',
    price: maxPrice,
    sort: SortBy.Alphabetically,
  });

  console.log(appliedFilters);

  const [queryValue, setQueryValue] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All brands');
  const [selectedPrice, setSelectedPrice] = useState(maxPrice);
  const [selectedSort, setSelectedSort] = useState(SortBy.Alphabetically);

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
  }, [appliedFilters]);

  return (
    <section className="pb-24">
      <div className="flex gap-5 px-4 py-4  border-b border-[#C3C6D7] lg:hidden">
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="flex items-center justify-center gap-2 h-[36px] rounded-full px-4 py-2 bg-[#E5EEFF] font-inter font-semibold text-[14px] leading-[20px] tracking-[0.7px] text-center"
        >
          <img src={Filters} alt="Filters" />
          Filters
        </button>
      </div>

      {isFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px] bg-white px-6 py-6">
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

              {/* Price */}
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

              {/* Sort */}
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

                  setAppliedFilters({
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
                  setAppliedFilters({
                    query: queryValue,
                    brand: selectedBrand,
                    price: selectedPrice,
                    sort: selectedSort,
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
      )}

      <div className="hidden lg:block px-10 py-8">
        <div className="flex items-center justify-between px-6 py-6 bg-[#EFF4FF] border rounded-xl border-[#C3C6D7] shadow-[0_1px_2px_0_#0000000D]">
          <div className="flex flex-col gap-2">
            <p className="font-normal text-[16px] leading-[24px] text-[#565E74]">Search</p>
            <div className="relative w-[217px] h-[41px]">
              <img src={Search} alt="" className="absolute left-4 top-1/2 -translate-y-1/2" />

              <input
                type="text"
                value={queryValue}
                onChange={(e) => setQueryValue(e.target.value)}
                placeholder="Model or keyword"
                className="w-full h-full rounded-[8px] border border-[#737686] bg-white py-[10px] pr-4 pl-10 outline-none"
              />
            </div>
          </div>

          <div className="relative flex flex-col gap-2">
            <p className="font-normal text-[16px] leading-[24px] text-[#565E74]">Brand</p>

            <button
              onClick={() => setIsBrandOpen((prev) => !prev)}
              onBlur={() => setIsBrandOpen(false)}
              className="cursor-pointer flex items-center justify-between w-[217px] h-[41px] rounded-[8px] border border-[#737686]  bg-white px-4 text-[16px] leading-[24px] text-[#565E74]"
            >
              <span>{selectedBrand}</span>
              <img src={ArrowDown} alt="" />
            </button>

            {isBrandOpen && (
              <ul className="absolute top-[70px] z-10 w-[217px] rounded-[8px] border border-[#C3C6D7] bg-white py-2 shadow-lg">
                {brands.map((brand) => (
                  <li key={brand}>
                    <button
                      type="button"
                      onMouseDown={() => {
                        setIsBrandOpen(false);
                        setSelectedBrand(brand);
                      }}
                      className="cursor-pointer w-full px-4 py-2 text-left text-[16px] leading-[24px] text-[#565E74] hover:bg-[#E5EEFF]"
                    >
                      {brand}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-normal text-[16px] leading-[24px] text-[#565E74]">Price Range: {selectedPrice}</p>

            <input
              type="range"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(Number(e.target.value))}
              min={0}
              max={maxPrice}
              className="cursor-grab w-[217px] accent-[#004AC6]"
            />
          </div>

          <div className="relative flex flex-col gap-2">
            <p className="font-normal text-[16px] leading-[24px] text-[#565E74]">Sort By</p>

            <button
              onClick={() => setIsSortOpen((prev) => !prev)}
              onBlur={() => setIsSortOpen(false)}
              className="cursor-pointer flex items-center justify-between w-[217px] h-[41px] rounded-[8px] border border-[#737686]  bg-white px-4 text-[16px] leading-[24px] text-[#565E74]"
            >
              <span>{selectedSort}</span>
              <img src={ArrowDown} alt="" />
            </button>

            {isSortOpen && (
              <ul className="absolute top-[70px] z-10 w-[217px] rounded-[8px] border border-[#C3C6D7] bg-white py-2 shadow-lg">
                {Object.values(SortBy).map((sortBy) => (
                  <li key={sortBy}>
                    <button
                      type="button"
                      onMouseDown={() => {
                        setIsSortOpen(false);
                        setSelectedSort(sortBy);
                      }}
                      className="cursor-pointer w-full px-4 py-2 text-left text-[16px] leading-[24px] text-[#565E74] hover:bg-[#E5EEFF]"
                    >
                      {sortBy}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setAppliedFilters({
                  query: queryValue,
                  brand: selectedBrand,
                  price: selectedPrice,
                  sort: selectedSort,
                });

                const newSearch = getSearchWith(searchParams, {
                  query: queryValue,
                  brand: selectedBrand,
                  price: String(selectedPrice),
                  sortBy: selectedSort,
                });

                setSearchParams(newSearch);
              }}
              className="cursor-pointer w-[133px] h-[42px] rounded-[8px] py-[9px] font-inter font-normal text-[16px] leading-[24px] text-center bg-[#004AC6] text-white transition-all duration-200 hover:bg-[#003A9E] hover:shadow-[0_4px_12px_0_#004AC633] active:scale-95"
            >
              Apply
            </button>

            <button
              onClick={() => {
                setQueryValue('');
                setSelectedBrand('All brands');
                setSelectedPrice(maxPrice);
                setSelectedSort(SortBy.Alphabetically);

                setAppliedFilters({
                  query: '',
                  brand: 'All brands',
                  price: maxPrice,
                  sort: SortBy.Alphabetically,
                });

                setSearchParams({});
              }}
              className="cursor-pointer w-[133px] h-[42px] rounded-[8px] py-[9px] font-inter font-normal text-[16px] leading-[24px] text-center bg-[#F8F9FF] text-[#0B1C30] border border-[#C3C6D7] transition-all duration-200 hover:bg-[#E5EEFF] hover:border-[#004AC6] hover:text-[#004AC6] active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <p className="px-4 pt-6 pb-4 font-semibold text-[14px] leading-[20px] tracking-[0.7px] text-[#434655] lg:hidden">
        {filteredProcuts.length} Vehicles Available
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-10 lg:pt-[49px] lg:pb-[96px]">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-[320px] rounded-xl bg-[#E5EEFF] animate-pulse" />
            ))
          : filteredProcuts.map((vehicle) => <CarCard key={vehicle.id} vehicle={vehicle} />)}
      </div>
    </section>
  );
};
