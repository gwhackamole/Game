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
  
  this.playRequested = false
  
  var self = this
  
  // preload assets before starting the game
  var textures = []
  for (var name in Config.textures)
  {
    textures.push(Config.textures[name])
  }
  
  function loadingFinished()
  {
    // remove loading text
    self.stage.removeChild(self.loadingText)
    
    // add play button
    var playTexture = PIXI.Texture.fromImage(Config.textures.playButton)
    var playButton = new PIXI.Sprite(playTexture)
    playButton.buttonMode = true;
    playButton.anchor.x = 0.5
    playButton.anchor.y = 0.5
    playButton.position.x = 400
    playButton.position.y = 640
    playButton.interactive = true
    self.stage.addChild(playButton)
    
    playButton.mousedown = playButton.touchstart = function()
    {
      self.playRequested = true
    }
  }
  
  var assetLoader = new PIXI.AssetLoader(textures)
  assetLoader.onComplete = loadingFinished
  assetLoader.load()
  
  // debug timer, uncomment to test with fixed loading time
  //setTimeout(loadingFinished, 2000)
}

Loading.prototype.update = function(time, dt)
{
  // transition to board when the loading is done
  if (this.playRequested)
    return new Board()
  
  this.loadingText.rotation += dt
  
  return null
}

Loading.prototype.render = function(renderer)
{
  renderer.render(this.stage)
}