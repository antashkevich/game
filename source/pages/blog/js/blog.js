import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import '../blog.scss';

import bgMain from '../images/bgMain.png';
import explode from '../images/explode.png';
import bulletIcon from '../images/bullet.png';
import groundIcon from '../images/ground.png';
import stars from '../images/star.png';

import dudeSprite from '../images/dude_sprite.png';
import belarusianCoin from '../images/belarusianCoin_sprite.png';
import zombFemale from '../images/zombieFemale_sprite.png';
import zombMale from '../images/zombieMale_sprite.png';

import dudeSpriteJson from '../images/dude_sprite.json';
import zombFemaleJson from '../images/zombieFemale_sprite.json';
import zombMaleJson from '../images/zombieMale_sprite.json';

import ambient from '../sounds/ambientmain.wav';
import coinS from '../sounds/coin.wav';

import 'normalize.css';


const game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

function preload() {
	this.load.image('sky', bgMain);
	this.load.image('ground', groundIcon);
	this.load.image('bullet', bulletIcon);
	this.load.image('star', stars);
	this.load.spritesheet('coin', belarusianCoin, 68, 68);
	this.load.atlas('dude', dudeSprite, dudeSpriteJson);
	this.load.atlas('zombieFemale', zombFemale, zombFemaleJson);
	this.load.atlas('zombieMale', zombMale, zombMaleJson);
	this.load.spritesheet('explosion', explode, 128, 128);
	this.load.audio('coinSound', coinS);
	this.load.audio('environment', ambient);


	// game.load.audio('step', 'sounds/step2.ogg');
};

let Player;  //class for player
let dude;

let Zombies; //class for zombie
let zombie;

let platforms;

let cursors;

let Coins;  //class for coins
let coin;

let environment;

let score = 0;
let scoreText;

