function createGameOver(){
  var stage = new PIXI.Stage(0xFFFFFF, interactive);

  var gameOverText = new PIXI.Text("GAME OVER");

  stage.addChild(gameOverText);

  return stage;
}

