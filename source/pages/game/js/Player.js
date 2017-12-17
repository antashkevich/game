'use strict';


let Player;  //class for player

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