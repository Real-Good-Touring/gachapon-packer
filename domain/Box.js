import Product from "./Product";

export default class Box {
  constructor(isLarge = false) {
    this.isLarge = isLarge;
    this.target = isLarge ? 125 : 60;
    this.items = [];
    this.size = null;
  }

  isTargetReached() {
    return this.getValue() > this.target;
  }

  getValue() {
    return this.items.reduce((x, t) => x.price + t, 0);
  }

  toString() {
    return this.getValue() + " - " + this.items;
  }

  tryAddShirt(shirt) {
    if (this.size && shirt.size !== this.size) {
      return false;
    }
    this.size = shirt.size;

    this.items.push(shirt);
  }
}
