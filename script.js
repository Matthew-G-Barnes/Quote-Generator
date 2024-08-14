const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterbtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// fide Loading
function compete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Show new quote
function newQuote() {
    loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if author field is blank and replace with 'unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote')
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    compete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch error here
        console.log(error);
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterbtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();