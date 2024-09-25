import { getCartContainer, getCartOrEmptyCart } from './utility/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = getCartContainer();

    const cart = getCartOrEmptyCart();

    updateCartDisplay(cart)
});

/**
 * Removes items from the cart if one presses button with bin icon on it. 
 * It checks to see if the list is non-empty.
 * @param {*} itemId - the id of the item that is in the list. 
 */
function removeFromCart(itemId) {
    let cart = getCartOrEmptyCart();
    const index = cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));

    updateCartDisplay(cart);

}

/**
 * Creates the HTMl for the checkout page. Also calculates the total cost. 
 * Also listens for an event where one removes an item from the list. After it is removed, it updates the HTML
 * @param {*} cart - where the items are stored. 
 */
function updateCartDisplay(cart) {
    const cartContainer = getCartContainer();
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        const totalCost = cart.reduce((acc, item) => acc + item.price, 0);
        cartContainer.innerHTML = cart.map(item =>
            `<div class="cart-item" data-id="${item.id}">
                <img src="${item.image.url}" alt="${item.title}" class="gameimage-checkout">
                <div class="details-checkout">
                    <h2>${item.title}</h2>
                    <p>${item.genre}</p>
                    <p>$${item.price}</p>
                    <button type="button" class="cta-delete"><i class="fa-solid fa-trash-can" style="color: #feffff;"></i></button>
                </div>
                
            </div>`
        ).join('');

        cartContainer.innerHTML += `<div class="total-cost">
        <h3>Total Cost: $${totalCost.toFixed(2)}</h3>
        </div>`;
    };

    document.querySelectorAll('.cta-delete').forEach(button => {
        button.addEventListener('click', function () {
            const itemId = this.parentElement.parentElement.getAttribute('data-id');
            removeFromCart(itemId);
        })
    });
};

