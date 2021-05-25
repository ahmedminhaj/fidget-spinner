class Spinner extends Phaser.GameObjects.Container{
    constructor(config){
        super(config.scene)
        this.scene = config.scene
        this.scene.add.existing(this)
        
        this.fidget = this.scene.add.sprite(game.config.width/2, game.config.height/2, "spinner")
        Align.scaleToGameW(this.fidget, .4)
        this.fidget.angle = 130
        this.add(this.fidget)

        this.fidget.setInteractive()
        this.fidget.on('pointerdown', this.spinFidget, this)
    }

    spinFidget(degree){
        // console.log(degree)
        this.fidget.angle = degree
    }
}