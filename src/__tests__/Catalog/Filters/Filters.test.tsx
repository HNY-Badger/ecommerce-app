import React from 'react';
import { render } from '@testing-library/react';
import Filters from '../../../components/CatalogPage/Filters/Filters';
import '@testing-library/jest-dom';

describe('Filters', () => {
  it('renders with correct attributes, price range, and active state', () => {
    const attributes = [
      {
        name: 'Color',
        values: new Map<string, boolean>([
          ['Red', false],
          ['Blue', true],
        ]),
      },
      {
        name: 'Size',
        values: new Map<string, boolean>([
          ['Small', true],
          ['Large', false],
        ]),
      },
    ];
    const onAttributeCheck = jest.fn();
    const priceRange: [number, number] = [50, 150];
    const priceLimits: [number, number] = [0, 200];
    const onPriceChange = jest.fn();
    const onReset = jest.fn();
    const { getByText, getByLabelText } = render(
      <Filters
        attributes={attributes}
        onAttributeCheck={onAttributeCheck}
        priceRange={priceRange}
        priceLimits={priceLimits}
        onPriceChange={onPriceChange}
        onReset={onReset}
      />
    );

    attributes.forEach((attr) => {
      expect(getByText(attr.name)).toBeInTheDocument();
      Array.from(attr.values.entries()).forEach(([key]) => {
        expect(getByLabelText(key)).toBeInTheDocument();
      });
    });

    const resetButton = getByText('Reset');
    expect(resetButton).toBeInTheDocument();

    const closeButton = getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
  });
});
