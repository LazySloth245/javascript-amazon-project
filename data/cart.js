export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

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