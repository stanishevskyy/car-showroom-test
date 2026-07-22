import { NavLink } from 'react-router-dom';

import Menu from '@/assets/icons/header-icons/menu.svg';
import Search from '@/assets/icons/header-icons/search.svg';

export const Header = () => {
  return (
    <header className="flex items-center justify-between w-full px-4 lg:px-10 py-4 border-b border-[#C3C6D7] bg-[#F8F9FF]">
      <button className="p-[10px_8px] mr-6 lg:hidden">
        <img className="w-[18px] h-[12px]" src={Menu} alt="Menu" />
      </button>

      <h1
        className="
      mr-[60px] lg:mr-0
      font-bold
      text-[32px] lg:text-[48px]
      leading-[40px] lg:leading-[56px]
      tracking-[-0.8px] lg:tracking-[-0.96px]
      text-[#004AC6]
    "
      >
        Car Showroom
      </h1>

      <nav className="hidden lg:flex">
        <ul className="flex gap-8 font-inter font-semibold text-[14px] text-[#434655] leading-[20px] tracking-[0.7px]">
          <li>
            <NavLink to="/">Inventory</NavLink>
          </li>
          <li>
            <NavLink to="/">Sell</NavLink>
          </li>
          <li>
            <NavLink to="/">Financing</NavLink>
          </li>
          <li>
            <NavLink to="/">Reviews</NavLink>
          </li>
        </ul>
      </nav>

      <button className="p-[10px_8px] lg:hidden">
        <img className="w-[18px] h-[18px]" src={Search} alt="Search" />
      </button>

      <div className="hidden lg:block relative w-[248px]">
        <img className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px]" src={Search} alt="Search" />

        <input
          className="w-full h-[41px] rounded-full pl-[48px] pr-4 py-1 border border-[#C3C6D7] bg-[#E5EEFF]"
          type="text"
          placeholder="Search models..."
        />
      </div>
    </header>
  );
};
