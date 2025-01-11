import {cart} from '../../data/cart-class.js';
import {getProduct} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate
} from '../../data/deliveryOptions.js'
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';
 
export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.cartItems.forEach((cartItem) => {
    const {productId, quantity, deliveryOptionId} = cartItem;

    const matchingProduct = getProduct(productId);

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
    <div class="cart-item-container
    js-cart-item-container
    js-cart-item-container-${productId}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name product-name-${productId}">
            ${matchingProduct.name}
          </div>
          <div class="product-price product-price-${productId}">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity
          js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${productId}">${quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${productId}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${productId}" type="number" value="${quantity}">
            <span class="save-quantity-link link-primary js-save-link"
            data-product-id="${productId}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${productId}" data-product-id="${productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(productId, deliveryOptionId)}
        </div>
      </div>
    </div>`;
  });

  function deliveryOptionsHTML(productId, deliveryOptionId) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0
      ?'FREE'
      :`$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = (deliveryOption.id === deliveryOptionId);

      html += `
        <div class="delivery-option js-delivery-option js-delivery-option-${productId}-${deliveryOption.id}"
          data-product-id="${productId}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input js-delivery-option-input-${productId}-${deliveryOption.id}"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });

    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;
      cart.removeFromCart(productId);

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);

      if (newQuantity < 1 || newQuantity >= 1000) {
        alert('Quantity must be at least 1 and less than 1000');
        return;
      }
      cart.updateQuantity(productId, newQuantity);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}