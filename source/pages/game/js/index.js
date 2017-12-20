import '../game.scss';

import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

'use strict';

const game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	this.load.image('loading', '../images/splashScreen.png');

	this.load.image('sky', '../images/bgMain.png');
	this.load.image('ground2', '../images/ground2.png');
	this.load.image('ground4', '../images/ground4.png');
	this.load.image('ground5', '../images/ground5.png');
	this.load.image('ground6', '../images/ground6.png');
	this.load.image('ironBox1', '../images/ironBox1.png');
	this.load.image('ironBox2', '../images/ironBox2.png');
	this.load.image('ironBox3', '../images/ironBox3.png');
	this.load.image('ironBox4', '../images/ironBox4.png');
	this.load.image('box1', '../images/woodenBox.png');
	this.load.image('box2', '../images/woodenBox2.png');
	this.load.image('acid', '../images/acid.png');
	this.load.image('lava', '../images/lava.png');
	this.load.image('acidLava', '../images/acidLava.png');
	this.load.image('frozenFlame', '../images/frozenFlame.png');
	this.load.image('bullet', '../images/bullet.png');
	this.load.image('restartGame', '../images/restart.png');
	this.load.image('pauseGame', '../images/pause.png');
	this.load.image('playGame', '../images/play.png');
	this.load.image('music', '../images/music.png');
	this.load.image('sound', '../images/sound.png');
	this.load.image('man', '../images/man.png');

	this.load.atlas('dude', '../images/dude_sprite.png', '../images/dude_sprite.json');
	this.load.atlas('zombieFemale', '../images/zombieFemale_sprite.png', '../images/zombieFemale_sprite.json');
	this.load.atlas('zombieMale', '../images/zombieMale_sprite.png', '../images/zombieMale_sprite.json');

	this.load.spritesheet('coin1', '../images/belarusianCoin1_sprite.png', 68, 68);
	this.load.spritesheet('coin2', '../images/belarusianCoin2_sprite.png', 68, 68);
	this.load.spritesheet('coin050', '../images/belarusianCoin050_sprite.png', 68, 68);
	this.load.spritesheet('coin020', '../images/belarusianCoin020_sprite.png', 68, 68);
	this.load.spritesheet('coin010', '../images/belarusianCoin010_sprite.png', 68, 68);
	this.load.spritesheet('coin05', '../images/belarusianCoin05_sprite.png', 68, 68);
	this.load.spritesheet('coin02', '../images/belarusianCoin02_sprite.png', 68, 68);
	this.load.spritesheet('coin01', '../images/belarusianCoin01_sprite.png', 68, 68);

	this.load.spritesheet('explosion', '../images/explode.png', 128, 128);

	this.load.audio('coinSound', '../sounds/coin.wav');
	this.load.audio('environment', '../sounds/ambientmain.wav');
	this.load.audio('zombieDead1', '../sounds/zombieDead1.wav');
	this.load.audio('zombieDead2', '../sounds/zombieDead2.wav');
	this.load.audio('zombieDead3', '../sounds/zombieDead3.wav');
	this.load.audio('zombieDead4', '../sounds/zombieDead4.wav');
	this.load.audio('zombieDead5', '../sounds/zombieDead5.wav');
	this.load.audio('zombieDead6', '../sounds/zombieDead6.wav');
	this.load.audio('zombieDead7', '../sounds/zombieDead7.wav');

	this.load.audio('pistol', '../sounds/pistol.wav');
	this.load.audio('churchBell', '../sounds/churchBell.wav');
	this.load.audio('rockBreak', '../sounds/rockBreak.wav');
}

let pauseGame;
let playGame;
let restartGame;
let music;
let musicPlay = true;
let sound;
let soundPlay = true;

let Player;  //class for player
let dude;

let Man;  //class for player
let man;

let Zombies; //class for zombie
let zombie;

let platforms;
let dangerousObstacles;
let simpleBox;

let Controls;
let cursors;

let Coins;  //class for coins
let coin1;
let coin2;
let coin050;
let coin020;
let coin010;
let coin05;
let coin02;
let coin01;

let environment;

let score = 0;
let scoreText;
let gameOverText;


