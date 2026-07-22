import { HashRouter, Route, Routes } from 'react-router-dom';

import { App } from './App.tsx';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </HashRouter>
  );
};
