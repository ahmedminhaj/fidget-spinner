class ScoreBox extends Phaser.GameObjects.Container{
    constructor(config){
        super(config.scene)
        this.scene = config.scene
        this.text1 = this.scene.add.text(0,0, "SPIN:0")
        this.text1.setOrigin(0.5, 0.5)
        this.add(this.text1)

        this.scene.add.existing(this)
        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this)
    }
    scoreUpdated(){
        if(model.score != 0.0){
            this.text1.setText("SPIN:"+(model.score).toFixed(1)+"K")
        }else{
            this.text1.setText("Press Spin Button")
        }       
    }
}