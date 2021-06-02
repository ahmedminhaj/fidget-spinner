class Spinner extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;
    this.scene.add.existing(this);

    this.fidget = this.scene.add.sprite(
      game.config.width / 2,
      game.config.height / 2,
      "spinner"
    );
    Align.scaleToGameW(this.fidget, 0.4);
    this.fidget.angle = 0;
    this.add(this.fidget);

    this.fidget.setInteractive();
    this.fidget.on("pointerdown", this.spinFidget, this);
  }

  spinFidget(spin) {
    console.log("spin fidget: " + spin);
    // this.fidget.angle = degree;
    this.scene.tweens.add({
      targets: this.fidget,
      duration: 8000,
      angle: 320 * spin,
      ease: Phaser.Math.Easing.Quartic.Out,
    });
  }
}
