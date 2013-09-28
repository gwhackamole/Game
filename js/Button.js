function Button( pixiStage, mole ){
  // load texture
  var t = {
    on  : PIXI.Texture.fromImage("asset/btnOn.png"),
    off : PIXI.Texture.fromImage("asset/btnOff.png")
  };

  // create pixi object for button 
  var button = new PIXI.Sprite(t.off); 
  button.buttonMode = true;
  button.anchor.x = 0.5;
  button.anchor.y = 0.5;
  button.position.x = 50;
  button.position.y = 50;
  button.interactive = true;

  button.mouseDown = button.touchStart = function(){
    this.setTexture(t.on);
  };


  // Add to pixi

  pixiStage.addChild( button );
}

Button.prototype = {
  update : function(time, dt){}
};
