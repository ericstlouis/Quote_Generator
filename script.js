const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader =document.getElementById('loader')

let apiQuotes = [];


// to show loading 
function loading () {
    loader.hidden = false;
    quoteContainer.hidden =  true;
}

//Hide Loading 
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false
}


//show new quote
function newQuote() {
    loading();
    //pick a random quote from api quotes
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    //check if author field is blank and replace with 'unknown'
    if(!quote.author) {
        authorText.textContent = "unknown";
    } else {
        authorText.textContent = quote.author;
    }
    //check quote length to determine styling
    if (quoteText.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote')
    }
    //set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
} 

//get quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
            //catch error
    }
}


//to tweet a quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');

}

//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//onload
getQuotes();
