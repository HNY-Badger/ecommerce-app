export type CartActions =
  | 'addLineItem'
  | 'removeLineItem'
  | 'addDiscountCode'
  | 'removeDiscountCode'
  | 'changeLineItemQuantity';

export type CartBody<T extends CartActions> = T extends 'addLineItem'
  ? { productId: string; quantity: number }
  : T extends 'removeLineItem' | 'changeLineItemQuantity'
    ? { lineItemId: string; quantity: number }
    : T extends 'addDiscountCode'
      ? { code: string }
      : T extends 'removeDiscountCode'
        ? {
            discountCode: {
              id: string;
              typeId: 'discount-code';
            };
          }
        : never;

export type UpdateCart<T extends CartActions> = {
  action: T;
} & CartBody<T>;

export type UpdateCartParams<T extends CartActions> = {
  id: string;
  data: {
    version: number;
    actions: UpdateCart<T>[];
  };
};

export type CartThunkPayload<T extends CartActions> = {
  id: string;
  version: number;
  actionBody: CartBody<T>;
};
