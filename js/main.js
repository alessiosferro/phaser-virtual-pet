const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: [loadingScene, homeScene, gameScene],
  title: 'Virtual Pet',
  pixelArt: false,
  backgroundColor: 'ffffff'
});

