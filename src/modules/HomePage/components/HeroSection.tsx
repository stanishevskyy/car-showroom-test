import QualityBadge from '@/assets/icons/hero-icons/quality-badge.svg';
import HeroCar from '@/assets/images/hero-images/hero-car.png';

export const HeroSection = () => {
  return (
    <section className="relative py-8 px-4 lg:px-10 lg:py-35.25 lg:bg-cover lg:bg-center lg:bg-[url('@/assets/images/hero-images/hero-bg.png')]">
      <div className="absolute inset-0 hidden lg:block bg-[linear-gradient(90deg,rgba(248,249,255,0.9)_0%,rgba(248,249,255,0)_100%)]" />

      <div className="relative flex flex-col gap-4 ">
        <div className="flex gap-2 items-center w-full py-1 px-3 bg-[#E5EEFF] rounded-full lg:hidden">
          <img className="block w-4 h-4" src={QualityBadge} alt="Quality Badge" />
          <p className="font-semibold text-sm text-[#004AC6] leading-5 tracking-[0.7px] uppercase">PREMIUM CERTIFIED</p>
        </div>

        <h1 className="font-inter font-bold text-[#0B1C30] text-[32px] leading-10 tracking-[-0.32px] lg:text-[48px] lg:leading-14 lg:tracking-[-0.96px]">
          Engineered for Excellence.
        </h1>

        <p className="font-inter font-normal text-[16px] text-[#434655] lg:text-[18px] leading-6elg:leading-7ax-w-2xl">
          Discover a curated collection of high-performance vehicles and luxury cruisers designed for the discerning
          driver.
        </p>

        <img className="rounded-2xl lg:hidden" src={HeroCar} alt="" />
        <div className="flex flex-col gap-4 lg:flex-row">
          <button className="h-16 w-full rounded-[14px] bg-[#2563EB] px-8 text-2xl font-semibold text-white lg:h-14 lg:w-48 lg:rounded-xl lg:px-6 lg:text-base">
            View Inventory
          </button>

          <button className="h-16 w-full rounded-[14px] border border-[#2563EB] px-8 text-2xl font-semibold text-[#2563EB] lg:h-14 lg:w-48 lg:rounded-xl lg:px-6 lg:text-base">
            Sell Your Car
          </button>
        </div>
      </div>
    </section>
  );
};
