import { getCartContainer, getCartOrEmptyCart } from './utility/utils.js';

const containerSuccess = document.querySelector(".checkout-container-success")

/**
 * This selects the container in which the elements should be displayed.
 * Retrieves items from local storage or an empty list.
 * Calls a function to render the cart items and the total cost into a selected container. 
 */
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = getCartContainer();
    const cart = getCartOrEmptyCart();

    displayCartItems(cart, cartContainer);
});

/**
 * Displays the items that where in the container on the checkout page so customer can see what they bought.
 * But they cannot remove items. 
 * @param {*} cart - the items that are in local storage.  
 */
function displayCartItems(cart) {
    const totalCost = cart.reduce((acc, item) => acc + item.price, 0);
    containerSuccess.innerHTML = cart.map(item =>
        `<div class="cart-item" data-id="${item.id}">
                <img src="${item.image.url}" alt="${item.title}" class="gameimage-checkout">
                <div class="details-checkout">
                    <h2>${item.title}</h2>
                    <p>${item.genre}</p>
                    <p>$${item.price}</p>
                </div>
            </div>`
    ).join('');

    containerSuccess.innerHTML += `<div class="total-cost">
            <h3>Total Cost: $${totalCost.toFixed(2)}</h3>
        </div>`;
}

