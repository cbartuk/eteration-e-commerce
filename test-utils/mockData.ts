import { faker } from "@faker-js/faker";

export const generateMockProductData = (productCount: number) => {
  const products = [];

  for (let i = 0; i < productCount; i++) {
    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.url(),
      description: faker.commerce.productDescription(),
      brand: faker.company.name(),
      model: faker.vehicle.model(),
    });
  }

  return products;
};
