import { Box, Product, Sizes } from "../utils/types";
import pack from "../pack";

// test("Sizes type works", () => {
//   const p: Product = {
//     description: "test",
//     price: 1,
//     size: "S",
//     category: "Shirt",
//     quantity: 1,
//   };

//   expect(Sizes[0] as string).toBe("S");
//   expect(p.size).toBe("S");
// });

// test("pack algorithm works", () => {
//   const products: Product[] = [
//     {
//       description: "test",
//       price: 1,
//       size: "S",
//       category: "Shirt",
//       quantity: 1,
//     },
//   ];
//   const result = pack();
//   expect(result).toBe("test");
// });

const cases = [
  [0, 10, 0],
  [1, 10, 5],
  [2, 10, 7],
  [3, 10, 8],
  [4, 10, 8],
  [9, 10, 9],
];

describe("pack algo", () => {
  test.each(cases)("ratio works", (ratioDenom, max, expectedLarge) => {
    const boxes: Box[] = [];
    for (let i = 0; i < max; i++) {
      const isLarge = i % ratioDenom === 0;
      boxes.push(new Box(isLarge));
    }

    // expect total large boxes to be 3
    expect(boxes.filter((b) => b.isLarge).length).toBe(expectedLarge);
  });
});
