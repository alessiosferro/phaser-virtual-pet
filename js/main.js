const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: [BOOT_SCENE, LOADING_SCENE, HOME_SCENE, GAME_SCENE],
  title: 'Virtual Pet',
  pixelArt: false,
  backgroundColor: 'ffffff'
});

