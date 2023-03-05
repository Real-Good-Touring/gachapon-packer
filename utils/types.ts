export class Box {
  isLarge: boolean;
  target: number;
  items: Product[];
  size: Size;
  constructor(isLarge = false) {
    this.isLarge = isLarge;
    this.target = isLarge ? 125 : 60;
    this.items = [];
    this.size = "N/A";
  }

  isTargetReached() {
    return this.getValue() >= this.target;
  }

  getValue() {
    return this.items.reduce((t, x) => x.price + t, 0);
  }

  getRemainingValue() {
    return this.target - this.getValue();
  }

  toString() {
    let q = `$${this.getValue()}/$${this.target} - ${this.size} - ${this.items
      .map((x) => x.description)
      .toString()}`;
    return q;
  }

  tryAddShirt(shirt: Product) {
    // avoid adding non-shirts
    if (shirt == null) {
      console.error("shirt is null");
      return false;
    }
    if (shirt.category !== "Shirt") {
      console.error("shirt is not a shirt" + " - " + shirt.description);
      return false;
    }

    // avoid adding multiple sizes to shirt
    if (this.size !== "N/A" && shirt.size !== this.size) {
      console.error("shirt size does not match box size");
      return false;
    }

    // avoid dupes
    if (this.items.some((x) => x.description == shirt.description)) {
      console.error("shirt is a duplicate");
      return false;
    }

    // don't add if it would leave us with more than 3 shirts
    if (this.items.filter((x) => x.category == "Shirt").length >= 3) {
      console.error("shirt would exceed 3 shirts");
      return false;
    }

    // success
    this.size = shirt.size;
    this.items.push(shirt);
    return true;
  }
}

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

export class Product {
  constructor(
    desc: string,
    price: number,
    qty = 0,
    size = "N/A" as Size,
    isSpecial = false,
    category: "Shirt" | "Accessory" | "Special Accessory"
  ) {
    this.description = desc;
    this.price = price;
    this.quantity = qty;
    this.size = size;
    this.category = category;
    this.isSpecial = isSpecial;
  }

  description: string;
  price: number;
  quantity: number;
  size: Size;
  isSpecial: boolean;
  category: "Shirt" | "Accessory" | "Special Accessory";

  toString() {
    return `${this.description} - ${this.size} - ${this.quantity} left`;
  }
}

// export default class Gachapon {
//   isLarge: boolean;
//   target: number;
//   items: Product[];
//   size: Size;

//   constructor(isLarge = true) {
//     this.isLarge = isLarge;
//     this.target = isLarge ? 125 : 60;
//     this.items = [];
//     this.size = "N/A";
//   }

//   isTargetReached() {
//     return this.getValue() >= this.target;
//   }

//   getValue() {
//     return this.items.reduce((t, x) => x.price + t, 0);
//   }

//   getRemainingValue() {
//     return this.target - this.getValue();
//   }

//   toString() {
//     // pretty print a summary of this gachapon box
//     const items = this.items.map((x) => x.description).join(", ");
//     const value = this.getValue();
//     const remaining = this.getRemainingValue();
//     const size = this.size;
//     const isLarge = this.isLarge;
//     const sizeString = isLarge ? "Large" : "Small";
//     const targetString = isLarge ? "125" : "60";
//     const sizeString2 = size == "N/A" ? "" : ` (${size})`;
//     // include how many of each category are in the box
//     const shirtCount = this.items.filter((x) => x.category == "Shirt").length;
//     const accessoryCount = this.items.filter(
//       (x) => x.category == "Accessory"
//     ).length;

//     return `${sizeString} Gachapon (${targetString} target): ${items} (${value} / ${remaining} remaining)${sizeString2}
//     (${shirtCount} shirts, ${accessoryCount} accessories)`;
//     return;
//   }

//   tryAddShirt(shirt: Product) {
//     // avoid adding non-shirts
//     if (shirt == null) return false;
//     if (shirt.category !== "Shirt") return false;

//     // avoid adding multiple sizes to shirt
//     if (this.size !== "N/A" && shirt.size !== this.size) return false;

//     // avoid dupes
//     if (this.items.some((x) => x.description == shirt.description))
//       return false;

//     // don't add if it would leave us with more than 3 shirts
//     if (this.items.filter((x) => x.category == "Shirt").length >= 3)
//       return false;

//     // success
//     this.size = shirt.size;
//     this.items.push(shirt);
//     return true;
//   }
// }

export interface PackSummary {
  total: number;
  averageValue: string;
  boxes: Box[];
}

export interface PackResults {
  largeBoxes: PackSummary;
  largeBoxesDict: { [key in Size]: number };
  smallBoxes: PackSummary;
  smallBoxesDict: { [key in Size]: number };

  leftOverShirtsCount: number;
  leftOverShirts: { [key in Size]: number };
  leftOverAccessories: number;
  leftOverSpecialAccessories: number;

  totalValue: number;
  totalVariance: number;
}
