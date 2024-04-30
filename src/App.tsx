import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>The beginning...</h1>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
