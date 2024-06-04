import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DualRangeSlider from '../components/DualRangeSlider/DualRangeSlider';

describe('DualRangeSlider', () => {
  it('renders with correct min and max values', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<DualRangeSlider minValue={20} maxValue={80} onChange={handleChange} />);
    const minSlider = getByTestId('min-slider') as HTMLInputElement;
    const maxSlider = getByTestId('max-slider') as HTMLInputElement;

    expect(minSlider.value).toBe('20');
    expect(maxSlider.value).toBe('80');
  });

  it('calls onChange with correct values when sliders are adjusted', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<DualRangeSlider minValue={20} maxValue={80} onChange={handleChange} />);
    const minSlider = getByTestId('min-slider') as HTMLInputElement;
    const maxSlider = getByTestId('max-slider') as HTMLInputElement;

    fireEvent.change(minSlider, { target: { value: '30' } });
    expect(handleChange).toHaveBeenCalledWith(30, 80);

    fireEvent.change(maxSlider, { target: { value: '70' } });
    expect(handleChange).toHaveBeenCalledWith(20, 70);
  });
});
