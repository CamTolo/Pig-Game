'use strict';

//declare score elements for each player
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
//create event handlers for each of the buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function()
{
    //starting conditions
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    scores = [0,0];
    currentScore = 0;
    activePlayer = 0; //player 0(player1) && player 1(player1)
    playing = true;
}
init();


const switchPlayer = function()
{
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; 
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//rolling the dice functionality 
btnRoll.addEventListener('click', function()
{
    if(playing)
    {
        //1. Generate a random roll
        const dice = Math.trunc(Math.random() * 6) + 1; //math.trunc removes any digits. (makes it a whole number)
        console.log(dice);
    
        //2. Display Dice
        diceEl.classList.remove('hidden'); //this removes hidden dice class
        diceEl.src = `dice-${dice}.png`;
    
        //3.Check for :-> if 1, switch player, if !1 add dice roll to current score
        if(dice !== 1)
        {
            //Add dice roll to current score
            currentScore += dice; // SAME AS  -> currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else
        {
            //Switch to next player
            switchPlayer();
        }   
    } 
});

btnHold.addEventListener('click', function()
{
    if(playing)
    {
        //1. Add current score to score of active player
        scores[activePlayer] += currentScore;
        //scores[1] = scores[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //2. Check if score is >= 100
        if(scores[activePlayer] >= 20)
        {
            //Finish Game
            playing = false;
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                classList.add('player--winner');
            document
                .querySelector(`player--${activePlayer}`)
                .classList.remove('player--active');
        }
        else
        {
            //Switch to next player
            switchPlayer();
        }
    }
    
});

btnNew.addEventListener('click', init);