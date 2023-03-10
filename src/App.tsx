import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavigationPath from './routes/NavigationPath';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container-lg">
          <Routes>
            {NavigationPath.map((el) => (
              <Route path={el.path} element={<el.component />} key={el.path} />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
