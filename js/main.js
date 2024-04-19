// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {
  this.playerStats = {
    health: 100,
    fun: 100
  }
};

// load asset files for our game
gameScene.preload = function() {
  
  // load assets
  this.load.image('backyard', 'assets/images/backyard.png');
  this.load.image('apple', 'assets/images/apple.png');
  this.load.image('candy', 'assets/images/candy.png');
  this.load.image('rotate', 'assets/images/rotate.png');
  this.load.image('toy', 'assets/images/rubber_duck.png');

  this.load.spritesheet('pet', 'assets/images/pet.png', {
    frameWidth: 97,
    frameHeight: 83,
    spacing: 1,
    margin: 1,
  })
};

// executed once, after assets were loaded
gameScene.create = function() {
  this.backyard = this.add.sprite(0, 0, 'backyard').setOrigin(0).setInteractive();

  this.pet = this.add.sprite(100, 200, 'pet').setInteractive();

  this.input.setDraggable(this.pet);

  this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  this.createUI();
};

gameScene.createUI = function() {
  this.apple = this.add.sprite(72, 560, 'apple').setInteractive();
  this.apple.on('pointerdown', this.pickItem);
  this.apple.gameStats = { health: 20, fun: 0 };

  this.candy = this.add.sprite(144, 560, 'candy').setInteractive();
  this.candy.on('pointerdown', this.pickItem);
  this.candy.gameStats = { health: -10, fun: 10 };

  this.toy = this.add.sprite(216, 560, 'toy').setInteractive();
  this.toy.on('pointerdown', this.pickItem);
  this.toy.gameStats = { health: 0, fun: 20 };

  this.rotate = this.add.sprite(288, 560, 'rotate').setInteractive();
  this.rotate.on('pointerdown', this.rotatePet)
}

gameScene.pickItem = function() {
  console.log(`You picked ${this.texture.key}`);
  console.log(this.gameStats);
}

gameScene.rotatePet = function() {
  console.log('Rotate')
}

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: gameScene,
  title: 'Virtual Pet',
  pixelArt: false,
  backgroundColor: 'ffffff'
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);

