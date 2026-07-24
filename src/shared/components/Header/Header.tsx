import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center  w-full px-4 lg:px-10 py-4 border-b border-[#C3C6D7] bg-[#F8F9FF]">
      <h1
        onClick={() => navigate('/')}
        className="
          cursor-pointer
          mr-15 lg:mr-0
          font-bold
          text-[32px] lg:text-[48px]
          leading-10 lg:leading-14
          tracking-[-0.8px] lg:tracking-[-0.96px]
          text-[#004AC6]
        "
      >
        Car Showroom
      </h1>
    </header>
  );
};
