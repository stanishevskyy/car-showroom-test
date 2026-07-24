export const Footer = () => {
  return (
    <footer className="border-t border-[#C3C6D7] bg-[#EFF4FF] px-4 py-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
      <section className="flex flex-col gap-2">
        <h2 className="text-[24px] font-semibold leading-8 tracking-[-0.24px] text-[#0B1C30]">Car Showroom</h2>

        <p className="text-[16px] font-normal leading-6 text-[#434655] lg:hidden">
          The pinnacle of automotive retail.
        </p>

        <small className="hidden text-[14px] font-semibold leading-5 tracking-[0.7px] text-[#434655] lg:block">
          © 2024 Car Showroom. Engineered for Excellence.
        </small>
      </section>

      <small className="mt-8 block text-[14px] font-semibold leading-5 tracking-[0.7px] text-[#434655] lg:hidden">
        © 2024 Car Showroom. Engineered for Excellence.
      </small>
    </footer>
  );
};
