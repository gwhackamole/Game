function Mole(pixiStage, virtualPosition) {
  this.stage = pixiStage
  this.knockedOut = false;
  this.timeWhenHit = null;

  this.molePositions = {
    x: virtualPosition.x,
    y: virtualPosition.y,
    yRisenPosition: virtualPosition.y - 0.1, // Position of the mole when risen
    yHiddenPosition: virtualPosition.y // Position of the mole when hidden
  };

  this.moleTexture = PIXI.Texture.fromImage(Config.textures.mole),
  this.deadMoleTexture = PIXI.Texture.fromImage(Config.textures.deadMole),
  
  this.pixiMole = new PIXI.Sprite(this.moleTexture);
  var moleRatio = this.pixiMole.height / this.pixiMole.width;
  this.pixiMole.height = 150;
  this.pixiMole.width = this.pixiMole.height / moleRatio;

  this.initialProjection = projectVirtualPosition(virtualPosition);
  this.pixiMole.position = this.initialProjection.position
  this.pixiMole.scale = this.initialProjection.scale
  this.pixiMole.anchor = new PIXI.Point(0.5, 0.1);
  
  this.computeMask()
  this.pixiMole.mask = this.holeMask

  this.pixiHole = PIXI.Sprite.fromImage(Config.textures.hole);
  var holeRatio = this.pixiHole.height / this.pixiHole.width;
  this.pixiHole.width = this.pixiMole.width * 1.5;
  this.pixiHole.height = this.pixiHole.width * holeRatio;
  this.pixiHole.anchor = new PIXI.Point(0.5, 0.5);
  
  this.pixiHole.position = new PIXI.Point(this.initialProjection.position.x, this.initialProjection.position.y)
  this.pixiHole.scale = new PIXI.Point(this.initialProjection.scale.x, this.initialProjection.scale.y)

  pixiStage.addChild(this.pixiHole);
  pixiStage.addChild(this.pixiMole);

  Mole.prototype.hide.apply( this );
}

Mole.prototype.computeMask = function()
{
  this.holeMask = new PIXI.Graphics();
  this.holeMask.beginFill();
  this.holeMask.drawRect(
    this.initialProjection.position.x - this.pixiMole.width * this.initialProjection.scale.x / 2,
    this.initialProjection.position.y - this.pixiMole.height * this.initialProjection.scale.y / 2,
    this.pixiMole.width * this.initialProjection.scale.x,
    this.pixiMole.height * this.initialProjection.scale.y * 0.5
  )
  this.holeMask.drawElipse(this.initialProjection.position.x, this.initialProjection.position.y, 120 * this.initialProjection.scale.x, 50 * this.initialProjection.scale.y);
  this.holeMask.endFill();
}

Mole.prototype.update = function(time, dt) {
  if (this.knockedOut && Date.now() * 0.001 - this.timeWhenHit >= 3) {
    this.recover();
  }

  // The following block deals with the animated transitions when
  // a mole goes up & down
  var moleYPosition = this.molePositions.y;
  var transitionDuration = 0.1; // seconds
  var newMoleYPosition;
  if (!this.isHidden) {
    if (moleYPosition !== this.molePositions.yRisenPosition) {
      newMoleYPosition = moleYPosition - dt / transitionDuration *
        (this.molePositions.yHiddenPosition - this.molePositions.yRisenPosition);
      this.molePositions.y = moleYPosition < this.molePositions.yRisenPosition ?
        this.molePositions.yRisenPosition : newMoleYPosition;
    }
  } else {
    if (moleYPosition !== this.molePositions.yHiddenPosition) {
      newMoleYPosition = moleYPosition - dt / transitionDuration *
        (this.molePositions.yRisenPosition - this.molePositions.yHiddenPosition);
      this.molePositions.y = moleYPosition > this.molePositions.yHiddenPosition ?
        this.molePositions.yHiddenPosition : newMoleYPosition;
   }
  }
  
  var yOffset = this.molePositions.yHiddenPosition - moleYPosition
  var projection = projectVirtualPosition({
    x: this.molePositions.x,
    y: this.molePositions.yHiddenPosition
  }, yOffset)
  this.pixiMole.position.y = projection.position.y;
};

Mole.prototype.hide = function() {
  this.isHidden = true;
  this.pixiMole.alpha = 0.6
};

Mole.prototype.rise = function() {
  this.isHidden = false;
  this.pixiMole.alpha = 1;
};

/**
 * Hits the mole.
 * @param {Boolean} If the mole was successfully hitt
 */
Mole.prototype.hit = function() {
  if (this.isHidden) {
    return false;
  }
  this.knockedOut = true;
  this.timeWhenHit = Date.now() * 0.001;
  
  this.pixiMole.setTexture(this.deadMoleTexture)
  this.pixiMole.mask = null
  this.pixiMole.mask = this.holeMask
  
  return true;
};

Mole.prototype.recover = function() {
  this.knockedOut = false;
  this.timeWhenHit = null;
  
  this.pixiMole.setTexture(this.moleTexture)
  this.pixiMole.mask = null
  this.pixiMole.mask = this.holeMask
};

/**
 * If the mole is currently hittable
 */
Mole.prototype.isHittable = function() {
  return !this.isHidden && !this.knockedOut;
};
