function Button( pixiStage, mole, position ){
  // load texture
  var t = {
    on  : PIXI.Texture.fromImage(Config.textures.buttonOn),
    off : PIXI.Texture.fromImage(Config.textures.buttonOff)
  };

  // create pixi object for button 
  var button = new PIXI.Sprite(t.off); 
  button.anchor.x = 0;
  button.anchor.y = 0;
  button.position.x = position.x;
  button.position.y = position.y;
  button.interactive = true;

  button.mousedown = button.touchstart = function(){
    mole.rise();
    this.setTexture(t.on);
  };

  button.mouseup = button.touchend  = function(){
    mole.hide();
    this.setTexture(t.off);
  };

  button.mouseupoutside = button.touchendoutside = function(){
    mole.hide();
    this.setTexture(t.off);
  }

    // Add to pixi

  pixiStage.addChild( button );
}

Button.prototype = {
  update : function(time, dt){}
};
