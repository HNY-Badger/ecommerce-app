import { CentPrecisionMoney, ProductPrice, ProductVariant } from './products';
import { CartBody } from './updateCart';

export type DiscountCode = {
  id: string;
  version: number;
  name: {
    ['en-US']: string;
  };
  description: {
    ['en-US']: string;
  };
  code: string;
};

export type DiscountCodeReference = {
  id: string;
  obj: DiscountCode;
};

export type DiscountCodeInfo = {
  discountCode: DiscountCodeReference;
};

export type LineItem = {
  id: string;
  productId: string;
  productKey: string;
  name: {
    ['en-US']: string;
  };
  variant: ProductVariant;
  price: ProductPrice;
  quantity: number;
  totalPrice: CentPrecisionMoney;
};

export type CartResponse = {
  id: string;
  version: number;
  customerId: string;
  anonymousId: string;
  lineItems: LineItem[];
  totalPrice: CentPrecisionMoney;
  discountOnTotalPrice?: {
    discountedAmount: {
      centAmount: number;
    };
  };
  discountCodes: DiscountCodeInfo[];
};

export type ClearCartParams = {
  id: string;
  version: number;
  items: CartBody<'removeLineItem'>[];
};
