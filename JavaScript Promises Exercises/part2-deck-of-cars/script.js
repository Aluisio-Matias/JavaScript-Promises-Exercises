// Part 2: Deck of Cards

const BASE_URL = 'http://deckofcardsapi.com/api/deck'

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
// Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
$.getJSON(`${BASE_URL}/new/draw/`)
    .then(data => {
        let {
            suit,
            value
        } = data.cards[0];
        console.log(`${value} of ${suit}`);
        let res = `${value} of ${suit}`;
        $('#1').html(res);
    });

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
// Once you have the card, make a request to the same API to get one more card from the same deck.
let firstCard = undefined;
$.getJSON(`${BASE_URL}/new/draw/`)
    .then(data => {
        firstCard = data.cards[0];
        let deckID = data.deck_id;
        return $.getJSON(`${BASE_URL}/${deckID}/draw/`);
    }).then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function (card) {
            console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
            let res = `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
            $('#2').append(`<li>${res}</li>`);
        });
    });


// 3.
let deckId = null;
let $btn = $('#request');
let $cardSection = $('#card-section');

$.getJSON(`${BASE_URL}/new/shuffle/`)
    .then(data => {
        deckId = data.deck_id;
        $btn.show();
    });

$btn.on('click', function () {
    $.getJSON(`${BASE_URL}/${deckId}/draw/`)
        .then(data => {
            let cardImg = data.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardSection.append($('<img>', {
                src: cardImg,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            }));
            if (data.remaining === 0) $btn.remove();
        });
});