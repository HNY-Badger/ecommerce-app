import { Response } from './products';

export type Promocode = {
  id: string;
  version: number;
  code: string;
  name: {
    ['en-US']: string;
  };
};

export type PromocodeResponse = Response<Promocode[]>;
