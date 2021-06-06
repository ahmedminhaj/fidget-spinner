class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }

  preload() {
    this.load.image("spinner", "images/fidget-spinner.png");
    this.load.image("spinButton", "images/4.png");
    this.load.image("swipeArrow", "images/pointer-cursor1.png");
    this.loadFont("concert", "fonts/ConcertOne.ttf");
    this.loadFont("staatliches", "fonts/Staatliches.ttf");
    this.load.scenePlugin({
      key: "rexgesturesplugin",
      url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js",
      sceneKey: "rexGestures",
    });
    console.log("loaded");
  }

  create() {
    emitter = new Phaser.Events.EventEmitter();
    controller = new Controller();
    model.score = 0;

    this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
    //this.alignGrid.showNumbers();

    this.totalFidgetSpin = 0;
    this.spinCount = 5;

    this.spinner = new Spinner({ scene: this });
    this.bar = new Bar({ scene: this });
    this.alignGrid.placeAtIndex(27, this.bar);

    this.swipeRight = this.add.sprite(
      game.config.width * 0.5,
      game.config.height * 0.8,
      "swipeArrow"
    );
    Align.scaleToGameW(this.swipeRight, 0.1);

    this.scoreBox = new ScoreBox({ scene: this });
    this.alignGrid.placeAtIndex(16, this.scoreBox);

    this.swipeInput = this.rexGestures.add
      .swipe({ velocityThreshold: 1000 })
      .on(
        "swipe",
        function (swipe) {
          // console.log(`swipe, v = ${swipe.dragVelocity}\n`);
          // console.log(dumpDirectionStates(this.swipeInput));
          if (dumpDirectionStates(this.swipeInput) == "right") {
            if (this.spinCount > 0) {
              this.startSpin(swipe.dragVelocity);
            }
          }
        },
        this
      );

    var textStyle = {
      fontFamily: "concert",
      fontSize: 22,
      color: "#8c8c8c",
      stroke: "#ffffff",
      strokeThickness: 1,
    };

    this.swipeText = this.add.text(0, 0, "Swipe left to right", textStyle);
    this.swipeText.setOrigin(0.5, 0.5);
    this.alignGrid.placeAtIndex(104, this.swipeText);

    emitter.emit(G.UP_POINTS, this.totalFidgetSpin);

    console.log("created");
  }

  update() {
    var per = model.score / 1000;
    this.bar.setPercent(per);

    if (this.spinCount > 0) {
      this.swipeRight.x += 2;
      if (this.swipeRight.x > game.config.width * 0.5 + 50) {
        this.swipeRight.x = game.config.width * 0.5 - 50;
      }
    } else {
      this.swipeRight.alpha = 0;
    }
    // let spinProgress = this.spinner.progressValue()
    // console.log("progress:::::"+spinProgress)
  }

  startSpin(swipeVelocity) {
    this.totalFidgetSpin = (swipeVelocity / 50) | 0;
    if (this.spinCount > 0) {
      this.totalFidgetSpin += this.totalFidgetSpin;
      this.spinCount -= 1;
      this.swipeText.setText("Swipe Left: " + this.spinCount);
      emitter.emit(G.UP_POINTS, this.totalFidgetSpin);
    } else {
      this.totalFidgetSpin = this.totalFidgetSpin;
    }

    this.spinner.spinFidget(this.totalFidgetSpin);
    // this.spinner.progressValue()
  }

  loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont
      .load()
      .then(function (loaded) {
        document.fonts.add(loaded);
      })
      .catch(function (error) {
        return error;
      });
  }
}

var directions = ["left", "right", "up", "down"];
var dumpDirectionStates = function (swipe) {
  var s = "";
  var dir;
  for (var i = 0, cnt = directions.length; i < cnt; i++) {
    dir = directions[i];
    if (swipe[dir]) {
      s += dir;
    }
  }
  // console.log(s);
  return s;
};
