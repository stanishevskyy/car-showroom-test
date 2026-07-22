import { CarList } from './components/CarList';
import { HeroSection } from './components/HeroSection';

export const HomePage = () => {
  return (
    <main className="bg-[#F8F9FF]">
      <HeroSection />
      <CarList />
    </main>
  );
};
