import {addToCart, cart, loadFromStorage} from "../../data/cart.js";

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    //create a mock Input element that's used in addToCart function:
    const mockInputElement = document.createElement('input');
    mockInputElement.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    mockInputElement.value = 1;
    document.body.appendChild(mockInputElement);

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  });



  it('adds an existing product to the cart', () => {
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

    //remove the mock element:
    document.body.removeChild(mockInputElement);
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    const mockInputElement = document.createElement('input');
    mockInputElement.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    mockInputElement.value = 1;
    document.body.appendChild(mockInputElement);

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);

    document.body.removeChild(mockInputElement);
  });
});