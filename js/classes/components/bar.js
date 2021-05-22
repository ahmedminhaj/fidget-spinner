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
            config.height = config.width / 4;
        }



        this.graphics = this.scene.add.graphics();
        this.graphics.fillStyle(0xff0000);
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
        if (per > 1.01) {
            this.graphics.scaleX = 1;
            this.graphics.fillStyle(0xff3bff55);
            this.text1 = this.scene.add.text(0, 0, "CONGRTS")
            this.text1.setOrigin(0.5, 0.5)
            this.add(this.text1)
        } else {
            this.graphics.scaleX = per;
        }
    }
}