function Mole(pixiStage, virtualPosition) {
  this.knockedOut = false;
  this.timeWhenHit = null;

  this.molePositions = {
    x: virtualPosition.x,
    y: virtualPosition.y,
    yRisenPosition: virtualPosition.y, // Position of the mole when risen
    yHiddenPosition: virtualPosition.y + 0.2 // Position of the mole when hidden
  };

  this.pixiMole = PIXI.Sprite.fromImage(Config.textures.mole);
  var moleRatio = this.pixiMole.height / this.pixiMole.width;
  this.pixiMole.height = 150;
  this.pixiMole.width = this.pixiMole.height / moleRatio;

  var projection = projectVirtualPosition(virtualPosition);
  this.pixiMole.position = projection.position
  this.pixiMole.scale = projection.scale
  this.pixiMole.anchor = new PIXI.Point(0.5, 0.5);
  var myMask = new PIXI.Graphics();
  myMask.beginFill();
  myMask.drawRect(
    this.pixiMole.position.x - this.pixiMole.width / 2,
    this.pixiMole.position.y - this.pixiMole.height / 2,
    this.pixiMole.width,
    this.pixiMole.height
  )
  myMask.drawElipse(projection.position.x, projection.position.y, 120, 100);
  myMask.endFill();
  this.pixiMole.mask = myMask;

  this.pixiHole = PIXI.Sprite.fromImage(Config.textures.hole);
  var holeRatio = this.pixiHole.height / this.pixiHole.width;
  this.pixiHole.width = this.pixiMole.width * 1.5;
  this.pixiHole.height = this.pixiHole.width * holeRatio;
  this.pixiHole.anchor = new PIXI.Point(0.5, 1);
  var holeVirtualPosition = {
    x: this.molePositions.x,
    y: this.molePositions.yHiddenPosition
  };
  var projection = projectVirtualPosition(holeVirtualPosition);
  this.pixiHole.position = projection.position
  this.pixiHole.scale = projection.scale

  pixiStage.addChild(this.pixiHole);
  pixiStage.addChild(this.pixiMole);

  Mole.prototype.hide.apply( this );
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
  
  var projection = projectVirtualPosition(this.molePositions)
  this.pixiMole.position.y = projection.position.y;
};

Mole.prototype.hide = function() {
  this.isHidden = true;
  this.pixiMole.alpha = 0.2
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
  this.pixiMole.rotation = Math.PI
  return true;
};

Mole.prototype.recover = function() {
  this.knockedOut = false;
  this.timeWhenHit = null;
  this.pixiMole.rotation = 0;
};

/**
 * If the mole is currently hittable
 */
Mole.prototype.isHittable = function() {
  return !this.isHidden && !this.knockedOut;
};
