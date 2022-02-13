export default function Product(
  desc,
  price,
  qty = 0,
  size = "",
  isSpecial = false
) {
  this.description = desc;
  this.price = price;
  this.quantity = qty;
  this.size = size;
  this.isSpecial = isSpecial;

  this.toString = () => {
    return `${this.description} - ${this.size} - ${this.quantity} left`;
  };
}
