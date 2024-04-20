class LoadingScene extends Phaser.Scene {

    constructor() {
        super({ key: 'Loading' });
    }

    preload() {
        this.add.sprite(this.sys.game.config.width / 2, 250, 'toy');
        this.drawProgressBar();

        this.load.image('backyard', 'assets/images/backyard.png');
        this.load.image('apple', 'assets/images/apple.png');
        this.load.image('candy', 'assets/images/candy.png');
        this.load.image('rotate', 'assets/images/rotate.png');

        this.load.spritesheet('pet', 'assets/images/pet.png', {
            frameWidth: 97,
            frameHeight: 83,
            spacing: 1,
            margin: 1,
        });
    }

    drawProgressBar() {
        const progressBarBg = this.add.graphics();
        const width = 200;
        const height = 30;

        progressBarBg.fillStyle(0xDDDDDD, 1);
        progressBarBg.fillRect(
            this.sys.game.config.width / 2 - width / 2,
            this.sys.game.config.height / 2 - height / 2,
            width,
            height
        );

        const progressBar = this.add.graphics();
        progressBar.setPosition(
            this.sys.game.config.width / 2 - width / 2,
            this.sys.game.config.height / 2 - height / 2,
        );

        this.load.on('progress', (progress) => {
            progressBar.clear();
            progressBar.fillStyle(0x00FF00, 1);
            progressBar.fillRect(
                0,
                0,
                progress * width,
                height
            );
        });
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

const LOADING_SCENE = new LoadingScene();