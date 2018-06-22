const game = {
	cards: [{name: "Bulbasaur", damage:60}, 
			{name: "Caterpie", damage:40}, 
			{name: "Charmander", damage:60}, 
			{name: "Clefairy", damage:50}, 
			{name: "Jigglypuff", damage:60}, 
			{name: "Mankey", damage:30}, 
			{name: "Meowth", damage:60}, 
			{name: "Nidoran - female", damage:60}, 
			{name: "Nidoran - male", damage:50}, 
			{name: "Oddish", damage:40}, 
			{name: "Pidgey", damage:50}, 
			{name: "Pikachu", damage:50}, 
			{name: "Poliwag", damage:50}, 
			{name: "Psyduck", damage:60}, 
			{name: "Rattata", damage:30}, 
			{name: "Squirtle", damage:60}, 
			{name: "Vulpix", damage:50}, 
			{name: "Weedle", damage:40}],
	trackPointsP1: 0,
	trackPointsP2: 0,
	p1Card: 0,
	p2Card: 0,


	winner(p1Card, p2Card){
		console.log("Player one played: " + p1Card['name'] + " with damage " + p1Card['damage']);
		console.log("Player two played: " + p2Card['name'] + " with damage " + p2Card['damage']);
		p1dmg = parseInt(p1Card['damage']);
		p2dmg = parseInt(p2Card['damage']);
		if(p1dmg > p2dmg) {
			console.log("Player 1 wins");
			this.trackPointsP1++;
		} else if (p1dmg < p2dmg) {
			console.log("Player 2 wins");
			this.trackPointsP2++;
		} else {
			console.log("It was a draw!!");
		}
	},

	deal(){

		// shuffle function taken from:
		// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
	    for (let i = this.cards.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
	    }

	    for(let i = 0; i < 3; i++) {
	    	player1.hand.push(this.cards.pop());
	    	player2.hand.push(this.cards.pop());
	    }
		console.log('cards dealt');
	},


	playGame(){
		while(this.cards.length >= 6){
			this.deal();

			while(player1.hand.length > 0) {
				this.p1Card = player1.pickCard();
				this.p2Card = player2.pickCard();
				this.winner(this.p1Card, this.p2Card);
			}
			console.log("Checking if we can deal more cards");
		}
		console.log("No more cards in deck");
		this.endGame();
	},


	endGame(){
		console.log("\n\n\n***********************");
		console.log("***********************");
		console.log("*** CONGRATS!! ***");
		if (this.trackPointsP1 > this.trackPointsP2) {
			console.log("*** Player one - whooped that ass!")
		} else if (this.trackPointsP2 > this.trackPointsP1) {
			console.log("*** Player two - killin' it!")
		} else {
			console.log("Boring. As. Shit.");
		}
	}

};


const player1 = {
	hand: [],
	stats: 0,
	currentHand: 0,
	cardsPlayed: [],

	pickCard(){
		let arrIdx = Math.floor(Math.random() * this.hand.length);
		let card = this.hand[arrIdx];
		this.cardsPlayed.push(card);
		this.hand.splice(arrIdx, 1);
		return card;
	}
};


const player2 = {
	hand: [],
	stats: 0,
	currentHand: 0,
	cardsPlayed: [],

	pickCard(){
		let names = "";
		for (i in this.hand) {
			names += this.hand[i]['name'] + "\tdmg: " + this.hand[i]['damage'] + "\n";
		}

		while(true) {
			let answer = window.prompt('Pick a card to play: \n' + names);
			let card = 0;	// the card we'll return

			for(var i = 0; i < this.hand.length; i++) {
				if(this.hand[i]['name'].toLowerCase() == answer.toLowerCase()) {
					card = this.hand[i];
					this.cardsPlayed.push(card);
					this.hand.splice(i,1);
					return card;
				}
			}
			alert("You didn't enter a valid player name! Try again");
		} 
	}

};


game.playGame();