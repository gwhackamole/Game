function Mole(pixiStage) {
  this.pixiMole = PIXI.Sprite.fromImage('assets/mole.png');
  var ratio = this.pixiMole.height / this.pixiMole.width;
  this.pixiMole.height = 150;
  this.pixiMole.width = this.pixiMole.height / ratio;

  this.isHidden = false;
  this.knockedOut = false;
  this.timeWhenHit = null;

  var xPosition = 345;
  var yPosition = 600;
  this.molePositions = {
    x: xPosition,
    yRisenPosition: yPosition,
    yHiddenPosition: yPosition + 100
  };
  this.setPosition(xPosition, yPosition);

  pixiStage.addChild(this.pixiMole);
}

Mole.prototype.update = function(time, dt) {
  if (this.knockedOut && time - this.timeWhenHit >= 5) {
    this.recover();
  }

  var moleYPosition = this.pixiMole.position.y;
  var transitionDuration = 0.1; // seconds
  if (!this.isHidden) {
    if (moleYPosition !== this.molePositions.yRisenPosition) {
      moleYPosition = moleYPosition - dt / transitionDuration *
        (this.molePositions.yHiddenPosition - this.molePositions.yRisenPosition);
      this.pixiMole.position.y = moleYPosition < this.molePositions.yRisenPosition ?
        this.molePositions.yRisenPosition : moleYPosition;
    }
  } else {
    if (moleYPosition !== this.molePositions.yHiddenPosition) {
      moleYPosition = moleYPosition - dt / transitionDuration *
        (this.molePositions.yRisenPosition - this.molePositions.yHiddenPosition);
      this.pixiMole.position.y = moleYPosition > this.molePositions.yHiddenPosition ?
        this.molePositions.yHiddenPosition : moleYPosition;
   }
  }
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
  this.timeWhenHit = time;
  this.pixiMole.rotation = Math.PI / 2
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
  return this.isHidden && !this.knockedOut;
};

Mole.prototype.setPosition = function(x, y) {
  this.pixiMole.position = new PIXI.Point(x, y);
};
