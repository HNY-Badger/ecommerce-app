import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout/MainLayout';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import DetailedProductPage from './pages/DetailedProductPage/DetailedProductPage';
import BasketPage from './pages/BasketPage/BasketPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="category/:id" element={<CatalogPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="product/:id" element={<DetailedProductPage />} />
          <Route path="basket" element={<BasketPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
