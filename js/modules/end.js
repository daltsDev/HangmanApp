const End =  (_ => {

    const state = {
        chosenWord: null,
        winOrLoose: null,
    }

    const $hangman = document.querySelector(".hangman");

    const setState = obj => {
        state.chosenWord = obj.chosenWord;
        state.winOrLoose = obj.result;
        render();
    }

    const render = _ => {
        let markup = `
        <h1 class="hangman__title">Game Over</h1>
        <p class="result">You ${state.winOrLoose.toUpperCase()}! <br>
        The word was ${state.chosenWord.toUpperCase()}.</p>
        <button class="button hangman__trigger">Main Menu</button>
        `
        $hangman.innerHTML = markup;
    }


    return {
        setState
    }
})();

export default End;