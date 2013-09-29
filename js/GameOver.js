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
  
  // add retry button
  var retryTexture = PIXI.Texture.fromImage(Config.textures.retryButton)
  var retryButton = new PIXI.Sprite(retryTexture)
  retryButton.buttonMode = true;
  retryButton.anchor.x = 0.5
  retryButton.anchor.y = 0.5
  retryButton.position.x = 400
  retryButton.position.y = 800
  retryButton.interactive = true
  this.stage.addChild(retryButton)
  
  this.retryPressed = false
  
  var self = this
  retryButton.mousedown = retryButton.touchstart = function()
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
