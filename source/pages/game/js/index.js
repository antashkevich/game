import '../game.scss';

import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import bgMain from '../images/bgMain.png';
import explode from '../images/explode.png';
import bulletIcon from '../images/bullet.png';
import groundIcon2 from '../images/ground2.png';
import groundIcon4 from '../images/ground4.png';
import groundIcon5 from '../images/ground5.png';
import groundIcon6 from '../images/ground6.png';
import ironBoxIcon1 from '../images/ironBox1.png';
import ironBoxIcon2 from '../images/ironBox2.png';
import ironBoxIcon3 from '../images/ironBox3.png';
import ronBoxIcon4 from '../images/ironBox4.png';
import woodenBoxIcon from '../images/woodenBox.png';
import woodenBoxIcon2 from '../images/woodenBox2.png';
import acidIcon from '../images/acid.png';
import lavaIcon from '../images/lava.png';
import acidLavaIcon from '../images/acidLava.png';
import frozenFlameIcon from '../images/frozenFlame.png';
import restartIcon from '../images/restart.png';
import pauseIcon from '../images/pause.png';
import musicIcon from '../images/music.png';
import menuIcon from '../images/menuButton.png';
import scoreIcon from '../images/scoreBoard.png';
import soundIcon from '../images/sound.png';
import playIcon from '../images/play.png';
import manIcon from '../images/man.png';
import bgForTabScore from '../images/bgForTableScore.png';

import dudeSprite from '../images/dude_sprite.png';
import zombMale from '../images/zombieMale_sprite.png';
import zombFemale from '../images/zombieFemale_sprite.png';
import coin1Sprite from '../images/belarusianCoin1_sprite.png';
import coin2Sprite from '../images/belarusianCoin2_sprite.png';
import coin050Sprite from '../images/belarusianCoin050_sprite.png';
import coin020Sprite from '../images/belarusianCoin020_sprite.png';
import coin010Sprite from '../images/belarusianCoin010_sprite.png';
import coin05Sprite from '../images/belarusianCoin05_sprite.png';
import coin02Sprite from '../images/belarusianCoin02_sprite.png';
import coin01Sprite from '../images/belarusianCoin01_sprite.png';

import explodeIcon from '../images/explode.png';

import dudeSpriteJson from '../images/dude_sprite.json';
import zombFemaleJson from '../images/zombieFemale_sprite.json';
import zombMaleJson from '../images/zombieMale_sprite.json';

import rockBreakS from '../sounds/rockBreak.wav';
import churchBellS from '../sounds/churchBell.wav';
import pistolS from '../sounds/pistol.wav';
import zombieDeadS7 from '../sounds/zombieDead7.wav';
import zombieDeadS6 from '../sounds/zombieDead6.wav';
import zombieDeadS5 from '../sounds/zombieDead5.wav';
import zombieDeadS4 from '../sounds/zombieDead4.wav';
import zombieDeadS3 from '../sounds/zombieDead3.wav';
import zombieDeadS2 from '../sounds/zombieDead2.wav';
import zombieDeadS1 from '../sounds/zombieDead1.wav';
import ambient from '../sounds/ambientmain.wav';
import coinS from '../sounds/coin.wav';



'use strict';
const gameHeight = window.innerHeight > 660 ? 660 : window.innerHeight;

