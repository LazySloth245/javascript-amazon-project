function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
  
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },
  
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
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
    },
  
    removeFromCart(productId) {
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem)
        }
      });
    
      this.cartItems = newCart;
      
      this.saveToStorage();
    },
  
    calculateCartQuantity() {
      let cartQuantity = 0;
    
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      })
    
      return cartQuantity;
    },
  
    updateQuantity(productId, newQuantity) {
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity = newQuantity;
        };
      });
    
      this.saveToStorage();
    },
  
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
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

cart.addToCart('sample-product');
businessCart.addToCart('sample-business-product');

console.log(cart);
console.log(businessCart);