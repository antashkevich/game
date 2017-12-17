'use strict';


let Controls; //class for controls

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