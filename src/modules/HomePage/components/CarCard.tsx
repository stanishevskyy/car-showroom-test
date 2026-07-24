import type React from 'react';
import { Link } from 'react-router-dom';

import type { Vehicle } from '@/shared/types/vehicle';

type Props = {
  vehicle: Vehicle;
};

export const CarCard: React.FC<Props> = ({ vehicle }) => {
  return (
    <article className="group overflow-hidden rounded-xl border border-[#C3C6D7] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#004AC6] hover:shadow-[0_8px_24px_0_#004AC61A]">
      <div className="relative overflow-hidden">
        <img
          src={vehicle.thumbnail}
          alt={vehicle.title}
          className="h-54 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#004AC6] shadow-sm">
          ★ {vehicle.rating}
        </span>
      </div>

      <div className="p-5">
        <div className="flex justify-between gap-3">
          <h3 className="font-bold text-[20px] leading-7 text-[#0B1C30]">{vehicle.title}</h3>

          <div className="whitespace-nowrap text-right">
            <p className="font-bold text-[20px] leading-7 text-[#004AC6]">${vehicle.price.toFixed(2)}</p>

            <p className="text-[12px] text-[#565E74] line-through">
              ${(vehicle.price / (1 - vehicle.discountPercentage / 100)).toFixed(2)}
            </p>

            <span className="text-[12px] font-semibold text-green-600">-{vehicle.discountPercentage}%</span>
          </div>
        </div>

        <p className="mt-1 text-[14px] leading-5 text-[#565E74]">{vehicle.brand}</p>

        <p className="mt-4 line-clamp-2 text-[14px] leading-5 text-[#565E74]">{vehicle.description}</p>

        <div className="mt-4 flex gap-2">
          {vehicle.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#E5EEFF] px-3 py-1 text-[12px] font-semibold text-[#565E74]">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-[14px] text-[#565E74]">In Stock: {vehicle.stock} units</span>

          <Link
            to={`/vehicle/${vehicle.id}`}
            className="rounded-lg bg-[#DCE9FF] px-6 py-4 font-semibold  text-[14px] text-[#004AC6] transition-colors duration-200 hover:bg-[#004AC6] hover:text-white cursor-pointer"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};
