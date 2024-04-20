class BootScene extends Phaser.Scene {

    constructor() {
        super({ key: 'Boot' });
    }

    preload() {
        this.load.image('toy', 'assets/images/rubber_duck.png');
    }

    create() {
        this.scene.start('Loading');
    }
}

const BOOT_SCENE = new BootScene();