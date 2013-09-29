function GameOver(score)
{
  var interactive = true
  this.stage = new PIXI.Stage(0xbb2222, interactive)
  
  this.text = new PIXI.Text("GAME OVER")
  this.text.position.x = 400
  this.text.position.y = 640
  this.text.anchor.x = 0.5
  this.text.anchor.y = 0.5
  this.stage.addChild(this.text)
  
  this.retryText = new PIXI.Text("retry!")
  this.retryText.position.x = 400
  this.retryText.position.y = 800
  this.retryText.anchor.x = 0.5
  this.retryText.anchor.y = 0.5
  this.stage.addChild(this.retryText)
  
  this.retryPressed = false
  
  var self = this
  this.retryText.mousedown = this.retryText.touchstart = function()
  {
    self.retryPressed = true
  }
}

GameOver.prototype.update = function(time, dt)
{
  // transition to board when the loading is done
  if (this.retryPressed)
    return new Board()
  
  this.text.position.x = 400 + Math.sin(time) * 50
  
  return null
}

GameOver.prototype.render = function(renderer)
{
  renderer.render(this.stage)
}
