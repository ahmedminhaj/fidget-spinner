class Bar extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;
    if (!config.color) {
      config.color = 0xff0000;
    }
    if (!config.width) {
      config.width = 200;
    }
    if (!config.height) {
      config.height = config.width / 8;
    }

    this.barBackground = this.scene.add.graphics();
    this.barBackground.fillStyle(0xffc9c9c9);
    this.barBackground.fillRect(
      -2.5,
      -2.5,
      config.width + 5,
      config.height + 5
    );
    this.add(this.barBackground);
    this.barBackground.x = -config.width / 2;
    this.barBackground.y = -config.height / 2;

    this.graphics = this.scene.add.graphics();
    this.graphics.fillStyle(0xfff7d00a);
    this.graphics.fillRect(0, 0, config.width, config.height);
    this.add(this.graphics);
    this.graphics.x = -config.width / 2;
    this.graphics.y = -config.height / 2;

    if (config.x) {
      this.x = config.x;
    }
    if (config.y) {
      this.y = config.y;
    }
    this.scene.add.existing(this);
  }

  setPercent(per) {
    if (model.score == 0) {
      this.barBackground.scaleX = 0;
    } else {
      this.barBackground.scaleX = 1;
    }
    if (per > 1.01) {
      this.graphics.scaleX = 1;
      this.graphics.fillStyle(0xff3bff55);
      this.text1 = this.scene.add.text(0, 0, "CONGRTS", {
        fontFamily: "staatliches",
        fontSize: 22,
        color: "#f2ea4b",
        stroke: "#4d4d4d",
        strokeThickness: 1.5,
      });
      this.text1.setOrigin(0.5, 0.5);
      this.add(this.text1);
    } else {
      this.graphics.scaleX = per;
    }
  }
}
