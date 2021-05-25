class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
        this.load.image("spinner", "images/fidget-spinner.png");
        this.load.image("spinButton", "images/4.png");
        console.log("loaded")
    }

    create() {
        console.log("created")
        emitter = new Phaser.Events.EventEmitter()
        controller = new Controller()
        model.score = 0

        this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this })
        //this.alignGrid.showNumbers()

        this.spinSpeed = 0
        this.degree = 0
        this.num = 0
        this.spinCount = 2

        this.spinner = new Spinner({ scene: this })
        this.bar = new Bar({ scene: this })
        this.alignGrid.placeAtIndex(27, this.bar)

        var btnSpin = new FlatButton({ scene: this, key: "spinButton", text: 'Spin', event: 'spin_fidget' })
        this.alignGrid.placeAtIndex(93, btnSpin)
        emitter.on('spin_fidget', this.startSpin, this)

        this.scoreBox = new ScoreBox({ scene: this })
        this.alignGrid.placeAtIndex(16, this.scoreBox)
    }

    startSpin() {
        if (this.spinCount > 0) {
            this.spinSpeed = this.spinSpeed + 10000
            this.degree = (this.degree * 0.2) + 100
        } else {
            this.spinSpeed = this.spinSpeed + 0
            this.degree = this.degree + 0
        }

        this.num = 0.5
        this.spinCount -= 1
        console.log(this.spinCount)
    }

    update() {
        var totalSpin = (this.spinSpeed * this.degree) / 1000000
        emitter.emit(G.UP_POINTS, totalSpin)
        this.degree -= this.num
        this.spinSpeed -= this.degree

        var per = (model.score) / 100

        if (this.degree == 0 || this.degree <= 0) {
            this.degree = 0
            this.spinSpeed = this.spinSpeed - this.num
        }

        this.spinner.spinFidget(this.spinSpeed)
        this.bar.setPercent(per.toFixed(4))
    }

}