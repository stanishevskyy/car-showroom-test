import { Outlet } from 'react-router-dom';
import { Header } from './shared/components/Header';

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