function create() {
	game.stage.backgroundColor = '#ffffff';

	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;

	game.add.tileSprite(0, 0, 11188, 660, 'sky');
	game.world.setBounds(0, 0, 11188, 660);

	environment = game.add.audio('environment');
	environment.loopFull();
	environment.play();

	game.physics.startSystem(Phaser.Physics.ARCADE);
	cursors = game.input.keyboard.createCursorKeys();

	//PLATFORMS SETTING----------------------------------------------------------------------------------------------------------------------------------
	platforms = game.add.group();
	platforms.enableBody = true;

	dangerousObstacles = game.add.group();
	dangerousObstacles.enableBody = true;

	simpleBox = game.add.group();
	simpleBox.enableBody = true;

	let platformCoordinateY = game.world.height - 40;

	let ground = platforms.create(0, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(480, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(900, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(1860, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(2160, platformCoordinateY, 'ground5');
		ground.body.immovable = true;
		ground = platforms.create(2580, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(2880, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(3480, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(3780, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(4080, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(5340, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(5760, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(6060, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(6540, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(6960, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(7380, platformCoordinateY, 'ground5');
		ground.body.immovable = true;
		ground = platforms.create(7800, platformCoordinateY, 'ground2');
		ground.body.immovable = true;
		ground = platforms.create(7980, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(8400, platformCoordinateY, 'ground6');
		ground.body.immovable = true;
		ground = platforms.create(9180, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(9480, platformCoordinateY, 'ground4');
		ground.body.immovable = true;
		ground = platforms.create(10560, platformCoordinateY, 'ground5');
		ground.body.immovable = true;
		ground = platforms.create(10920, platformCoordinateY, 'ground4');
		ground.body.immovable = true;


	let ironBox = platforms.create(60, 360, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(300, 480, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(360, 180, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(600, 360, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(840, 240, 'ironBox3');
		ironBox.body.immovable = true;
		ironBox = platforms.create(1200, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(1440, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(1620, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(1620, 420, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(1800, 500, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(1860, 240, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(2280, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(2460, 420, 'ironBox3');
		ironBox.body.immovable = true;
		ironBox = platforms.create(2580, 180, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(3000, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(3240, 300, 'ironBox3');
		ironBox.body.immovable = true;
		ironBox = platforms.create(3600, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(3840, 300, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(4260, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(4440, 480, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(4500, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(4620, 480, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(4740, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(4980, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(5040, 500, 'ironBox3');
		ironBox.body.immovable = true;
		ironBox = platforms.create(5220, 260, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(5400, 420, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(5460, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(5640, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(5880, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(6120, 180, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(6360, 500, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(6600, 360, 'ironBox3');
		ironBox.body.immovable = true;
		ironBox = platforms.create(6900, 240, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(7320, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(7560, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(7740, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(7860, 420, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(7980, 300, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(8400, 240, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(8640, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(8820, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(8820, 500, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(9000, 380, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(9180, 240, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(9420, 180, 'ironBox4');
		ironBox.body.immovable = true;
		ironBox = platforms.create(9840, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(10080, 180, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(10200, 360, 'ironBox2');
		ironBox.body.immovable = true;
		ironBox = platforms.create(10560, 300, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(10920, 450, 'ironBox1');
		ironBox.body.immovable = true;
		ironBox = platforms.create(11040, 360, 'ironBox3');
		ironBox.body.immovable = true;

	let dangerousObstaclesCoordinateY = game.world.height - 33;


	let acid = dangerousObstacles.create(240, dangerousObstaclesCoordinateY, 'acid');
		acid.body.immovable = true;
		acid = dangerousObstacles.create(4320, dangerousObstaclesCoordinateY, 'acid');
		acid.body.immovable = true;
		acid = dangerousObstacles.create(4560, dangerousObstaclesCoordinateY, 'acid');
		acid.body.immovable = true;
		acid = dangerousObstacles.create(4800, dangerousObstaclesCoordinateY, 'acid');
		acid.body.immovable = true;
		acid = dangerousObstacles.create(5040, dangerousObstaclesCoordinateY, 'acid');
		acid.body.immovable = true;
		acid = dangerousObstacles.create(8760, dangerousObstaclesCoordinateY, 'acid');
		acid.body.immovable = true;

	let lava = dangerousObstacles.create(1320, dangerousObstaclesCoordinateY, 'lava');
		lava.body.immovable = true;
		lava = dangerousObstacles.create(1560, dangerousObstaclesCoordinateY, 'lava');
		lava.body.immovable = true;
		lava = dangerousObstacles.create(6300, dangerousObstaclesCoordinateY, 'lava');
		lava.body.immovable = true;

	let frozenFlame = dangerousObstacles.create(2460, dangerousObstaclesCoordinateY, 'frozenFlame');
		frozenFlame.body.immovable = true;
		frozenFlame = dangerousObstacles.create(7680, dangerousObstaclesCoordinateY, 'frozenFlame');
		frozenFlame.body.immovable = true;

	let acidLava = dangerousObstacles.create(3240, dangerousObstaclesCoordinateY, 'acidLava');
		acidLava.body.immovable = true;
		acidLava = dangerousObstacles.create(9720, dangerousObstaclesCoordinateY, 'acidLava');
		acidLava.body.immovable = true;
		acidLava = dangerousObstacles.create(9960, dangerousObstaclesCoordinateY, 'acidLava');
		acidLava.body.immovable = true;
		acidLava = dangerousObstacles.create(10200, dangerousObstaclesCoordinateY, 'acidLava');
		acidLava.body.immovable = true;


	let woodenBox1 = simpleBox.create(840, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1260, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1260, 440, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1260, 500, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1260, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1620, 360, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1800, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(1800, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(2100, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(2820, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(3720, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(4020, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(5220, 500, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(5280, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(5280, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(5700, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(6000, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(6900, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(7320, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(7920, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(7920, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(8340, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(9060, 500, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(9060, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(9060, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(9120, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(9120, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(9420, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(10500, 560, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(10500, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(10860, 620, 'box1');
		woodenBox1.body.immovable = true;
		woodenBox1 = simpleBox.create(11160, 620, 'box1');
		woodenBox1.body.immovable = true;

	let woodenBox2 = simpleBox.create(5220, 320, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(5220, 380, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(5220, 440, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(7740, 0, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(7740, 60, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(7740, 120, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(9000, 440, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(9000, 500, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(9000, 560, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(9000, 620, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(10440, 440, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(10440, 500, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(10440, 560, 'box2');
		woodenBox2.body.immovable = true;
		woodenBox2 = simpleBox.create(10440, 620, 'box2');
		woodenBox2.body.immovable = true;

	//CONTROLS SETTING----------------------------------------------------------------------------------------------------------------------------------
	Controls = function (game, x, y, sprite) {
		Phaser.Sprite.call(this, game, x, y, sprite);

		this.scale.setTo(0.5, 0.5);
		this.anchor.x = 1.2;
		this.anchor.y = -0.2;
		this.fixedToCamera = true;
		this.inputEnabled = true;

		game.add.existing(this);
	}

	Controls.prototype = Object.create(Phaser.Sprite.prototype);
	Controls.prototype.constructor = Controls;

	playGame = new Controls(game, game.width, 0, 'playGame');
	playGame.events.onInputDown.add(function () {
		game.paused = false;
	}, this);

	pauseGame = new Controls(game, game.width - 50, 0, 'pauseGame');
	pauseGame.events.onInputDown.add(function () {
		game.paused = true;
	}, this);

	restartGame = new Controls(game, game.width - 100, 0, 'restartGame');
	restartGame.events.onInputDown.add(function () {
		location.reload();
	}, this);

	music = new Controls(game, game.width - 150, 0, 'music');
	music.events.onInputDown.add(function () {
		if (musicPlay) {
			environment.pause();
			musicPlay = false;
		} else {
			environment.play();
			musicPlay = true;
		}
	}, this);
	
	sound = new Controls(game, game.width - 200, 0, 'sound');
	sound.events.onInputDown.add(function () {
		if (soundPlay) {
			game.sound.mute = true;
			soundPlay = false;
		} else {
			game.sound.mute = false;
			soundPlay = true;
		}
			
	}, this);
	
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

		this.body.gravity.y = 500;
	    this.body.collideWorldBounds = true;

	    this.scale.setTo(0.15, 0.15);
	    this.hitPlatform;
	    this.hitSimpleBox;
	    this.playerWay = false; //false == right, true == left
		this.playerLife = 10;

		this.weapon = game.add.weapon(30, 'bullet');
	    this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
	    this.weapon.bulletSpeed = 500;
	    this.weapon.fireRate = 390;
	    this.weapon.trackSprite(this, 65, 37, true);
	    this.weaponSound = game.add.audio('pistol');
	    this.fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
	    this.weapon.onFire.add(function () {
		    						this.weaponSound.play();
		    					},this);

	    this.churchBell = game.add.audio('churchBell');
	    this.churchBelling = true;

	    this.rockBreak = game.add.audio('rockBreak');
	    this.rockBreaking = true;

	    this.weapon.bulletHit = function bulletExplosion(bullet) {
	    	let explosion = game.add.sprite(bullet.x, bullet.y, 'explosion');

			explosion.anchor.x = 0.5;
		    explosion.anchor.y = 0.5;
			explosion.animations.add('explosion');
			explosion.animations.play('explosion', 25, false, true);
	    }

	    this.gameOver = function gameOver() {

	    	gameOverText = game.add.text(game.width * 0.5, game.height * 0.5, 'game over\nYour score is ' + score, { fontSize: '100px', fill: 'yellow' });
	    	gameOverText.anchor.set(0.5, 0.5);
	    	gameOverText.fixedToCamera = true;

	    	game.paused = true;

	    	restartGame = new Controls(game, game.width * 0.5, game.height * 0.5, 'restartGame');
			restartGame.events.onInputDown.add(function () {
				location.reload();
			}, this);

			restartGame.anchor.set(0.5, 1.5);
			restartGame.scale.setTo(2, 2);
	    }

	    game.add.existing(this);
	};

	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;

	Player.prototype.update = function() {
		if (this.playerLife === 0) {
			this.gameOver();
		}

		if (this.x > 1700 && this.x < 2600 && this.churchBelling) {
			this.churchBell.play();
			this.churchBelling = false;

			game.time.events.add(Phaser.Timer.SECOND * 3, function () {
				this.churchBelling = true;
			}, this);
		}

		if (this.x > 30 && this.rockBreaking) {
				this.rockBreak.play();
				this.rockBreaking = false;
			game.time.events.add(Phaser.Timer.SECOND * 30, function () {
				this.rockBreaking = true;
			}, this);
		}

		game.physics.arcade.overlap(this.weapon.bullets, simpleBox, bulletHitPlatform, null, this);
		game.physics.arcade.overlap(this.weapon.bullets, platforms, bulletHitPlatform, null, this);
		game.physics.arcade.overlap(this, dangerousObstacles, hitDangerousObstacles, null, this);

	    function bulletHitPlatform (bullet, platform) {
	    	bullet.kill();
	    	this.weapon.bulletHit(bullet);
	    }

	    function hitDangerousObstacles (player, dangerousObstacles) {
	    	this.playerLife = 0;
	    }

		this.hitPlatform = game.physics.arcade.collide(this, platforms);
		this.hitSimpleBox = game.physics.arcade.collide(this, simpleBox);

		this.body.velocity.x = 0;

		if (cursors.left.isDown) {
			this.body.velocity.x = -200;
			this.playerWay = true;

			if (cursors.up.isDown) {
				this.animations.play('jumpLeft');
			} else {
				this.animations.play('runLeft');
			}

		} else if (cursors.right.isDown) {
			this.body.velocity.x = 200;
			this.playerWay = false;

			if (cursors.up.isDown) {
				this.animations.play('jumpRight');
			} else {
				this.animations.play('runRight');
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

			if (!this.body.touching.down && !this.hitPlatform && !this.hitSimpleBox) {

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
			this.body.velocity.y = -400;
		}

		if (cursors.up.isDown && this.body.touching.down && this.hitSimpleBox) {
			this.body.velocity.y = -400;
		}

	};


	dude = new Player(game, 20, 500);

	//MAN SETTING----------------------------------------------------------------------------------------------------------------------------------
	man = game.add.sprite(11100, 290, 'man');
	game.physics.enable(man, Phaser.Physics.ARCADE);
	man.collideWorldBounds = true;
	man.enableBody = true;
	man.scale.setTo(0.15, 0.15);

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

		this.dead = game.add.audio('zombieDead' + randomInteger(1,7));

		this.animations.add('deadLeft', Phaser.Animation.generateFrameNames('deadL_', 1, 12), 5, true);
	    this.body.gravity.y = 500;
	    // this.body.bounce.y = 0;// 0.7 + Math.random() * 0.2;
	    // this.body.bounce.x = 1;
	    this.body.collideWorldBounds = true;
	    this.body.velocity.x = 80;
	    this.zombieWay = false; //false == right, true == left

	    this.scale.setTo(0.15, 0.15);
	    game.add.existing(this);

	};

	Zombies.prototype = Object.create(Phaser.Sprite.prototype);
	Zombies.prototype.constructor = Zombies;

	Zombies.prototype.update = function() {

		game.physics.arcade.collide(this, platforms, function (zombie, platform) {
	        if (zombie.body.velocity.x > 0 && zombie.x > platform.x + (platform.width - zombie.width) || zombie.body.velocity.x < 0 && zombie.x < platform.x) {
	            zombie.body.velocity.x *= -1; 
	        }

	        if (zombie.body.velocity.x > 0) {
	        	zombie.zombieWay = false;
	            zombie.animations.play('walkRight');
	        } else {
	        	zombie.zombieWay = true;
	            zombie.animations.play('walkLeft');
	        }
	    });

		game.physics.arcade.collide(this, dude, attackZombies, null, this);

	 	function attackZombies(zombie, player) {
			if (this.zombieWay) {
				zombie.animations.stop();
				zombie.animations.play('attackLeft');
			} else {
				zombie.animations.stop();
				zombie.animations.play('attackRight');
			}
			
			if (dude.playerLife !== 0) {
				dude.playerLife -= 1;
			}
		}

		game.physics.arcade.overlap(this, dude.weapon.bullets, bulletHitZombie, null, this);
    
	    function bulletHitZombie (zombie, bullet) {
	    	bullet.kill();
	    	zombie.dead.play();
    		dude.weapon.bulletHit(bullet);
	    	zombie.kill();
	    }
	};


	zombie = new Zombies(game, 60, 250);
	zombie = new Zombies(game, 300, 370);
	zombie = new Zombies(game, 360, 80);
	zombie = new Zombies(game, 480, 80);
	zombie = new Zombies(game, 600, 260);
	zombie = new Zombies(game, 480, 460);
	zombie = new Zombies(game, 600, 460);
	zombie = new Zombies(game, 900, 460);
	zombie = new Zombies(game, 840, 140);
	zombie = new Zombies(game, 1100, 460);
	zombie = new Zombies(game, 1860, 140);
	zombie = new Zombies(game, 1980, 140);
	zombie = new Zombies(game, 2160, 460);
	zombie = new Zombies(game, 2280, 460);
	zombie = new Zombies(game, 2460, 320);
	zombie = new Zombies(game, 2580, 80);
	zombie = new Zombies(game, 2700, 80);
	zombie = new Zombies(game, 2580, 460);
	zombie = new Zombies(game, 2700, 460);
	zombie = new Zombies(game, 2880, 460);
	zombie = new Zombies(game, 3000, 460);
	zombie = new Zombies(game, 3240, 200);
	zombie = new Zombies(game, 3840, 200);
	zombie = new Zombies(game, 3960, 200);
	zombie = new Zombies(game, 3480, 460);
	zombie = new Zombies(game, 3780, 460);
	zombie = new Zombies(game, 4080, 460);
	zombie = new Zombies(game, 4620, 380);
	zombie = new Zombies(game, 4680, 380);
	zombie = new Zombies(game, 5040, 400);
	zombie = new Zombies(game, 5400, 260);
	zombie = new Zombies(game, 5400, 440);
	zombie = new Zombies(game, 5500, 440);
	zombie = new Zombies(game, 5760, 440);
	zombie = new Zombies(game, 5760, 440);
	zombie = new Zombies(game, 6060, 440);
	zombie = new Zombies(game, 6160, 440);
	zombie = new Zombies(game, 6120, 80);
	zombie = new Zombies(game, 6170, 80);
	zombie = new Zombies(game, 6360, 400);
	zombie = new Zombies(game, 6600, 260);
	zombie = new Zombies(game, 6900, 140);
	zombie = new Zombies(game, 6980, 140);
	zombie = new Zombies(game, 6540, 440);
	zombie = new Zombies(game, 6540, 440);
	zombie = new Zombies(game, 6960, 440);
	zombie = new Zombies(game, 6980, 440);
	zombie = new Zombies(game, 7380, 440);
	zombie = new Zombies(game, 7450, 440);
	zombie = new Zombies(game, 7860, 440);
	zombie = new Zombies(game, 7980, 440);
	zombie = new Zombies(game, 7980, 200);
	zombie = new Zombies(game, 8020, 200);
	zombie = new Zombies(game, 8400, 140);
	zombie = new Zombies(game, 8400, 80);
	zombie = new Zombies(game, 8400, 80);
	zombie = new Zombies(game, 9420, 80);
	zombie = new Zombies(game, 9480, 80);
	zombie = new Zombies(game, 9360, 440);
	zombie = new Zombies(game, 9480, 440);
	zombie = new Zombies(game, 10200, 260);
	zombie = new Zombies(game, 10860, 440);
	zombie = new Zombies(game, 10560, 440);
	zombie = new Zombies(game, 10560, 440);
	zombie = new Zombies(game, 11040, 440);

	//COINS SETTING----------------------------------------------------------------------------------------------------------------------------------
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
	    this.scale.setTo(0.7, 0.7);

	   	this.coinSound = game.add.audio("coinSound");

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

	let partOfCoins = [game, 840, 380, 'coin01', 1, 4, 3]; // arr = [game, x, y, sprite, type, verticalCount, horizontalCount]
	coin01 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin01.createCoin(partOfCoins);

	partOfCoins = [game, 1920, 320, 'coin02', 2, 5, 3];
	coin02 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin02.createCoin(partOfCoins);

	partOfCoins = [game, 2820, 260, 'coin05', 5, 6, 3];
	coin05 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin05.createCoin(partOfCoins);

	partOfCoins = [game, 3660, 380, 'coin010', 10, 4, 5];
	coin010 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin010.createCoin(partOfCoins);

	partOfCoins = [game, 4500, 380, 'coin020', 20, 2, 2];
	coin020 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin020.createCoin(partOfCoins);

	partOfCoins = [game, 4920, 320, 'coin050', 50, 3, 1];
	coin050 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin050.createCoin(partOfCoins);

	partOfCoins = [game, 5580, 380, 'coin1', 100, 4, 5];
	coin1 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin1.createCoin(partOfCoins);
	
	partOfCoins = [game, 7020, 380, 'coin050', 50, 4, 5];
	coin050 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin050.createCoin(partOfCoins);
	
	partOfCoins = [game, 8220, 380, 'coin050', 50, 4, 5];
	coin050 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin050.createCoin(partOfCoins);
	
	partOfCoins = [game, 9240, 260, 'coin2', 200, 6, 5];
	coin2 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin2.createCoin(partOfCoins);
	
	partOfCoins = [game, 10620, 200, 'coin1', 100, 7, 3];
	coin1 = new Coins(partOfCoins[0], partOfCoins[1], partOfCoins[2], partOfCoins[3], partOfCoins[4]);
	coin1.createCoin(partOfCoins);

	//TEXT SETTING-----------------------------------------------------------------------------------------------------------------------------------
	scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: 'yellow' });
	scoreText.fixedToCamera = true;

	//REMOVE CONTEXTMENU (right click on mouse)------------------------------------------------------------------------------------------------------
	game.canvas.oncontextmenu = function (event) {
		event.preventDefault (); 
	}

}

function update() {
	game.physics.arcade.overlap(dude, man, levelComplete, null, this);

	function levelComplete (girl, man) {
		let levelCompleteText = game.add.text(game.width * 0.5, game.height * 0.5, 'Level complete!\nYour score is ' + score, { fontSize: '100px', fill: 'yellow' });
		levelCompleteText.anchor.set(0.5, 0.5);
		levelCompleteText.fixedToCamera = true;

		game.paused = true;

		restartGame = new Controls(game, game.width * 0.5, game.height * 0.5, 'restartGame');
		restartGame.events.onInputDown.add(function () {
			location.reload();
		}, this);

		restartGame.anchor.set(0.5, 1.7);
		restartGame.scale.setTo(2, 2);
	}

}

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}