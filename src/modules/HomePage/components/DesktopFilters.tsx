import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Search from '@/assets/icons/car-list-icons/search-filters.svg';
import ArrowDown from '@/assets/icons/car-list-icons/arrow-down.svg';

import { SortBy } from '@/shared/constants/sortBy';
import { getSearchWith } from '@/shared/utils/getSearchWith';

type Props = {
  maxPrice: number;
  brands: string[];
  filters: { query: string; brand: string; price: number; sort: SortBy };
  setFilters: (value: { query: string; brand: string; price: number; sort: SortBy }) => void;
};

export const DesktopFilters: React.FC<Props> = ({ maxPrice, brands, setFilters }) => {
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
    <div className="hidden lg:block px-10 py-8">
      <div className="flex items-end gap-6 rounded-xl border border-[#C3C6D7] bg-[#EFF4FF] px-6 py-6 shadow-[0_1px_2px_0_#0000000D]">
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-[16px] leading-6 text-[#565E74]">Search</p>

          <div className="relative h-10.5 w-full">
            <img src={Search} alt="" className="absolute left-4 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              value={queryValue}
              onChange={(e) => setQueryValue(e.target.value)}
              placeholder="Model or keyword"
              className="h-full w-full rounded-lg border border-[#737686] bg-white py-2.5 pr-4 pl-10 outline-none"
            />
          </div>
        </div>

        <div className="relative flex flex-1 flex-col gap-2">
          <p className="text-[16px] leading-6 text-[#565E74]">Brand</p>

          <button
            onClick={() => setIsBrandOpen((prev) => !prev)}
            onBlur={() => setIsBrandOpen(false)}
            className="cursor-pointer flex h-10.5 w-full items-center justify-between rounded-lg border border-[#737686] bg-white px-4 text-[16px] leading-6 text-[#565E74]"
          >
            <span>{selectedBrand}</span>
            <img src={ArrowDown} alt="" />
          </button>

          {isBrandOpen && (
            <ul className="absolute top-[70px] z-10 w-full rounded-lg border border-[#C3C6D7] bg-white py-2 shadow-lg">
              {brands.map((brand) => (
                <li key={brand}>
                  <button
                    type="button"
                    onMouseDown={() => {
                      setIsBrandOpen(false);
                      setSelectedBrand(brand);
                    }}
                    className="cursor-pointer w-full px-4 py-2 text-left hover:bg-[#E5EEFF]"
                  >
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-6 place-self-start">
          <p className="text-[16px] leading-6 text-[#565E74]">Price Range: {selectedPrice}</p>

          <input
            type="range"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(Number(e.target.value))}
            min={0}
            max={maxPrice}
            className="w-full cursor-grab accent-[#004AC6]"
          />
        </div>

        <div className="relative flex flex-1 flex-col gap-2">
          <p className="text-[16px] leading-6 text-[#565E74]">Sort By</p>

          <button
            onClick={() => setIsSortOpen((prev) => !prev)}
            onBlur={() => setIsSortOpen(false)}
            className="cursor-pointer flex h-10.5 w-full items-center justify-between rounded-lg border border-[#737686] bg-white px-4 text-[16px] leading-6 text-[#565E74]"
          >
            <span>{selectedSort}</span>
            <img src={ArrowDown} alt="" />
          </button>

          {isSortOpen && (
            <ul className="absolute top-[70px] z-10 w-full rounded-lg border border-[#C3C6D7] bg-white py-2 shadow-lg">
              {Object.values(SortBy).map((sortBy) => (
                <li key={sortBy}>
                  <button
                    type="button"
                    onMouseDown={() => {
                      setIsSortOpen(false);
                      setSelectedSort(sortBy);
                    }}
                    className="cursor-pointer w-full px-4 py-2 text-left hover:bg-[#E5EEFF]"
                  >
                    {sortBy}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-1 gap-2">
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

              setSearchParams(newSearch);
            }}
            className="cursor-pointer flex-1 rounded-lg bg-[#004AC6] px-4 py-2.5 text-white transition hover:bg-[#003A9E]"
          >
            Apply
          </button>

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
            }}
            className="cursor-pointer flex-1 rounded-lg border border-[#C3C6D7] bg-[#F8F9FF] px-4 py-2.5 transition hover:border-[#004AC6] hover:bg-[#E5EEFF] hover:text-[#004AC6]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
