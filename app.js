'use strict';

let scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying){
		//Random number
		let dice1 = Math.floor(Math.random() * 6) + 1;
		let dice2 = Math.floor(Math.random() * 6) + 1;
	 
		//display the result
		document.getElementById('dice1').style.display = 'block';
		document.getElementById('dice2').style.display = 'block';
		document.getElementById('dice1').src = 'images/dice-' + dice1 + '.png';
		document.getElementById('dice2').src = 'images/dice-' + dice2 + '.png';
   
		//Update the round score IF the rolled number was not a 1
   
		if (dice1 !== 1 && dice2 !== 1) {
		   // Add score
		   roundScore += dice1 + dice2;
		   document.querySelector('#current-' + activePlayer).textContent = roundScore;
	   }else{
		   //Next player
		   nextPlayer();
	   }
	
	}
	
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
		
	//Add current score to global score
	scores[activePlayer] += roundScore;

	//Update the UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	let input = document.querySelector('.final-score').value;
	let winningScore; 

	if(input){
		winningScore = input;
	}else{
		winningScore = 100;
	}
	//Check IF the player won the game

	if(scores[activePlayer] >= winningScore) {
		document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
		none();
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		gamePlaying = false;
	}else{
		nextPlayer();
	}
	}
});

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
		roundScore = 0;

		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		none();
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	none();

	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('name-0').textContent = 'PLAYER 1';
	document.getElementById('name-1').textContent = 'PLAYER 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

function none(){
	document.getElementById('dice1').style.display = 'none';
	document.getElementById('dice2').style.display = 'none';
}