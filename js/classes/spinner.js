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

    this.tween = null
    this.tweenProgress = null
  }

  spinFidget(spin$) {
    console.log("spin fidget: " + spin$);
    let spinNum = spin$
    let spinduration = spin$/10
    // this.fidget.angle = degree;
    this.tween = this.scene.tweens.add({
      targets: this.fidget,
      duration: spinduration*1000,
      angle: 360 * spinNum,
      ease: Phaser.Math.Easing.Quadratic.Out,
      onUpdate: function(tween) {
        //console.log(tween.progress)
        this.tweenProgress = tween.progress
        console.log("progress:::::"+this.tweenProgress)
      }
    });
  }

  progressValue(){
    console.log("progress:::::"+this.tweenProgress)
  }
}
