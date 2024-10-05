import { getCartOrEmptyCart } from './utility/utils.js';
import { initializeCartQuantities, removeFromCart, addToCart } from './shoppingCart.js';

document.addEventListener('DOMContentLoaded', () => {
    const cart = getCartOrEmptyCart();
    updateCartDisplay(cart);
});

/**
 * Updates the checkout display, showing the items in the cart and allowing quantity changes.
 * @param {*} cart - the current cart items.
 */
function updateCartDisplay(cart) {
    initializeCartQuantities(cart); // Initialize quantities before rendering

    const cartContainer = document.querySelector('#cart-items')

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        const totalCost = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        cartContainer.innerHTML = cart.map(item =>
            `<div class="cart-item-preview" data-id="${item.id}">
                <div class="details-checkout-preview">
                    <div><img src="${item.image.url}" alt="${item.title}" class="gameimage-checkout-cart-preview"></div>
                    <div><h2">${item.title}</h2></div>
                    <div><p>$${item.price}</p></div>
                    <div class="buttons-checkout-details">
                        <button class="minus"> - </button>
                        <span> ${item.quantity} </span>
                        <button class="pluss"> + </button>
                    </div>
                </div>
            </div>`
        ).join('');

        cartContainer.innerHTML += `<div class="total-cost">
        <h3>Total Cost: $${totalCost.toFixed(2)}</h3>
        </div>`;

        cartContainer.innerHTML += `<div class="checkout-button-preview"><a href="checkout-page.html" class="checkout-button">Checkout</a></div>`
    }

    // Event listeners for increasing quantity
    document.querySelectorAll('.pluss').forEach(button => {
        button.addEventListener('click', function () {
            const itemId = this.parentElement.parentElement.parentElement.getAttribute('data-id');
            const item = cart.find(item => item.id === itemId);
            addToCart(item);  // Increase the quantity
        });
    });

    // Event listeners for decreasing quantity
    document.querySelectorAll('.minus').forEach(button => {
        button.addEventListener('click', function () {
            const itemId = this.parentElement.parentElement.parentElement.getAttribute('data-id');
            removeFromCart(itemId);  // Decrease the quantity or remove item
        });
    });
}