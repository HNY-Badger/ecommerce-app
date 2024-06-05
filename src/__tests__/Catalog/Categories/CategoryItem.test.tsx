import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CategoryItem from '../../../pageComponents/CatalogPage/Categories/CategoryItem';
import { Category } from '../../../types/products';
import '@testing-library/jest-dom';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('CategoryItem', () => {
  it('displays correct category name', () => {
    const category: Category = { id: 'cat1', name: 'Category A', subcategories: [] };
    const { getByText } = render(<CategoryItem category={category} setInactive={() => {}} />);
    const categoryButton = getByText('Category A');
    expect(categoryButton).toBeInTheDocument();
  });

  it('calls setInactive function when category or subcategory button is clicked', () => {
    const setInactive = jest.fn();
    const category: Category = { id: 'cat1', name: 'Category A', subcategories: [] };
    const { getByText } = render(<CategoryItem category={category} setInactive={setInactive} />);
    const categoryButton = getByText('Category A');
    fireEvent.click(categoryButton);
    expect(setInactive).toHaveBeenCalled();
  });
});
