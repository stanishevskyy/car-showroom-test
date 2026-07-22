import { HashRouter, Route, Routes } from 'react-router-dom';

import { App } from './App.tsx';
import { HomePage } from './modules/HomePage/HomePage.tsx';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
