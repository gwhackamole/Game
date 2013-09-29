function Board()
{
  var interactive = true
  this.stage = new PIXI.Stage(0x000000, interactive)
  
  var boardBG = PIXI.Texture.fromImage("asset/board.png");
  var board = new PIXI.Sprite(boardBG);
  this.stage.addChild(board);

  this.score = new ScoreBoard(this.stage, this);

  this.hammer = new Hammer(this.stage,this)

  this.moles = []
  this.buttons = []
  
  for (var i = 1; i <= 9; i++) {
    var moleVirtualPosition = {
      x: i % 3 ? ((i + 1) % 3 ? 0.25 : 0.5) : 0.75,
      y: i <= 3 ? 0.25 : (i <= 6 ? 0.5 : 0.75)
    }
    var mole = new Mole(this.stage, moleVirtualPosition);
    this.moles.push(mole)

    var buttonPosition = {
      x: 100 + i * 60,
      y: 1010
    }
    var button = new Button(this.stage, mole, buttonPosition);
    this.buttons.push(button)
  }
}

Board.prototype.update = function(time, dt)
{
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

  if (this.score.time <= 0)
    return new GameOver(this.score)
  
  return null
}

Board.prototype.hit = function( position ){
    this.moles.filter(function(m){
        return m.isHittable() && distance( m.molePositions, position ) < 0.1;
    }).forEach(function(m){
        m.hit()
    })
}

Board.prototype.countScoringMoles = function(){
    return this.moles.filter( function(m){ 
        return !m.knockedOut && !m.isHidden;
    }).length;
}

Board.prototype.render = function(renderer)
{
  renderer.render(this.stage)
}
