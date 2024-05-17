import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Notification from '../Notification/Notification';

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Notification />
    </>
  );
}

export default MainLayout;