const game = new Phaser.Game(window.innerWidth, gameHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	let loadingText = game.add.text(game.width/2, game.height/2, 'Loading...', { fill: '#ffffff' });
	loadingText.anchor.setTo(0.5, 0.5);

    game.load.onLoadStart.add(function loadStart() {
	    loadingText.setText("Loading...");
	}, this);

    game.load.onFileComplete.add(function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
	    loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
	}, this);

    game.load.onLoadComplete.add(function loadComplete() {
    	loadingText.setText("Loading Completed.");
	}, this);

	this.load.image('sky', bgMain);
	this.load.image('ground2', groundIcon2);
	this.load.image('ground4', groundIcon4);
	this.load.image('ground5', groundIcon5);
	this.load.image('ground6', groundIcon6);
	this.load.image('ironBox1', ironBoxIcon1);
	this.load.image('ironBox2', ironBoxIcon2);
	this.load.image('ironBox3', ironBoxIcon3);
	this.load.image('ironBox4', ronBoxIcon4);
	this.load.image('box1', woodenBoxIcon);
	this.load.image('box2', woodenBoxIcon2);
	this.load.image('acid', acidIcon);
	this.load.image('lava', lavaIcon);
	this.load.image('acidLava', acidLavaIcon);
	this.load.image('frozenFlame', frozenFlameIcon);
	this.load.image('bullet', bulletIcon);
	this.load.image('restartGame', restartIcon);
	this.load.image('pauseGame', pauseIcon);
	this.load.image('playGame', playIcon);
	this.load.image('music', musicIcon);
	this.load.image('sound', soundIcon);
	this.load.image('menuButton', menuIcon);
	this.load.image('scoreBoard', scoreIcon);
	this.load.image('man', manIcon);
	this.load.image('bgForTableScore', bgForTabScore);

	this.load.atlas('dude', dudeSprite, dudeSpriteJson);
	this.load.atlas('zombieFemale', zombFemale, zombFemaleJson);
	this.load.atlas('zombieMale', zombMale, zombMaleJson);

	this.load.spritesheet('coin1', coin1Sprite, 68, 68);
	this.load.spritesheet('coin2', coin2Sprite, 68, 68);
	this.load.spritesheet('coin050', coin050Sprite, 68, 68);
	this.load.spritesheet('coin020', coin020Sprite, 68, 68);
	this.load.spritesheet('coin010', coin010Sprite, 68, 68);
	this.load.spritesheet('coin05', coin05Sprite, 68, 68);
	this.load.spritesheet('coin02', coin02Sprite, 68, 68);
	this.load.spritesheet('coin01', coin01Sprite, 68, 68);

	this.load.spritesheet('explosion', explodeIcon, 128, 128);

	this.load.audio('coinSound', coinS);
	this.load.audio('environment', ambient);
	this.load.audio('zombieDead1', zombieDeadS1);
	this.load.audio('zombieDead2', zombieDeadS2);
	this.load.audio('zombieDead3', zombieDeadS3);
	this.load.audio('zombieDead4', zombieDeadS4);
	this.load.audio('zombieDead5', zombieDeadS5);
	this.load.audio('zombieDead6', zombieDeadS6);
	this.load.audio('zombieDead7', zombieDeadS7);

	this.load.audio('pistol', pistolS);
	this.load.audio('churchBell', churchBellS);
	this.load.audio('rockBreak', rockBreakS);
}

function tAJAXStorage() {
	var self = this;

	self.hashStorage = {};
	
	$.ajax("https://fe.it-academy.by/AjaxStringStorage2.php",
		{type: "POST", cache: false, dataType: "json", data: {f: "READ", n: "Arniyazov_Atabay_Zombie_Apocalypse_Minsk"}, success: DataLoadedRead, error: ErrorHandler}
	);

	function DataLoadedRead(data) {			
		if (data !== " ") {
			self.hashStorage = JSON.parse(data.result);			
		} else if (data === " ") {
			$.ajax("https://fe.it-academy.by/AjaxStringStorage2.php",
				{type: "POST", cache: false, dataType: "json", data: {f: "INSERT", n: "Arniyazov_Atabay_Zombie_Apocalypse_Minsk", v: JSON.stringify(self.hashStorage)}, success: DataLoadedInsert, error: ErrorHandler}
			);

			function DataLoadedInsert(data) {

			}				
		}
	}

	self.addValue = function(key, value) {
		self.hashStorage[key] = value;
		addValueOnTheServer(self.hashStorage);
	}

	self.getValue = function(key) {
		if (key in self.hashStorage) {
			return self.hashStorage[key];
		} else {
			return undefined;
		}
	}

	self.deleteValue = function(key) {
		if (key in self.hashStorage) {
			delete self.hashStorage[key];
			addValueOnTheServer(self.hashStorage);
			return true;
		} else {
			return false;
		}
	}

	self.getKeys = function() {
		var keys = [];
		for (var key in self.hashStorage) {
			keys.push(key);
		}

		return keys;
	}
	// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// function that will store the modified hash on the server
	function addValueOnTheServer(hash) {
		var password = Math.random();

		$.ajax("https://fe.it-academy.by/AjaxStringStorage2.php",
			{type: "POST", cache: false, dataType: "json", data: {f: "LOCKGET", n: "Arniyazov_Atabay_Zombie_Apocalypse_Minsk", p: password}, success: DataLoadedLockget, error: ErrorHandler}
		);

		function DataLoadedLockget(data) {

			$.ajax("https://fe.it-academy.by/AjaxStringStorage2.php",
				{type: "POST", cache: false, dataType: "json", data: {f: "UPDATE", n: "Arniyazov_Atabay_Zombie_Apocalypse_Minsk", p: password, v: JSON.stringify(hash)}, success: DataLoadedUpdate, error: ErrorHandler}
			);

			function DataLoadedUpdate(data) {

			}
		}	
	}

	function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
		console.log(StatusStr + " " + ErrorStr);
	}
	// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}

