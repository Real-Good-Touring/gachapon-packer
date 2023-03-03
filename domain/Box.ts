import Product, { Size } from "./Product";

export default class Box {
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
    if (shirt == null) return false;

    if (this.size !== "N/A" && shirt.size !== this.size) {
      return false;
    }

    // avoid dupes
    if (this.items.some((x) => x.description == shirt.description))
      return false;

    if (this.items.some((x) => x.description == shirt.description))
      return false;

    this.size = shirt.size;

    this.items.push(shirt);

    return true;
  }
}
