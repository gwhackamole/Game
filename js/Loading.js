function Loading()
{
  var interactive = true
  this.stage = new PIXI.Stage(0xeeaa00, interactive)
  
  this.loadingText = new PIXI.Text("Loading...")
  this.loadingText.position.x = 400
  this.loadingText.position.y = 640
  this.loadingText.anchor.x = 0.5
  this.loadingText.anchor.y = 0.5
  this.stage.addChild(this.loadingText)
  
  var self = this
  
  // preload assets before starting the game
  var textures = []
  for (var name in Config.textures)
  {
    textures.push(Config.textures[name])
  }
  
  var assetLoader = new PIXI.AssetLoader(textures)
  assetLoader.onComplete = function()
  {
    // signal the loading end
    self.loadingFinished = true
  }
  assetLoader.load()
  
  // debug timer, uncomment to test with fixed loading time
  /*setTimeout(function()
  {
    self.loadingFinished = true
  }, 2000)*/
}

Loading.prototype.update = function(time, dt)
{
  // transition to board when the loading is done
  if (this.loadingFinished)
    return new Board()
  
  this.loadingText.rotation += dt
  
  return null
}

Loading.prototype.render = function(renderer)
{
  renderer.render(this.stage)
}
