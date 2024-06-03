import React from 'react';
import { render } from '@testing-library/react';
import PriceFilter from '../../../components/CatalogPage/Filters/PriceFilter';
import '@testing-library/jest-dom';

describe('PriceFilter', () => {
  it('renders inputs with correct initial values', () => {
    const priceRange: [number, number] = [50, 150];
    const priceLimits: [number, number] = [0, 200];
    const onPriceChange = jest.fn();
    const { getByTestId } = render(
      <PriceFilter priceRange={priceRange} priceLimits={priceLimits} onPriceChange={onPriceChange} />
    );

    const minInput = getByTestId('min-slider');
    const maxInput = getByTestId('max-slider');

    expect(minInput).toHaveValue('50');
    expect(maxInput).toHaveValue('150');
  });
});
