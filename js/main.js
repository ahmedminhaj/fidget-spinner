var game;
var model;
var emitter;
var G;
var controller;

window.onload = function () {
  var isMobile = navigator.userAgent.indexOf("Mobile");
  if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
  }
  if (isMobile == -1) {
    var config = {
      type: Phaser.AUTO,
      width: 480,
      height: 640,
      parent: "phaser-game",
      backgroundColor: "#dbdbdb",
      scene: [SceneMain],
    };
  } else {
    var config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#dbdbdb",
      parent: "phaser-game",
      scene: [SceneMain],
    };
  }
  G = new Constants();
  model = new Model();
  model.isMobile = isMobile;
  game = new Phaser.Game(config);
};