let menuGroup;
let menuGroupOpen = false;
let menuButton;
let pauseGame;
let playGame;
let restartGame;

let scoreBoard;
let scoreBoardCreate = false;
let scoreBoardOpen = false;
let bgForScoreBoard;
let textScore0;
let textScore1;
let textScore2;
let textScore3;
let textScore4;
let textScore5;
let textScore6;
let textScore7;
let textScore8;
let textScore9;
let textScore10;
let textScore11;
let textScore12;
let textScore13;
let textScore14;
let textScore15;

let music;
let musicPlay = true;
let sound;
let soundPlay = true;

let dude;
let man;

let zombie;
let gameOverText;

let platforms;
let dangerousObstacles;
let simpleBox;

let cursors;

let coin1;
let coin2;
let coin050;
let coin020;
let coin010;
let coin05;
let coin02;
let coin01;

let environment;

let playerName;
let bestScores = [];
let best15Scores = '';
let scoreStorage = new tAJAXStorage();
let score = 0;
let scoreText;
let gameOverText1;
let gameOverText2;
let levelComplete1;
let levelComplete2;
let Player;
let Zombies;
let Coins;
let Controls;


function create() {
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

	menuGroup = game.add.group();

	menuButton = game.add.button(game.width - 25, 25, "menuButton");
	menuButton.scale.setTo(0.5, 0.5);
	menuButton.anchor.set(0.5, -0.1);

	menuButton.events.onInputDown.add(function () {
		if (game.camera.x > 0) {
			menuGroup.fixedToCamera = !menuGroup.fixedToCamera;	
		}

		if (!menuGroup.fixedToCamera) {
			if(menuGroup.y == 0){
				let menuTween = game.add.tween(menuGroup).to({
					y: 375     
				}, 500, Phaser.Easing.Bounce.Out, true);
			}
		}
	}, this);

	menuGroup.add(menuButton);

	playGame = game.add.button(game.width - 25, - 25, "playGame");
	playGame.anchor.set(0.5);
	playGame.scale.setTo(0.5, 0.5);

	playGame.events.onInputDown.add(function () {
		game.paused = false;
	}, this);

	menuGroup.add(playGame);

	pauseGame = game.add.button(game.width - 25, - 75, "pauseGame");
	pauseGame.anchor.set(0.5);
	pauseGame.scale.setTo(0.5, 0.5);

	pauseGame.events.onInputDown.add(function () {
		game.paused = true;
	}, this);

	menuGroup.add(pauseGame);

	restartGame = game.add.button(game.width - 25, - 125, "restartGame");
	restartGame.anchor.set(0.5);
	restartGame.scale.setTo(0.5, 0.5);

	restartGame.events.onInputDown.add(function () {
		location.reload();
	}, this);

	menuGroup.add(restartGame);

	music = game.add.button(game.width - 25, - 175, "music");
	music.anchor.set(0.5);
	music.scale.setTo(0.5, 0.5);

	music.events.onInputDown.add(function () {
		if (musicPlay) {
			environment.pause();
			musicPlay = false;
		} else {
			environment.play();
			musicPlay = true;
		}
	}, this);

	menuGroup.add(music);

	sound = game.add.button(game.width - 25, - 225, "sound");
	sound.anchor.set(0.5);
	sound.scale.setTo(0.5, 0.5);

	sound.events.onInputDown.add(function () {
		if (soundPlay) {
			game.sound.mute = true;
			soundPlay = false;
		} else {
			game.sound.mute = false;
			soundPlay = true;
		}
			
	}, this);

	menuGroup.add(sound);

	scoreBoard = game.add.button(game.width - 25, - 275, "scoreBoard");
	scoreBoard.anchor.set(0.5);
	scoreBoard.scale.setTo(0.5, 0.5);

	let createScoreMenu = function createScoreMenu() {
		for (var key in scoreStorage.hashStorage) {
			bestScores.push([key, scoreStorage.hashStorage[key]]);
		}

		bestScores.sort(function (a, b) {
			return a[1] - b[1];
		})

		bestScores.reverse();
		
		bgForScoreBoard = game.add.sprite(game.camera.view.width/2 -200, game.camera.view.height/2 - 250, 'bgForTableScore');
		bgForScoreBoard.inputEnabled = true;
		bgForScoreBoard.fixedToCamera = true;

		textScore0 = game.add.text(bgForScoreBoard.x + 60, bgForScoreBoard.y + 10, 'Highscore Table', { fontSize: '32px', fill: 'red' });
		textScore0.fixedToCamera = true;
		textScore1 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 60, '1) ' + bestScores[0][0] + ' - ' + bestScores[0][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore1.fixedToCamera = true;
		textScore2 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 88, '2) ' + bestScores[1][0] + ' - ' + bestScores[1][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore2.fixedToCamera = true;
		textScore3 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 116, '3) ' + bestScores[2][0] + ' - ' + bestScores[2][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore3.fixedToCamera = true;
		textScore4 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 144, '4) ' + bestScores[3][0] + ' - ' + bestScores[3][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore4.fixedToCamera = true;
		textScore5 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 172, '5) ' + bestScores[4][0] + ' - ' + bestScores[4][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore5.fixedToCamera = true;
		textScore6 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 200, '6) ' + bestScores[5][0] + ' - ' + bestScores[5][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore6.fixedToCamera = true;
		textScore7 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 228, '7) ' + bestScores[6][0] + ' - ' + bestScores[6][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore7.fixedToCamera = true;
		textScore8 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 256, '8) ' + bestScores[7][0] + ' - ' + bestScores[7][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore8.fixedToCamera = true;
		textScore9 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 284, '9) ' + bestScores[8][0] + ' - ' + bestScores[8][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore9.fixedToCamera = true;
		textScore10 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 312, '10) ' + bestScores[9][0] + ' - ' + bestScores[9][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore10.fixedToCamera = true;
		textScore11 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 340, '11) ' + bestScores[10][0] + ' - ' + bestScores[10][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore11.fixedToCamera = true;
		textScore12 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 368, '12) ' + bestScores[11][0] + ' - ' + bestScores[11][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore12.fixedToCamera = true;
		textScore13 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 396, '13) ' + bestScores[12][0] + ' - ' + bestScores[12][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore13.fixedToCamera = true;
		textScore14 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 424, '14) ' + bestScores[13][0] + ' - ' + bestScores[13][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore14.fixedToCamera = true;
		textScore15 = game.add.text(bgForScoreBoard.x + 30, bgForScoreBoard.y + 452, '15) ' + bestScores[14][0] + ' - ' + bestScores[14][1], { font: "24px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: bgForScoreBoard.width, align: "center" });
		textScore15.fixedToCamera = true;
	};

	scoreBoard.events.onInputDown.add(function () {
		if (!scoreBoardCreate) {
			createScoreMenu();
			scoreBoardCreate = true;
		}

		if (scoreBoardOpen) {
			bgForScoreBoard.visible = false;
			textScore0.visible = false;
			textScore1.visible = false;
			textScore2.visible = false;
			textScore3.visible = false;
			textScore4.visible = false;
			textScore5.visible = false;
			textScore6.visible = false;
			textScore7.visible = false;
			textScore8.visible = false;
			textScore9.visible = false;
			textScore10.visible = false;
			textScore11.visible = false;
			textScore12.visible = false;
			textScore13.visible = false;
			textScore14.visible = false;
			textScore15.visible = false;
			game.paused = false;

		} else {
			bgForScoreBoard.visible = true;
			textScore0.visible = true;
			textScore1.visible = true;
			textScore2.visible = true;
			textScore3.visible = true;
			textScore4.visible = true;
			textScore5.visible = true;
			textScore6.visible = true;
			textScore7.visible = true;
			textScore8.visible = true;
			textScore9.visible = true;
			textScore10.visible = true;
			textScore11.visible = true;
			textScore12.visible = true;
			textScore13.visible = true;
			textScore14.visible = true;
			textScore15.visible = true;
			game.paused = true;
		}

		scoreBoardOpen = !scoreBoardOpen;
	}, this);

	menuGroup.add(scoreBoard);
	
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

	levelComplete1 = game.add.text(20, 50, 'Level complete!', { font: "85px Arial Black", fill: "#c51b7d" });
	levelComplete1.stroke = "#de77ae";
	levelComplete1.strokeThickness = 16;
	levelComplete1.setShadow(5, 5, "#black", 2, false, true);
	levelComplete2 = game.add.text(200, 300, "Your score is " + score, { font: "85px Arial Black", fill: "#c51b7d" });
	levelComplete2.stroke = "#de77ae";
	levelComplete2.strokeThickness = 16;
	levelComplete2.setShadow(5, 5, "#black", 2, false, true);
	game.physics.arcade.enable([ levelComplete1, levelComplete2 ]);
	levelComplete1.body.velocity.setTo(0, 200);
	levelComplete1.body.collideWorldBounds = true;
	levelComplete1.body.bounce.set(1);
	levelComplete1.alpha = 0;
	levelComplete1.fixedToCamera = true;
	levelComplete2.body.velocity.setTo(0, -100);
	levelComplete2.body.collideWorldBounds = true;
	levelComplete2.body.bounce.set(1);
	levelComplete2.alpha = 0;
	levelComplete2.fixedToCamera = true;

	//REMOVE CONTEXTMENU (right click on mouse)------------------------------------------------------------------------------------------------------
	game.canvas.oncontextmenu = function (event) {
		event.preventDefault (); 	}


	//ASK PLAYERS NAME-------------------------------------------------------------------------------------------------------------------------------
	playerName = prompt('What is your name?', "Borodach");

}

function update() {
	if (game.camera.x > 0 && !menuGroupOpen) {
		menuGroup.fixedToCamera = !menuGroup.fixedToCamera;
		menuButton.anchor.set(0.5);
		menuGroupOpen = !menuGroupOpen;
	}

	game.physics.arcade.collide(levelComplete1, levelComplete2);

	game.physics.arcade.overlap(dude, man, levelComplete, null, this);

	function levelComplete (girl, man) {
		scoreStorage.addValue(playerName, score);

		levelComplete1.fixedToCamera = false;
		levelComplete2.fixedToCamera = false;
		levelComplete1.alpha = 1;
		levelComplete2.alpha = 1;
		levelComplete2.setText("Your score is " + score);

		restartGame = new Controls(game, game.width * 0.5, game.height * 0.5, 'restartGame');
		restartGame.events.onInputDown.add(function () {
			location.reload();
		}, this);

		restartGame.anchor.set(-1.5, 2.5);
		restartGame.scale.setTo(1.5, 1.5);
	}

}

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}