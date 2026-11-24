
// Create a new deck of cards
let deck = [];

// Keep track of the current card and score
let currentCard;
let cardsFlipped = 0;

// Create the deck
function createDeck() {

    deck = [];

    let suits = ["♥", "♦", "♣", "♠"];

    let ranks = [
        { name: "A", value: 1 },
        { name: "2", value: 2 },
        { name: "3", value: 3 },
        { name: "4", value: 4 },
        { name: "5", value: 5 },
        { name: "6", value: 6 },
        { name: "7", value: 7 },
        { name: "8", value: 8 },
        { name: "9", value: 9 },
        { name: "10", value: 10 },
        { name: "J", value: 11 },
        { name: "Q", value: 12 },
        { name: "K", value: 13 }
    ];

    // Add every card to the deck
    for (let suit of suits) {
        for (let rank of ranks) {

            deck.push({
                suit: suit,
                name: rank.name,
                value: rank.value
            });

        }
    }

    // Shuffle the deck
    for (let i = deck.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        [deck[i], deck[j]] = [deck[j], deck[i]];

    }
}


function displayCard(card) {

    let cardSuit = document.getElementById("card-suit");
    let cardElement = document.getElementById("card");

    // Update the top-left corner
    document.getElementById("top-rank").textContent = card.name;
    document.getElementById("top-suit").textContent = card.suit;

    // Update the bottom-right corner
    document.getElementById("bottom-rank").textContent = card.name;
    document.getElementById("bottom-suit").textContent = card.suit;

    // Update the central suit
    cardSuit.textContent = card.suit;

    // Set the card colour
    if (card.suit === "♥" || card.suit === "♦") {
        cardElement.className = "card red";
    }
    else {
        cardElement.className = "card black";
    }

}



// Start or restart the game
function startGame() {

    createDeck();

    // Deal the first card
    currentCard = deck.pop();

    cardsFlipped = 1;

    displayCard(currentCard);

    document.getElementById("score").textContent =
        "Cards flipped: " + cardsFlipped;

    document.getElementById("message").textContent = "Good luck!";

    document.getElementById("higher").disabled = false;
    document.getElementById("lower").disabled = false;

    document.getElementById("playAgain").style.display = "none";

}


// Player chooses higher or lower
function makeGuess(guess) {

    // Deal the next card
    let nextCard = deck.pop();

    cardsFlipped++;

    displayCard(nextCard);

    document.getElementById("score").textContent =
        "Cards flipped: " + cardsFlipped;


    // Check whether the player was correct
    if (nextCard.value === currentCard.value) {

        document.getElementById("message").textContent =
            "It's a tie! You keep going!";

    }

    else if (
        (guess === "higher" && nextCard.value > currentCard.value) ||
        (guess === "lower" && nextCard.value < currentCard.value)
    ) {

        document.getElementById("message").textContent =
            "Correct! Keep going!";

    }

    else {

        document.getElementById("message").textContent =
            "Wrong! Game over!";

        endGame();
        return;

    }

    // The new card becomes the current card
    currentCard = nextCard;

    // Check whether the deck is empty
    if (deck.length === 0) {

        document.getElementById("message").textContent =
            "Amazing! You completed the deck!";

        endGame();

    }

}


// End the game
function endGame() {

    document.getElementById("higher").disabled = true;
    document.getElementById("lower").disabled = true;

    document.getElementById("playAgain").style.display = "block";

}


// Start the game when the page loads
startGame();
