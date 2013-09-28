function Board(stage)
{
  var boardBG = PIXI.Texture.fromImage("asset/board.png");
  var board = new PIXI.Sprite(boardBG);
  stage.addChild(board);

  var score = this.score = new ScoreBoard(stage, this);

  this.hammer = new Hammer(stage,this)

  this.moles = []
  this.buttons = []
  
  for (var i = 1; i <= 3; i++) {
    var moleVirtualPosition = {
      x: i % 3 ? ((i + 1) % 3 ? 0.25 : 0.5) : 0.75,
      y: i <= 3 ? 0.25 : (i <= 6 ? 0.5 : 0.75)
    }
    var mole = new Mole(stage, moleVirtualPosition);
    this.moles.push(mole)

    var buttonPosition = {
      x: 100 + i * 60,
      y: 1010
    }
    var button = new Button(stage, mole, buttonPosition);
    this.buttons.push(button)
  }

  this.text = new PIXI.Text("Whack it!")
  this.text.setInteractive(true)
  stage.addChild(this.text)
  
  this.text.touchstart = function(touchData)
  {
  }
  
  this.text.touchend = function(touchData)
  {
  }
  
  // background music
  var audio = new Audio()
  audio.src = "asset/gwhackamole.ogg"
  audio.loop = true
  audio.play()
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
