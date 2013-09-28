function Board(stage)
{
  var boardBG = PIXI.Texture.fromImage("asset/board.png");
  var board = new PIXI.Sprite(boardBG);
  stage.addChild(board);

  var score = this.score = new ScoreBoard(stage, this);

  this.hammer = new Hammer(stage,this)

  this.moles = []
  this.buttons = []
  
  var mole = new Mole(stage)
  this.moles.push(mole)
  this.buttons = []

  var button = new Button(stage, mole)
  this.buttons.push(button)
  
  
  this.text = new PIXI.Text("Whack it!")
  this.text.setInteractive(true)
  stage.addChild(this.text)
  
  this.text.touchstart = function(touchData)
  {
  }
  
  this.text.touchend = function(touchData)
  {
  }
}

Board.prototype.update = function(time, dt)
{
  this.text.position.x = Math.sin(time) * 100 + 200
  this.text.position.y = 200
  
  // update buttons
  for (var i = 0; i < this.buttons.length; i++)
  {
    this.buttons[i].update(time, dt)
  }
  
  // update moles
  for (var i = 0; i < this.moles.length; i++)
  {
    this.moles[i].update(time, dt)
  }
  
  this.hammer.update(time, dt)
  this.score.update(time, dt)

  return this.score.time <= 0;
}

Board.prototype.hit = function(){
    this.moles.filter(function(m){
        return m.isHittable()
    }).forEach(function(m){
        m.hit()
    })
}

Board.prototype.countScoringMoles = function(){
    return this.moles.filter( function(m){ 
        return !m.knockedOut && !m.isHidden;
    }).length;
}
