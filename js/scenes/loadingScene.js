class LoadingScene extends Phaser.Scene {

    constructor() {
        super({ key: 'Loading' });
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
        this.anims.create({
            key: 'eat',
            frameRate: 10,
            frames: this.anims.generateFrameNames('pet', {
                frames: [1, 2, 3]
            }),
            yoyo: true,
            repeat: 0
        });

        this.scene.start('Home');
    }
}

const loadingScene = new LoadingScene();