function Board(stage)
{
  //this.hammer = new Hammer(stage)
  
  this.moles = []
  this.buttons = []
  
  var mole = new Mole(stage)
  this.moles.push(mole)
  /*var button = new Button(stage, mole)

  this.buttons.push(button)*/
  
  this.score = 0
  
  this.text = new PIXI.Text("Whack it!")
  this.text.setInteractive(true)
  stage.addChild(this.text)
  
  this.text.touchstart = function(touchData)
  {
    stage.setBackgroundColor(0xff0000)
  }
  
  this.text.touchend = function(touchData)
  {
    stage.setBackgroundColor(0x00ff00)
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
  
  //this.hammer.update(time, dt)
}
