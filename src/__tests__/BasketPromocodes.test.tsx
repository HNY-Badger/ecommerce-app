import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import BasketPromocodes from '../pageComponents/BasketPage/BasketPromocodes/BasketPromocodes';
import { store, RootState } from '../store/store';

describe('BasketPromocodes Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renders spinner while loading', () => {
    jest.mock('../store/hooks/redux', () => ({
      useAppDispatch: () => jest.fn(),
      useAppSelector: (selector: (state: RootState) => unknown) =>
        selector({
          promocodesReducer: {
            data: null,
            loading: true,
            error: '',
          },
          cartReducer: {
            data: null,
          },
        } as RootState),
    }));

    render(
      <Provider store={store}>
        <BasketPromocodes />
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('Renders error message', () => {
    jest.mock('../store/hooks/redux', () => ({
      useAppDispatch: () => jest.fn(),
      useAppSelector: (selector: (state: RootState) => unknown) =>
        selector({
          promocodesReducer: {
            data: null,
            loading: false,
            error: '',
          },
          cartReducer: {
            data: null,
          },
        } as RootState),
    }));

    render(
      <Provider store={store}>
        <BasketPromocodes />
      </Provider>
    );

    const incrementButton = screen.getByRole('button', { name: 'Apply' });
    fireEvent.click(incrementButton);

    expect(screen.getByText('Add at least one symbol')).toBeInTheDocument();
  });
});
