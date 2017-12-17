'use strict';


let Coins;  //class for coins

Coins = function createCoins(game, x, y, sprite, type) {
		Phaser.Sprite.call(this, game, x, y, sprite);
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.collideWorldBounds = true;
	    this.enableBody = true;

	    this.game = game;
	    this.coordinateX = x;
	    this.coordinateY = y;
	    this.spriteName = sprite;
	    this.type = type;
	    this.animations.add(this.spriteName);
		// this.body.gravity.y = 300;
		// this.body.bounce.y = 0.7 + Math.random() * 0.2;
	    this.scale.setTo(0.7, 0.7);

	   	this.coinSound = game.add.audio("coinSound");
		// this.anchor.x = 0.5;
		// this.anchor.y = 0.5;

		this.type = type;

		this.createCoin = function (array) {
			this.countArray = [array[5], array[6]];
			this.coinBoolean = true;

			for (var i = 0; i < this.countArray[0]; i++) {
				let belarusianCoin;
				for (var j = 0; j <= this.countArray[1]; j++) {
					if (j === (this.countArray[1])) {
						if (this.coinBoolean == true) {
							this.coinBoolean = false;
							this.coordinateX -= 60;
						} else {
							this.coinBoolean = true;
							this.coordinateX += 60;
						}
					} else if (this.coinBoolean == true) {
						belarusianCoin = new Coins(game, this.coordinateX, this.coordinateY, this.spriteName, this.type);
						this.coordinateX += 60;
					} else if (this.coinBoolean == false) {
						belarusianCoin = new Coins(game, this.coordinateX, this.coordinateY, this.spriteName, this.type);
						this.coordinateX -= 60;
					}
				}
				this.coordinateY += 60;
			}
		}
		
		game.add.existing(this);
	}

	Coins.prototype = Object.create(Phaser.Sprite.prototype);
	Coins.prototype.constructor = Coins;

	Coins.prototype.update = function() {
		this.animations.play(this.spriteName, 10, true, false);
		game.physics.arcade.collide(this, platforms);
		game.physics.arcade.overlap(this, dude, collectCoins, null, this);

		function collectCoins(coin, player) {
			this.coinSound.play();
			coin.kill();
			score += this.type;
			scoreText.text = 'Score: ' + score;
		}
	};