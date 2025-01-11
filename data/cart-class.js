//class is a better way to generate objects in object-oriented programming (rather than using function)

class Cart {
  cartItems; //shortcut for cartItems = undefined;
  #localStorageKey; //private property

  //after we create an instance, constructor will run the codes inside it. this is a good usage for writing setup codes.
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  //private method:
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let productExisted = false;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        productExisted = true;
        cartItem.quantity ++;
      }
    });
  
    if (!productExisted) {
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem)
      }
    });
  
    this.cartItems = newCart;
    
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    })
  
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      };
    });
  
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    if (deliveryOptionId !== '1' && deliveryOptionId !== '2' && deliveryOptionId !== '3') {
      return;
    }
    
    let matchingItem = 0;
    
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        cartItem.deliveryOptionId = deliveryOptionId;
        matchingItem++;
      }
    });
  
    if (matchingItem === 0) {
      return;
    }
  
    this.saveToStorage();
  }
}

//"cart" and "businessCart" are called Instances of the class "Cart"
export const cart = new Cart('cart-oop');
/*
const businessCart = new Cart('cart-business');

cart.addToCart('sample-product');
businessCart.addToCart('sample-business-product');

console.log(cart);
console.log(businessCart);
*/