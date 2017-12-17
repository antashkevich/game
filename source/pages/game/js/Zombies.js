'use strict';


let Zombies; //class for zombie

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