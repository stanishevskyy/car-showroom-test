export const Footer = () => {
  return (
    <footer className="border-t border-[#C3C6D7] bg-[#EFF4FF] px-4 py-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
      <section className="flex flex-col gap-2">
        <h2 className="text-[24px] font-semibold leading-[32px] tracking-[-0.24px] text-[#0B1C30]">Car Showroom</h2>

        <p className="text-[16px] font-normal leading-[24px] text-[#434655] lg:hidden">
          The pinnacle of automotive retail.
        </p>

        <small className="hidden text-[14px] font-semibold leading-[20px] tracking-[0.7px] text-[#434655] lg:block">
          © 2024 Car Showroom. Engineered for Excellence.
        </small>
      </section>

      <nav aria-label="Footer navigation">
        <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 lg:mt-0 lg:flex lg:items-center lg:gap-6">
          <li>
            <a
              className="text-[14px] font-semibold leading-[20px] tracking-[0.7px] text-[#434655] hover:text-[#0B1C30] focus:outline-none focus:ring-2 focus:ring-[#0B1C30] focus:ring-offset-2"
              href="/privacy"
            >
              Privacy Policy
            </a>
          </li>

          <li>
            <a
              className="text-[14px] font-semibold leading-[20px] tracking-[0.7px] text-[#434655] hover:text-[#0B1C30] focus:outline-none focus:ring-2 focus:ring-[#0B1C30] focus:ring-offset-2"
              href="/terms"
            >
              Terms of Service
            </a>
          </li>

          <li>
            <a
              className="text-[14px] font-semibold leading-[20px] tracking-[0.7px] text-[#434655] hover:text-[#0B1C30] focus:outline-none focus:ring-2 focus:ring-[#0B1C30] focus:ring-offset-2"
              href="/login"
            >
              Dealership Login
            </a>
          </li>

          <li>
            <a
              className="text-[14px] font-semibold leading-[20px] tracking-[0.7px] text-[#434655] hover:text-[#0B1C30] focus:outline-none focus:ring-2 focus:ring-[#0B1C30] focus:ring-offset-2"
              href="/support"
            >
              Contact Support
            </a>
          </li>
        </ul>
      </nav>

      <small className="mt-8 block text-[14px] font-semibold leading-[20px] tracking-[0.7px] text-[#434655] lg:hidden">
        © 2024 Car Showroom. Engineered for Excellence.
      </small>
    </footer>
  );
};
