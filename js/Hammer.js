function Hammer(pixiStage,board)
{
    var self = this;
    this.board = board;

    this.pixiHammer  = new PIXI.Sprite.fromImage(Config.textures.hammer);
    this.pixiTarget = new PIXI.Sprite.fromImage(Config.textures.target);

    var ratio = this.pixiHammer.height / this.pixiHammer.width;
    this.hit = false;

    this.pixiHammer.alpha = 0.5;
    this.pixiHammer.position ={
        x: 370,
        y: 490
    };
    this.pixiHammer.anchor = {
        x: 0.3,
        y: 0.75
    }

    this.pixiTarget.position = { x : 0.5 , y:0.5};
    this.pixiTarget.anchor = { x : 0.5 , y:0.5};

    this.position ={
       x : 0.5,
       y : 0.5
    };

    this.scoreSinceLastHit = 0;
    this.speed = this.originalSpeed = 0.2;

    pixiStage.addChild(this.pixiHammer);
    pixiStage.addChild(this.pixiTarget);

    setInterval(function(){self.activate()}, 4000);
}

Hammer.prototype.update = function(time, dt, score) {
    var mole = this.getTargetedMole()
    if( mole ) {
      if (distance(this.position,mole.molePositions) < 0.03) {
        setTimeout(this.activate.bind(this), 50);
      }
      this.moveToClosestMole(dt, mole)
    }
    
    var projection = projectVirtualPosition(this.position, Math.sin(time * 2) * 0.04 + 0.04)
    var targetProj = projectVirtualPosition(this.position, 0);

    this.pixiHammer.position = projection.position;
    this.pixiHammer.scale = projection.scale;

    this.pixiTarget.position = targetProj.position;
    this.pixiTarget.scale    = targetProj.scale;

    this.scoreSinceLastHit += score;
    this.speed += this.scoreSinceLastHit / 100000 / 3;
};

function distance(a,b){
    var dx = b.x - a.x
    var dy = b.y - a.y
    return  Math.sqrt(dx * dx + dy * dy);
}

function vec2subtract(a, b)
{
    return  {x: a.x - b.x, y: a.y - b.y}
}

Hammer.prototype.getTargetedMole = function(){
    var self = this;
    var closestMole;
    var hittableMoles = this.board.moles.filter(function(m){
        return m.isHittable();
    });
    if(hittableMoles.length === 0 ) return null;

    initialMole = hittableMoles.pop();

    closestMole = hittableMoles.reduce(function(m,c){
        var dist = distance(self.position,c.molePositions);
        if (m[1]< dist){
           return m;
        }
        else{
            return [c,dist];
        }
    },[initialMole,distance(this.position,initialMole.molePositions)])[0];

    return closestMole;
};

Hammer.prototype.moveToClosestMole = function(dt,nextMole){
    var molePosition = {
      x: nextMole.molePositions.x,
      y: nextMole.molePositions.yRisenPosition,
    }
    var direction = vec2subtract(molePosition, this.position)
    var length = distance(molePosition, this.position)

    var normalizedDirection = {
        x: direction.x / length || 0,
        y: direction.y / length || 0
    }

    var modspeed = function(v){
        return v*Math.random()*3
    };

    this.position.x += normalizedDirection.x * dt * (this.speed + modspeed(this.speed));
    this.position.y += normalizedDirection.y * dt * (this.speed + modspeed(this.speed));
}

Hammer.prototype.activate = function(){
    var self = this;
    this.hit = true;
    this.pixiHammer.alpha = 1;
    var hasHit = this.board.hit( this.position );
    if (hasHit) {
      this.scoreSinceLastHit = 0;
      this.speed = this.originalSpeed;
    }

    setTimeout(
        function(){
          self.hit = false;
          self.pixiHammer.alpha = 0.5;
        },200);
};
