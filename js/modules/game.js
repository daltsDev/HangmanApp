import Home from "../modules/home.js";
import End from '../modules/end.js'
import Board from '../modules/board.js';
import { sound } from "../data/sound.js";

const Game = (_ => {

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const words = ['apple', 'ball', 'cat', 'dog', 'elephant', 'shoe', 'computer', 'science', 'football'];
    let chosenWord;
    let guessingWord;
    let lives;
    let guesses;

    //caching the dom

    const $hangman = document.querySelector(".hangman");

    const init = _ => {
        //1. choose a hangman
        chosenWord = chooseWord();
        // 2. Build out our own guessing word to render
        guessingWord = Array(chosenWord.length).fill('_');
        guesses = [];
        lives = 7;
        // Show the game page
        showInitPage();
        listeners();
        Board.init();
    }
    const chooseWord = _ => {
        let ranNum = Math.floor(Math.random() * words.length);
        return words[ranNum];
    }
    const showInitPage = _ => {
        let markup = `
        <p class="hangman__stats">Lives:
        <span class="hangman__lives">${lives}</span>
        </p>
        <h1 class="hangman__title">Hangman</h1>
        <canvas class="hangman__board" height"155px"></canvas>
        <div class="hangman__word">${guessingWord.join("")}</div>
        <p class="hangman__instructions">Pick a letter below to guess the hidden word.</p>
        <ul class="hangman__letters">
        ${createLetters()}
        </ul>
        <button class="button hangman__trigger">Main Menu</button>
        `
        $hangman.innerHTML = markup;
    }

    const createLetters = _ => {
        let markup = '';
        letters.forEach(letter => {
            const isActive = isAlreadyTaken(letter) ? 'hangman__letter--active' : '';
            markup += `
            <li class="hangman__letter ${isActive}">${letter}</li>
            `
        })
        return markup;
    }

    const listeners = _ => {

        $hangman.addEventListener("click", event => {
            if (event.target.matches(".hangman__trigger")){
                sound.click.play();
                Home.init();
            }
        })

        $hangman.addEventListener("click", event =>{
            if (event.target.matches(".hangman__letter")){
                sound.click.play();
                check(event.target.innerHTML)
            }

        })
    }

    //taking in user guess and checking if it is already used
    const isAlreadyTaken = letter => {
        return guesses.includes(letter);
    }

    const check = guess => {
        // if guess is already taken then do nothing
        if (isAlreadyTaken(guess)) return;
        guesses.push(guess);
        // checking if guess already exists in chosen word
        if (chosenWord.includes(guess)) {
            // updating the guessing word with user guess
            updateGuessingWord(guess);
        } else {
            // if guess does not exist in guessing word reduce lives
            lives--;
            // render the board 
            Board.setLives(lives);
        }
        render();
        //check if the game is over
        gameOver();
    }

    const hasWon = _ => guessingWord.join("") === chosenWord;

    const hasLost = _ => lives <= 0;

    const gameOver = _ => {
        if (hasWon()) {
            sound.win.play();
            End.setState({
                chosenWord,
                result: "win"
            })
        }

        if (hasLost()) {
            sound.lose.play();
            End.setState({
                chosenWord,
                result: "loose"
            })
        }
    }
    
    
    const render = _ => {
        document.querySelector(".hangman__lives").innerHTML = lives;
        document.querySelector(".hangman__word").innerHTML = guessingWord.join("");
        document.querySelector(".hangman__letters").innerHTML = createLetters();
    }
    
    // splitting the guessing word into an array then looping through that array and seeing if the letter matches a letter in the array
    const updateGuessingWord = letter => {
        chosenWord.split("").forEach((elem, index) => {
            if (elem === letter) {
                guessingWord[index] = elem;
            }
        })
    }

    return {
        init
    }
})();

export default Game;