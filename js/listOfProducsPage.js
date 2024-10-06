import { createMessage, getGameDetails } from './utility/utils.js';

const allGamesContainer = document.querySelector(".container-games-page");
const messageContainer = document.querySelector(".message-container");
const message = createMessage("error", "An error has occured");
const gameData = await getGameDetails();

allGamesContainer.innerHTML = `<div class="spinner-games-page"></div>`
setTimeout(function () {
    createHTMLGamesPage(gameData);
}, 1000, gameData)

/**
 * Creates the HTML for the page where all the games are displayed. 
 * Creating the genre banner followed by the games of given genre.
 * @param {*} games - the different games that are in the various categories (from the API call).
 */
function createHTMLGamesPage(games) {
    const genres = ["Action", "Sports", "Adventure", "Horror"];

    let gamesHTML = "";
    for (let genre of genres) {
        gamesHTML += `<div class="genre-container">
            <h2 class="h2-title-games-page">${genre}</h2>`;
        for (let game of games) {
            if (game.genre === genre) {
                gamesHTML += `
                                            <div class="game">
                                            <h3 class="game-page-title-games">${game.title}</h3>
                                            <img class="games-page-image" src="${game.image.url}" alt = "${game.title}">
                                            <p class="price-text">$${game.price}</p>
                                            <div class="buttons-gamespage">
                                                <a href="product-page.html?id=${game.id}" class="cta-gamespage">View</a> 
                                                <i class="fa-solid fa-heart heart-icon-gamepage cta-heart-gamespage""></i>
                                            </div>
                                            </div>`
            };
        };
        gamesHTML += `</div>`;
    };

    allGamesContainer.innerHTML = gamesHTML;
};


