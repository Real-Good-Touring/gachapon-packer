export default function Product(
  desc,
  price,
  qty = 0,
  size = "",
  isSpecial = false
) {
  this.description = desc;
  this.price = price;
  this.size = size;
  this.isSpecial = isSpecial;
  this.quantity = qty;
}
