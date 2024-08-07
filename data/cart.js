export const cart = [];

export function addToCart(productId) {
  const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

  let productExisted = false;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      productExisted = true;
      cartItem.quantity += quantity;
    }
  });

  if (!productExisted) {
    cart.push({
      productId,
      quantity
    });
  }
}