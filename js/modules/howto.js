import { sound } from "../data/sound.js";
import Home from "./home.js";

const How = (_ => {

    const $hangman = document.querySelector(".hangman");

    const init = _ => {
        render();
        listeners();
    }

    const render = _ => {
        let markup = `
        <h1 class="hangman__title">Instructions</h1>
        <ul class="how">
        <li><i class="fas fa-dizzy"></i>Click "New Game" to start a new game</li>
        <li><i class="fas fa-dizzy"></i>The game will automatically choose a random word for you to guess</li>
        <li><i class="fas fa-dizzy"></i>Pick letters you think are in the word to successfully guess the correct word</li>
        <li><i class="fas fa-dizzy"></i>You have 7 lives to guess the word correctly</li>
        <li><i class="fas fa-dizzy"></i>If you use all your lives... you will be hanged!!!</li>
        </ul>
        <button class="button hangman__trigger">Main Menu</button>
        `
        $hangman.innerHTML = markup;
    }


    const listeners = _ => {

        $hangman.addEventListener("click", event => {
            if (event.target.matches(".hangman__trigger")){
                sound.click.play();
                Home.init();
            }
        })
    }

    return {
        init
    }
})();

export default How;