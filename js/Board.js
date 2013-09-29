function Board()
{
  var interactive = true
  this.stage = new PIXI.Stage(0x000000, interactive)
  
  var boardBG = PIXI.Texture.fromImage(Config.textures.background)
  var board = new PIXI.Sprite(boardBG);
  this.stage.addChild(board);

  this.score = new ScoreBoard(this.stage, this);

  this.moles = []
  this.buttons = []
  
	var isSmartphone = navigator.userAgent.toLowerCase().indexOf('mobile') !== -1;

  for (var i = 1; i <= 9; i++) {
    var moleVirtualPosition = {
      x: i % 3 ? ((i + 1) % 3 ? 0.25 : 0.5) : 0.75,
      y: i <= 3 ? 0.25 : (i <= 6 ? 0.5 : 0.75)
    }
    var mole = new Mole(this.stage, moleVirtualPosition);
    this.moles.push(mole)

    var buttonPosition = {};
    buttonPosition.y = !isSmartphone ? 
      i <= 3 ? 1085 : (i <= 6 ? 1155 : 1225) :
      i <= 3 ? 900 : (i <= 6 ? 1040 : 1180);
    buttonPosition.x = !isSmartphone ? 
      i % 3 ? ((i + 1) % 3 ? 270 : 400) : 530 : 
      i % 3 ? ((i + 1) % 3 ? 190 : 400) : 610;
    var button = new Button(this.stage, mole, buttonPosition);
    this.buttons.push(button)
  }
  this.hammer = new Hammer(this.stage,this)
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
  
  var scoreIncrement = this.score.update(time, dt)
  this.hammer.update(time, dt, scoreIncrement)

  if (this.score.time <= 0)
    return new GameOver(this.score)

  //Re-order objects 
  
  return null
}

Board.prototype.hit = function( position ){
    var self = this
    return this.moles.filter(function(m){
        var molePosition = {
          x: m.molePositions.x,
          y: m.molePositions.yHiddenPosition,
        }
        return m.isHittable() && distance( molePosition, position ) < 0.1;
    }).some(function(m){
        self.score.decrementScore(100)
        return m.hit()
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