function create() {
	game.add.tileSprite(0, 0, 1200, 600, 'sky');
	game.world.setBounds(0, 0, 1200, 600);

	environment = game.add.audio('environment');
	environment.loopFull();
	environment.play();

	game.physics.startSystem(Phaser.Physics.ARCADE);
	cursors = game.input.keyboard.createCursorKeys();

	//PLATFORMS SETTING----------------------------------------------------------------------------------------------------------------------------------
	platforms = game.add.group();
	platforms.enableBody = true;

	for (var i = 0, j = 0; i < game.world.width/500; i++, j+=500) {	//500 - it is width of ground img
		let ground = platforms.create(j, game.world.height - 41, 'ground');
		ground.body.immovable = true;
	}

	for (var i = 0, j = 120; j < game.world.width; i++, j+=randomInteger(10, 300)) {	//500 - it is width of ground img

		let randomPlaceY = randomInteger(game.world.height - 100, game.world.height - 450);
		let platform = platforms.create(j, randomPlaceY, 'ground');
		let randomWidth = randomInteger(0.10, 1);

		platform.scale.setTo(randomWidth, 1);
		platform.body.immovable = true;
	}

	function randomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	//PLAYER SETTING----------------------------------------------------------------------------------------------------------------------------------
	Player = function (game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'dude');
		game.physics.enable(this, Phaser.Physics.ARCADE);
		game.camera.follow(this);

		this.collideWorldBounds = true;
	    this.enableBody = true;
		this.animations.add('runLeft', Phaser.Animation.generateFrameNames('runL_', 1, 8), 10, true);
		this.animations.add('runRight', Phaser.Animation.generateFrameNames('runR_', 1, 8), 10, true);
		this.animations.add('idleRight', Phaser.Animation.generateFrameNames('idleR_', 1, 10), 15, true);
		this.animations.add('idleLeft', Phaser.Animation.generateFrameNames('idleL_', 1, 10), 15, true);
		this.animations.add('jumpRight', Phaser.Animation.generateFrameNames('jumpR_', 1, 10), 5, true);
		this.animations.add('jumpLeft', Phaser.Animation.generateFrameNames('jumpL_', 1, 10), 5, true);
		this.animations.add('meleeRight', Phaser.Animation.generateFrameNames('meleeR_', 1, 7), 5, true);
		this.animations.add('meleeLeft', Phaser.Animation.generateFrameNames('meleeL_', 1, 7), 5, true);
		this.animations.add('shootRight', Phaser.Animation.generateFrameNames('shootR_', 1, 3), 5, true);
		this.animations.add('shootLeft', Phaser.Animation.generateFrameNames('shootL_', 1, 3), 5, true);
		this.animations.add('deadRight', Phaser.Animation.generateFrameNames('deadR_', 1, 10), 5, true);
		this.animations.add('deadLeft', Phaser.Animation.generateFrameNames('deadL_', 1, 10), 5, true);

		this.body.gravity.y = 300;
	    this.body.collideWorldBounds = true;

	    this.scale.setTo(0.15, 0.15);
	    this.hitPlatform;
	    this.playerWay = false; //false == right, true == left
		this.playerLife = 500;

		this.weapon = game.add.weapon(30, 'bullet');
	    this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
	    this.weapon.bulletSpeed = 500;
	    this.weapon.fireRate = 390;
	    this.weapon.trackSprite(this, 65, 37, true);
	    this.fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

	    this.weapon.bulletHit = function bulletExplosion(bullet) {
	    	let explosion = game.add.sprite(bullet.x, bullet.y, 'explosion');

			explosion.anchor.x = 0.5;
		    explosion.anchor.y = 0.5;
			explosion.animations.add('explosion');
			explosion.animations.play('explosion', 25, false, true);

	    }


	    game.add.existing(this);
	};

	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;

	Player.prototype.update = function() {
		this.hitPlatform = game.physics.arcade.collide(this, platforms);

		this.body.velocity.x = 0;

		if (cursors.left.isDown) {
			this.body.velocity.x = -150;
			this.playerWay = true;

			if (cursors.up.isDown) {
				this.animations.play('jumpLeft');
			} else {
				this.animations.play('runLeft');
				// this.stepSound.play();
			}

		} else if (cursors.right.isDown) {
			this.body.velocity.x = 150;
			this.playerWay = false;

			if (cursors.up.isDown) {
				this.animations.play('jumpRight');
			} else {
				this.animations.play('runRight');
				// this.stepSound.play();
			}

		} else if (cursors.up.isDown) {

			if (this.playerWay) {
				this.animations.play('jumpLeft');
			} else {
				this.animations.play('jumpRight');
			}

		} else if (cursors.down.isDown) {

		} else if (this.fireButton.isDown) {
			if (this.playerWay) {
				this.animations.play('shootLeft');
				this.weapon.bulletSpeed = -500;
				this.weapon.fire();
			} else {
				this.animations.play('shootRight');
				this.weapon.bulletSpeed = 500;
				this.weapon.fire();
			}

		} else {

			if (!this.body.touching.down && !this.hitPlatform) {

				if (this.playerWay) {
					this.animations.play('jumpLeft');
				} else {
					this.animations.play('jumpRight');
				}
			} else {

				if (this.playerWay) {
					this.animations.play('idleLeft');
				} else {
					this.animations.play('idleRight');
				}
			}
		}

		if (cursors.up.isDown && this.body.touching.down && this.hitPlatform) {
			this.body.velocity.y = -350;
		}

	};

	dude = new Player(game, 15, 300);

	//ZOMBIES SETTING----------------------------------------------------------------------------------------------------------------------------------
	Zombies = function (game, x, y) {

		if (randomInteger(2, 12) % 2 === 0) {
			Phaser.Sprite.call(this, game, x, y, 'zombieFemale');
		} else {
			Phaser.Sprite.call(this, game, x, y, 'zombieMale');
		}

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.collideWorldBounds = true;
	    this.enableBody = true;
	    this.animations.add('walkLeft', Phaser.Animation.generateFrameNames('walkL_', 1, 10), 10, true);
		this.animations.add('walkRight', Phaser.Animation.generateFrameNames('walkR_', 1, 10), 10, true);
		this.animations.add('attackRight', Phaser.Animation.generateFrameNames('attackR_', 1, 8), 15, true);
		this.animations.add('attackLeft', Phaser.Animation.generateFrameNames('attackL_', 1, 8), 15, true);
		this.animations.add('deadRight', Phaser.Animation.generateFrameNames('deadR_', 1, 12), 5, true);
		this.animations.add('deadLeft', Phaser.Animation.generateFrameNames('deadL_', 1, 12), 5, true);
	    this.body.gravity.y = 800;
	    this.body.bounce.y = 0;// 0.7 + Math.random() * 0.2;
	    this.body.bounce.x = 1;
	    this.body.collideWorldBounds = true;
	    this.body.velocity.x = 80;

	    this.scale.setTo(0.15, 0.15);
	    game.add.existing(this);
	};

	Zombies.prototype = Object.create(Phaser.Sprite.prototype);
	Zombies.prototype.constructor = Zombies;

	Zombies.prototype.update = function() {

		game.physics.arcade.collide(this, platforms, function (zombie, platform) {
	        if (zombie.body.velocity.x > 0 && zombie.x > platform.x + (platform.width - zombie.width) ||
	                zombie.body.velocity.x < 0 && zombie.x < platform.x) {
	            zombie.body.velocity.x *= -1; 
	        } 
	        if (zombie.body.velocity.x > 0) {
	            zombie.animations.play('walkRight');
	        } else {
	            zombie.animations.play('walkLeft');
	        }
	    });

		game.physics.arcade.overlap(this, dude, attackZombies, null, this);

	 	function attackZombies(zombie, player) {
			console.log(dude.playerLife);
			dude.playerLife -= 1;
			console.log(dude.playerLife);

			if (dude.playerLife <= 0) {
				alert("U r die!!!")
			}
		}

		game.physics.arcade.overlap(this, dude.weapon.bullets, bulletHitZombie, null, this);
    
	    function bulletHitZombie (zombie, bullet) {
	    	bullet.kill();
    		dude.weapon.bulletHit(bullet);
	    	zombie.kill();
	    }
	};

	for (var i = 0; i < game.world.width/100; i++) {
		zombie = new Zombies(game, i + 100 * randomInteger(1, 50), 0);
	}

	//COINS SETTING----------------------------------------------------------------------------------------------------------------------------------
	Coins = function createStars(game, x, y) {
		Phaser.Sprite.call(this, game, x * 70, y, 'coin');
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.collideWorldBounds = true;
	    this.enableBody = true;
	    this.animations.add('coin');
		this.body.gravity.y = 300;
		this.body.bounce.y = 0.7 + Math.random() * 0.2;
	    this.scale.setTo(0.7, 0.7);

	   	this.coinSound = game.add.audio("coinSound");
		// this.anchor.x = 0.5;
	 //    this.anchor.y = 0.5;
		
		game.add.existing(this);
	}

	Coins.prototype = Object.create(Phaser.Sprite.prototype);
	Coins.prototype.constructor = Coins;

	Coins.prototype.update = function() {
		this.animations.play('coin', 10, true, false);
		game.physics.arcade.collide(this, platforms);
		game.physics.arcade.overlap(this, dude, collectCoins, null, this);

		function collectCoins(coin, player) {
			this.coinSound.play();
			coin.kill();
			score += 1;
			scoreText.text = 'Score: ' + score + ' rubles';
		}
	};

	for (var i = 0; i < game.world.width/70; i++) {
		coin = new Coins(game, i, 0);
	}

	//TEXT SETTING-----------------------------------------------------------------------------------------------------------------------------------
	scoreText = game.add.text(16, 16, 'Score: 0 rubles', { fontSize: '32px', fill: '#FFF' });


	//REMOVE CONTEXTMENU (right click on mouse)------------------------------------------------------------------------------------------------------
	game.canvas.oncontextmenu = function (event) {
		event.preventDefault (); 
	}

};

function update() {
	game.physics.arcade.overlap(dude.weapon.bullets, platforms, bulletHitPlatform);

    function bulletHitPlatform (bullet, platform) {
    	bullet.kill();
    	dude.weapon.bulletHit(bullet);
    }
}