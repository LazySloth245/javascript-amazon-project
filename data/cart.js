export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  });

  cart = newCart;
  
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    };
  });

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      cartItem.deliveryOptionId = deliveryOptionId;
    }
  });

  saveToStorage();
}