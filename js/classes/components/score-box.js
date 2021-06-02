class ScoreBox extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;

    var textStyle = {
      fontFamily: "concert",
      fontSize: 28,
      color: "#18afb8",
      stroke: "#dbfdff",
      strokeThickness: 2,
    };

    this.text1 = this.scene.add.text(0, 0, "SPIN:0", textStyle);
    this.text1.setOrigin(0.5, 0.5);
    this.add(this.text1);

    this.scene.add.existing(this);
    emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
  }
  scoreUpdated() {
    if (model.score != 0) {
      this.text1.setText("SPIN: " + model.score);
    } else {
      this.text1.setText("Start Spin");
    }
  }
}
