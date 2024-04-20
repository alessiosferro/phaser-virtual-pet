class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.playerStats = {
      health: 100,
      fun: 100
    }

    this.isUiBlocked = false;
  }

  preload() {
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
  }

  create() {
    this.backyard = this.add.sprite(0, 0, 'backyard').setOrigin(0).setInteractive();
    this.backyard.on('pointerdown', this.placeItem, this);

    this.pet = this.add.sprite(100, 200, 'pet').setInteractive();

    this.input.setDraggable(this.pet);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.createUI();

    this.pet.on('animationcomplete', () => {
      this.pet.setFrame(0);

      Object.keys(this.selectedItem.spriteStats).forEach(stat => {
        this.playerStats[stat] += this.selectedItem.spriteStats[stat];
      });

      this.placedItem.destroy();

      this.resetUI();
    });
  }

  createUI() {
    // this: Scene

    this.apple = this.add.sprite(72, 560, 'apple').setInteractive();
    this.apple.on('pointerdown', this.selectButton);
    this.apple.spriteStats = { health: 20  };

    this.candy = this.add.sprite(144, 560, 'candy').setInteractive();
    this.candy.on('pointerdown', this.selectButton);
    this.candy.spriteStats = { health: -10, fun: 10 };

    this.toy = this.add.sprite(216, 560, 'toy').setInteractive();
    this.toy.on('pointerdown', this.selectButton);
    this.toy.spriteStats = { fun: 20 };

    this.rotate = this.add.sprite(288, 560, 'rotate').setInteractive();
    this.rotate.on('pointerdown', this.rotatePet);
    this.rotate.spriteStats = { fun: 20 };

    this.uiButtons = [
      this.apple,
      this.candy,
      this.toy,
      this.rotate
    ];


    this.anims.create({
      key: 'eat',
      frameRate: 7,
      frames: this.anims.generateFrameNames('pet', {
        frames: [1, 2, 3]
      }),
      yoyo: true,
      repeat: 0
    });

  }

  resetUI() {
    // this: Scene

    this.isUiBlocked = false;

    this.uiButtons.forEach(button => {
      button.alpha = 1;
    });

    this.selectedItem = null;
  }

  selectButton() {
    // this: Sprite
    if (this.scene.isUiBlocked) return;

    this.scene.resetUI();
    this.scene.selectedItem = this;
    this.alpha = .5;
  }

  rotatePet() {
    // this: Sprite
    if (this.scene.isUiBlocked) return;

    this.scene.resetUI();
    this.scene.isUiBlocked = true;
    this.alpha = .5;

    this.scene.tweens.add({
      targets: this.scene.pet,
      duration: 1000,
      angle: 720,
      onComplete: () => {
        this.scene.playerStats.fun += this.spriteStats.fun;
        this.scene.resetUI();
      }
    })
  }

  placeItem(pointer, placeX, placeY) {
    // this: Scene
    if (!this.selectedItem || this.isUiBlocked) return;

    this.placedItem = this.add.sprite(placeX, placeY, this.selectedItem.texture.key);

    this.isUiBlocked = true;

    this.tweens.add({
      duration: 800,
      targets: this.pet,
      x: placeX,
      y: placeY - 15,
      onComplete: () => {
        this.pet.anims.play('eat');
      }
    });
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: new Game(),
  title: 'Virtual Pet',
  pixelArt: false,
  backgroundColor: 'ffffff'
});

