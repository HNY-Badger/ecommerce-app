import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<h1>The beginning...</h1>} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
