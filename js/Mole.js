function Mole(pixiStage) {
  this.pixiMole = PIXI.Sprite.fromImage('assets/mole.png');
  var ratio = this.pixiMole.height / this.pixiMole.width;
  this.pixiMole.height = 150;
  this.pixiMole.width = this.pixiMole.height / ratio;

  this.isHidden = false;
  this.knockedOut = false;
  this.timeWhenHit = null;

  this.setPosition(345, 600);

  pixiStage.addChild(this.pixiMole);
}

Mole.prototype.update = function(time, dt) {
  if (this.knockedOut && time - this.timeWhenHit >= 5) {
    this.recover();
  }
};

Mole.prototype.render = function(first_argument) {
  // body...
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
