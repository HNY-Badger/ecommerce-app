import productsToFilterData from '../data/Filters/productsToFilterData';
import { FilterData, Product } from '../types/products';

type TestData = {
  products: Product[];
  filterData: FilterData;
};

test('Function productsToFilterData works', () => {
  const tests: TestData[] = [
    {
      products: [
        {
          id: '1',
          categoryId: 'cat1',
          name: 'Smartphone A',
          description: 'Description of Smartphone A',
          attributes: [
            { name: 'Brand', value: 'BrandA' },
            { name: 'Storage', value: '64GB' },
          ],
          images: ['image1.jpg'],
          price: { centValue: 50000, currencyCode: 'USD' },
        },
        {
          id: '2',
          categoryId: 'cat1',
          name: 'Smartphone B',
          description: 'Description of Smartphone B',
          attributes: [
            { name: 'Brand', value: 'BrandB' },
            { name: 'Storage', value: '128GB' },
          ],
          images: ['image2.jpg'],
          price: { centValue: 70000, currencyCode: 'USD' },
        },
      ],
      filterData: {
        attributes: [
          {
            name: 'Brand',
            values: new Map([
              ['BrandA', false],
              ['BrandB', false],
            ]),
          },
          {
            name: 'Storage',
            values: new Map([
              ['64GB', false],
              ['128GB', false],
            ]),
          },
        ],
        minCentPrice: 50000,
        maxCentPrice: 70000,
      },
    },
    {
      products: [
        {
          id: '3',
          categoryId: 'cat2',
          name: 'Laptop A',
          description: 'Description of Laptop A',
          attributes: [
            { name: 'Brand', value: 'BrandA' },
            { name: 'RAM', value: '8GB' },
          ],
          images: ['image3.jpg'],
          price: { centValue: 120000, currencyCode: 'USD' },
        },
        {
          id: '4',
          categoryId: 'cat2',
          name: 'Laptop B',
          description: 'Description of Laptop B',
          attributes: [
            { name: 'Brand', value: 'BrandB' },
            { name: 'RAM', value: '16GB' },
          ],
          images: ['image4.jpg'],
          price: { centValue: 150000, currencyCode: 'USD' },
        },
      ],
      filterData: {
        attributes: [
          {
            name: 'Brand',
            values: new Map([
              ['BrandA', false],
              ['BrandB', false],
            ]),
          },
          {
            name: 'RAM',
            values: new Map([
              ['8GB', false],
              ['16GB', false],
            ]),
          },
        ],
        minCentPrice: 120000,
        maxCentPrice: 150000,
      },
    },
  ];
  // Stringify because Jest having troubles dealing with map
  tests.forEach((test) => {
    expect(JSON.stringify(productsToFilterData(test.products))).toBe(JSON.stringify(test.filterData));
  });
});
