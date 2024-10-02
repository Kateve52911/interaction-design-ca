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


import { getCartContainer, getCartOrEmptyCart } from './utility/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = getCartContainer();

    const cart = getCartOrEmptyCart();

    updateCartDisplay(cart)
});

/**
 * Removes items or decreases the quantity from the cart if one presses button with bin icon on it. 
 * It checks to see if the list is non-empty.
 * @param {*} itemId - the id of the item that is in the list. 
 */
function removeFromCart(itemId) {
    let cart = getCartOrEmptyCart();
    const index = cart.findIndex(item => item.id === itemId);

    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;  // Decrease the quantity
        } else {
            cart.splice(index, 1);  // Remove the item if the quantity is 1
        }
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartDisplay(cart);
}

/**
 * Increases the quantity of an item in the cart.
 * @param {*} itemId - the id of the item to increase the quantity.
 */
function addToCart(itemId) {
    let cart = getCartOrEmptyCart();
    const index = cart.findIndex(item => item.id === itemId);

    if (index !== -1) {
        cart[index].quantity += 1;  // Increase the quantity
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartDisplay(cart);
}

/**
 * Creates the HTMl for the checkout page. Also calculates the total cost. 
 * Also listens for an event where one adjusts the quantity of an item.
 * @param {*} cart - where the items are stored. 
 */
function updateCartDisplay(cart) {
    const cartContainer = getCartContainer();

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        const totalCost = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        cartContainer.innerHTML = cart.map(item =>
            `<div class="cart-item" data-id="${item.id}">
                <img src="${item.image.url}" alt="${item.title}" class="gameimage-checkout">
                <div class="details-checkout">
                    <h2>${item.title}</h2>
                    <p>${item.genre}</p>
                    <p>$${item.price} x ${item.quantity}</p>
                    <div class="quantity-controls">
                        <button type="button" class="cta-decrease">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button type="button" class="cta-increase">+</button>
                    </div>
                    <button type="button" class="cta-delete"><i class="fa-solid fa-trash-can" style="color: #feffff;"></i></button>
                </div>
            </div>`
        ).join('');

        cartContainer.innerHTML += `<div class="total-cost">
        <h3>Total Cost: $${totalCost.toFixed(2)}</h3>
        </div>`;
    }

    // Event listeners for quantity adjustment
    document.querySelectorAll('.cta-increase').forEach(button => {
        button.addEventListener('click', function () {
            const itemId = this.parentElement.parentElement.parentElement.getAttribute('data-id');
            addToCart(itemId);  // Increase the quantity
        });
    });

    document.querySelectorAll('.cta-decrease').forEach(button => {
        button.addEventListener('click', function () {
            const itemId = this.parentElement.parentElement.parentElement.getAttribute('data-id');
            removeFromCart(itemId);  // Decrease the quantity or remove item if quantity is 1
        });
    });

    // Event listeners for removing items completely
    document.querySelectorAll('.cta-delete').forEach(button => {
        button.addEventListener('click', function () {
            const itemId = this.parentElement.parentElement.getAttribute('data-id');
            removeCompletelyFromCart(itemId);  // Remove the item completely
        });
    });
}

/**
 * Removes the item completely from the cart.
 * @param {*} itemId - the id of the item to remove from the cart.
 */
function removeCompletelyFromCart(itemId) {
    let cart = getCartOrEmptyCart();
    const index = cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cart.splice(index, 1);  // Remove the item
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartDisplay(cart);
}

