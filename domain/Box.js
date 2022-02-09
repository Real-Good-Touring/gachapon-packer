import Product from "./Product";

export default class Box {
  constructor(isLarge = false) {
    this.isLarge = isLarge;
    this.target = isLarge ? 125 : 60;
    this.items = [];
    this.size = null;
  }

  isTargetReached() {
    return this.getValue() >= this.target;
  }

  getValue() {
    return this.items.reduce((t, x) => x.price + t, 0);
  }

  toString() {
    let q = `$${this.getValue()}/$${this.target} - ${this.size} - ${this.items
      .map((x) => x.description)
      .toString()}`;
    return q;
  }

  tryAddShirt(shirt) {
    if (shirt == null) return false;

    if (this.size && shirt.size !== this.size) {
      return false;
    }
    this.size = shirt.size;

    this.items.push(shirt);

    return true;
  }
}
