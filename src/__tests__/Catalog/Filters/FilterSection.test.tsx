import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterSection from '../../../components/CatalogPage/Filters/FilterSection';

describe('FilterSection', () => {
  it('renders with correct heading and children', () => {
    const heading = 'Price';
    const children = <div>Mock Children</div>;
    const { getByText, getByTestId } = render(<FilterSection heading={heading}>{children}</FilterSection>);

    const headingElement = getByText(heading);
    const filterSection = getByTestId('filter-section');

    expect(headingElement).toBeInTheDocument();
    expect(filterSection).toBeInTheDocument();
    expect(filterSection).toContainElement(filterSection.querySelector('div'));
  });
});
