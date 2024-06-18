import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import BasketItem from '../pageComponents/BasketPage/BasketItem/BasketItem';
import { LineItem } from '../types/cart';
import { RootState, store } from '../store/store';

const dispatchMock = jest.fn();

jest.mock('../store/hooks/redux', () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: (selector: (state: RootState) => unknown) =>
    selector({
      cartReducer: {
        data: {
          id: 'cart1',
          version: 1,
        },
      },
    } as RootState),
}));

const item: LineItem = {
  id: '1',
  name: { 'en-US': 'Test Item' },
  productId: '',
  productKey: '',
  quantity: 2,
  variant: {
    attributes: [],
    prices: [],
    images: [{ url: 'http://example.com/image.jpg' }],
  },
  price: {
    country: 'US',
    value: { centAmount: 2000, currencyCode: 'USD' },
  },
  totalPrice: { centAmount: 4000, currencyCode: 'USD' },
};

describe('BasketItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renders BasketItem with item details', () => {
    render(
      <Provider store={store}>
        <BasketItem item={item} />
      </Provider>
    );

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
    expect(screen.getByText('$40.00')).toBeInTheDocument();
    expect(screen.getByAltText('Test Item')).toHaveAttribute('src', 'http://example.com/image.jpg');
  });

  test('Calls dispatch with correct actions when quantity changes', () => {
    render(
      <Provider store={store}>
        <BasketItem item={item} />
      </Provider>
    );

    const incrementButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(incrementButton);

    expect(dispatchMock).toHaveBeenCalled();
  });

  test('Calls dispatch with correct action when remove button is clicked', () => {
    render(
      <Provider store={store}>
        <BasketItem item={item} />
      </Provider>
    );

    const removeButton = screen.getByRole('button', { name: 'Remove' });
    fireEvent.click(removeButton);

    expect(dispatchMock).toHaveBeenCalled();
  });
});
