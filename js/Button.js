function Button( pixiStage, mole, position ){
  var isSmartphone = navigator.userAgent.toLowerCase().indexOf('mobile') !== -1;
  // load texture
  var t = {
    on  : PIXI.Texture.fromImage(
      isSmartphone ? Config.textures.buttonOnBlack :  Config.textures.buttonOn
    ),
    off : PIXI.Texture.fromImage(
      isSmartphone ? Config.textures.buttonOffBlack :  Config.textures.buttonOff
    )
  };

  // create pixi object for button 
  var button = new PIXI.Sprite(t.off); 
  button.position.x = position.x;
  button.position.y = position.y;
  button.anchor.x = 0.5;
  button.anchor.y = 0.5;
  button.interactive = true;
  if (navigator.userAgent.toLowerCase().indexOf('mobile') !== -1) {
    button.scale = new PIXI.Point(2.55, 2.55);
  } else {
    button.scale = new PIXI.Point(1.2, 1.2);
  }

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
