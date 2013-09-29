function Mole(pixiStage, virtualPosition) {
  this.pixiMole = PIXI.Sprite.fromImage(Config.textures.mole);
  var ratio = this.pixiMole.height / this.pixiMole.width;
  this.pixiMole.height = 150;
  this.pixiMole.width = this.pixiMole.height / ratio;

  this.isHidden = false;
  this.knockedOut = false;
  this.timeWhenHit = null;

  this.molePositions = {
    x: virtualPosition.x,
    y: virtualPosition.y,
    yRisenPosition: virtualPosition.y, // Position of the mole when risen
    yHiddenPosition: virtualPosition.y + 0.05 // Position of the mole when hidden
  };

  var pixiPosition = doTransform(virtualPosition);
  this.pixiMole.position = new PIXI.Point(
    pixiPosition.x, pixiPosition.y
  );
  this.pixiMole.anchor = new PIXI.Point(0.5, 0.5);

  pixiStage.addChild(this.pixiMole);
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
  var transformedPosition = doTransform({
    x: this.molePositions.x,
    y: this.molePositions.y
  });
  this.pixiMole.position.y = transformedPosition.y;

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
