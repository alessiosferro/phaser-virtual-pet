class HomeScene extends Phaser.Scene {

    constructor() {
        super({ key: 'Home' });
    }

    init() {
        this.gameW = this.sys.game.config.width;
        this.gameH = this.sys.game.config.height;
    }

    create() {
        this.backyard = this.add.sprite(0, 0, 'backyard').setOrigin(0).setInteractive();

        this.backyard.on('pointerdown', () => {
            this.scene.start('Game');
        });

        const text = this.add.text(this.gameW / 2, this.gameH / 2, "VIRTUAL PET", {
           font: '40px Arial',
           fill: '#fff'
        }).setOrigin(.5);

        text.depth = 1;

        const rectangle = this.add.graphics();

        rectangle.fillStyle(0x000000, 0.5);
        rectangle.fillRect(
            this.gameW / 2 - text.width / 2 - 10,
            this.gameH / 2 - text.height / 2 - 10,
            text.width + 20,
            text.height + 20
        );
    }
}

const homeScene = new HomeScene();