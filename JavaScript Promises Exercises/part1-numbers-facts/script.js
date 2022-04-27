//Part 1: Number Facts

const BASE_URL = 'http://numbersapi.com';

// 1. Make a request to the Numbers API to get a fact about your favorite number. 
//Make sure you get back JSON by including the json query key

let favNum = 8;
$.getJSON(`${BASE_URL}/${favNum}?json`)
    .then(data => {
        $('#favNum').html(data.text)
    });


// 2. Figure out how to get data on multiple numbers in a single request. 
//Make that request and when you get the data back, put all of the number facts on the page.

let favNums = [8, 22, 88];
$.getJSON(`${BASE_URL}/${favNums}?json`)
    .then(data => {
        let res = "";
        for (let prop in data) {
            res += prop + ': ' + data[prop] + '; ';
            $('#favNums').html(res)
        }
    });

//////////////// Or with JSON.stringify() //////////////
// let favNums = [8, 22, 88];
// $.getJSON(`${BASE_URL}/${favNums}?json`)
//     .then(data => {
//         let res = JSON.stringify(data, null, 4);
//         $('#favNums').html(res)
//     });



// 3. Use the API to get 4 facts on your favorite number. 
//Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

Promise.all(
    Array.from({
        length: 4
    }, () => {
        return $.getJSON(`${BASE_URL}/${favNum}?json`);
    })
).then(facts => {
    facts.forEach(data => $('#fourFacts').append(`<li>${data.text}</li>`))
});