
const messageContainer = document.querySelector(".message-container");
const message = createMessage();

/**
 * This is a function that calls to the API. 
 * It adds it to a variable called gameData which is used through the page. 
 */
export async function getGameDetails(url = "https://v2.api.noroff.dev/gamehub/") {
    try {
        const response = await fetch(url);
        const results = await response.json();
        const gameData = results.data;

        return gameData;
    }
    catch (error) {
        messageContainer.innerHTML = message;
    };

}
getGameDetails();

/**
 * This is to create an error message is there is something wrong with the API call. 
 * @param {*} type - the type of message it is.
 * @param {*} message - what the message should say.
 * @returns an error message
 */
export function createMessage(type = "success", message = "No message") {
    const HTML = `<div class="message ${type}">${message}</div>`;
    return HTML;
};

/**
 * This function grabs the shopping-cart container. 
 * @returns - the shopping cart that is used in the checkout process. 
 */
export function getCartContainer() {
    return document.querySelector('.cart-container');
}

/**
 * This retrives the information in the local storage and parses it into a string
 * @returns this returns either the information in the local storage or an empty string. 
 */
export function getCartOrEmptyCart() {
    return JSON.parse(localStorage.getItem('shoppingCart')) || [];
}