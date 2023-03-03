export const Sizes = [
  "S",
  "M",
  "L",
  "XL",
  "2X",
  "3X",
  "4X",
  "5X",
  "N/A",
] as const;
export type Size = typeof Sizes[number];

export default class Product {
  constructor(
    desc: string,
    price: number,
    qty = 0,
    size = "N/A" as Size,
    isSpecial = false
  ) {
    this.description = desc;
    this.price = price;
    this.quantity = qty;
    this.size = size;
    this.isSpecial = isSpecial;
  }

  description: string;
  price: number;
  quantity: number;
  size: Size;
  isSpecial: boolean;

  toString() {
    return `${this.description} - ${this.size} - ${this.quantity} left`;
  }
}
