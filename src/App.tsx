import { Outlet } from 'react-router-dom';

import { Header } from './shared/components/Header';
import { Footer } from './shared/components/Footer';

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
