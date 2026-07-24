import { HashRouter, Route, Routes } from 'react-router-dom';

import { App } from './App.tsx';
import { HomePage } from './modules/HomePage/HomePage.tsx';
import { ProductDetails } from './modules/ProductDetails/ProductDetails.tsx';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="vehicle/:slug" element={<ProductDetails />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
