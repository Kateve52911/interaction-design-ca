import { getCartOrEmptyCart } from './utility/utils.js';

/**
 * Updates the cart counter in the header based on the contents of the shopping cart
 */
export function updateCartCounter() {
    let cart = getCartOrEmptyCart();
    const cartCounter = document.getElementById('cart-counter');

    // Calculate total quantity of items in the cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Update the cart counter
    cartCounter.textContent = totalItems;
}