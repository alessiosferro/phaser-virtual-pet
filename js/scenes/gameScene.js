class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.playerStats = {
            health: 100,
            fun: 100
        }

        this.isUiBlocked = false;

        this.hud = {
            healthText: null,
            funText: null
        };

        this.decayRates = {
            health: -5,
            fun: -2
        };

        this.gameOver = false;
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

            this.updateStats(this.selectedItem.spriteStats);

            this.placedItem.destroy();

            this.resetUI();
        });

        this.time.addEvent({
            repeat: -1,
            delay: 1000,
            callback: () => this.updateStats(this.decayRates)
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

        this.createHud();
    }

    updateStats(stats) {
        if (this.gameOver) return;

        this.playerStats = Object.entries(this.playerStats)
            .filter(([key]) => stats.hasOwnProperty(key))
            .reduce((acc, [key, value]) => ({
                ...acc,
                [key]: value + stats[key]
            }), {});

        this.refreshHud();

        this.gameOver = this.isGameOver();

        if (this.gameOver) {
            this.onGameOver();
        }
    }

    isGameOver() {
        return Object.values(this.playerStats).some(stat => stat <= 0);
    }

    onGameOver() {
        // this: Scene
        this.isUiBlocked = true;

        this.pet.setFrame(4);

        this.time.addEvent({
            delay: 2000,
            repeat: 0,
            callback: () => this.scene.start('Home')
        });
    }

    createHud() {
        this.hud.healthText = this.add.text(20, 20, `Health: ${this.playerStats.health}`, {
            font: "24px Arial",
            fill: "#ffffff"
        });

        this.hud.funText = this.add.text( 180, 20, `Fun: ${this.playerStats.fun}`, {
            font: "24px Arial",
            fill: '#ffffff'
        })
    }

    refreshHud() {
        this.hud.healthText.setText(`Health: ${this.playerStats.health}`);
        this.hud.funText.setText(`Fun: ${this.playerStats.fun}`);
    }

    resetUI() {
        // this: Scene

        this.isUiBlocked = false;

        this.uiButtons.forEach(button => {
            button.alpha = 1;
        });

        this.selectedItem = null;

        this.refreshHud();
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
        if (this.gameOver || this.scene.isUiBlocked) return;

        this.scene.resetUI();
        this.scene.isUiBlocked = true;
        this.alpha = .5;

        this.scene.tweens.add({
            targets: this.scene.pet,
            duration: 600,
            angle: 360,
            onComplete: () => {
                this.scene.updateStats(this.spriteStats);
                this.scene.resetUI();
            },
        })
    }

    placeItem(pointer, placeX, placeY) {
        // this: Scene
        if (this.gameOver || !this.selectedItem || this.isUiBlocked) return;

        this.placedItem = this.add.sprite(placeX, placeY, this.selectedItem.texture.key);

        this.isUiBlocked = true;

        this.tweens.add({
            duration: 600,
            targets: this.pet,
            x: placeX,
            y: placeY - 15,
            onComplete: () => {
                this.pet.anims.play('eat');
            }
        });
    }
}

const gameScene = new GameScene();