import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

describe('Breadcrumb', () => {
  it('renders correct number of links', () => {
    const links = [
      { name: 'Home', to: '/' },
      { name: 'Products', to: '/products' },
      { name: 'Category', to: '/products/category' },
    ];
    const { getAllByRole } = render(
      <MemoryRouter>
        <Breadcrumb links={links} />
      </MemoryRouter>
    );
    const breadcrumbLinks = getAllByRole('link');
    expect(breadcrumbLinks).toHaveLength(links.length);
  });

  it('renders links with correct attributes', () => {
    const links = [
      { name: 'Home', to: '/' },
      { name: 'Products', to: '/products' },
      { name: 'Category', to: '/products/category' },
    ];
    const { getAllByRole } = render(
      <MemoryRouter>
        <Breadcrumb links={links} />
      </MemoryRouter>
    );
    const breadcrumbLinks = getAllByRole('link');
    breadcrumbLinks.forEach((link, index) => {
      expect(link).toHaveAttribute('href', links[index].to);
      expect(link.textContent).toBe(links[index].name);
    });
  });

  it('uses NavLink component correctly', () => {
    const links = [
      { name: 'Home', to: '/' },
      { name: 'Products', to: '/products' },
      { name: 'Category', to: '/products/category' },
    ];
    const { getAllByRole } = render(
      <MemoryRouter>
        <Breadcrumb links={links} />
      </MemoryRouter>
    );
    const breadcrumbLinks = getAllByRole('link');
    breadcrumbLinks.forEach((link) => {
      expect(link.tagName).toBe('A');
    });
  });
});
