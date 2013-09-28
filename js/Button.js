function Button( pixiStage, mole ){
  // load texture
  var t = {
    on  : PIXI.Texture.fromImage("asset/btnOn.png"),
    off : PIXI.Texture.fromImage("asset/btnOff.png")
  };

  // create pixi object for button 
  var button = new PIXI.Sprite(t.off); 
  button.buttonMode = true;
  button.anchor.x = 0;
  button.anchor.y = 0;
  button.position.x = 375;
  button.position.y = 1120;
  button.interactive = true;

  button.mousedown = button.touchstart = function(){
    mole.hide();
    this.setTexture(t.on);
  };

  button.mouseup = button.touchend  = function(){
    mole.rise();
    this.setTexture(t.off);
  }

  // Add to pixi

  pixiStage.addChild( button );
}

Button.prototype = {
  update : function(time, dt){}
};
