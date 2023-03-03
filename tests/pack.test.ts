import { Product, Sizes } from "../utils/types";
import pack from "../packAlgorithm";

test("Sizes type works", () => {
  const p: Product = {
    description: "test",
    price: 1,
    size: "S",
    category: "Shirt",
    quantity: 1,
  };

  expect(Sizes[0] as string).toBe("S");
  expect(p.size).toBe("S");
});

test("pack algorithm works", () => {
  const products: Product[] = [
    {
      description: "test",
      price: 1,
      size: "S",
      category: "Shirt",
      quantity: 1,
    },
  ];
  const result = pack();
  expect(result).toBe("test");
});
