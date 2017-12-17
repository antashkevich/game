'use strict';


let Man;  //class for player

Man = function (game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'man');
	game.physics.enable(this, Phaser.Physics.ARCADE);


	this.collideWorldBounds = true;
	this.enableBody = true;
	this.animations.add('idle', Phaser.Animation.generateFrameNames('man_', 1, 10), 10, true);

	this.body.gravity.y = 500;
	this.body.collideWorldBounds = true;

	this.scale.setTo(0.15, 0.15);

	game.add.existing(this);
};

Man.prototype = Object.create(Phaser.Sprite.prototype);
Man.prototype.constructor = Man;

Man.prototype.update = function() {
	game.physics.arcade.collide(this, platforms);
	this.animations.play('idle');

	game.physics.arcade.collide(this, dude, levelComplete, null, this);

	function levelComplete (man, girl) {

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

	function hitDangerousObstacles (player, dangerousObstacles) {
		this.playerLife = 0;
	}
};