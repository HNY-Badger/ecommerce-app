import React from 'react';
import { render } from '@testing-library/react';
import Categories from '../../../pageComponents/CatalogPage/Categories/Categories';
import '@testing-library/jest-dom';
import { Category } from '../../../types/products';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Categories', () => {
  it('displays categories correctly', () => {
    const categories: Category[] = [
      { id: '1', name: 'Category 1', subcategories: [{ id: '3', name: 'Subcategory 1', parent: '1' }] },
      { id: '2', name: 'Category 2', subcategories: [{ id: '4', name: 'Subcategory 2', parent: '2' }] },
    ];
    const { getByText } = render(<Categories categories={categories} />);

    categories.forEach((category) => {
      expect(getByText(category.name)).toBeInTheDocument();
      category.subcategories.forEach((subcategory) => {
        expect(getByText(subcategory.name)).toBeInTheDocument();
      });
    });
  });
});
