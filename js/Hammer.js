function Hammer(pixiStage,board)
{
    var self = this;
    this.board = board;

    this.pixiHammer  = new PIXI.Sprite.fromImage(Config.textures.hammer);
    this.pixiTarget = new PIXI.Sprite.fromImage(Config.textures.target);

    var ratio = this.pixiHammer.height / this.pixiHammer.width;
    this.hit = false;

    //this.pixiHammer.alpha = 0.5;
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
    this.pixiTarget.alpha = 0.5

    this.position ={
       x : 0.5,
       y : 0.5
    };

    this.scoreSinceLastHit = 0;
    this.speed = this.originalSpeed = 0.2;
    
    this.hitting = false
    this.hitTime = 0
    this.hitDuration = 0.4

    pixiStage.addChild(this.pixiTarget);
    pixiStage.addChild(this.pixiHammer);
}

Hammer.prototype.update = function(time, dt, score) {
    var mole = this.getTargetedMole()
    
    if (this.hitting)
    {
      this.hitTime += dt / this.hitDuration
      
      if (this.hitTime > this.hitDuration)
      {
        this.activate()
        this.hitting = false
        this.hitTime = 0
      }
    }
    else if (mole)
    {
      var molePosition = {
        x: mole.molePositions.x,
        y: mole.molePositions.yHiddenPosition,
      }
      if (distance(this.position,molePosition) < 0.03) {
        this.hitting = true
        this.hittime = 0
      }
      this.moveToClosestMole(dt, mole)
    }
    else
    {
      this.moveRandomly( dt, time );
    }
    
    var projection = projectVirtualPosition(this.position, Math.sin(time * 2) * 0.04 + 0.12 + Math.sin(this.hitTime * 4) * 0.5)
    var targetProj = projectVirtualPosition(this.position, 0);

    this.pixiHammer.position = projection.position;
    this.pixiHammer.scale = projection.scale;
    this.pixiHammer.rotation = this.hitTime * 2

    this.pixiTarget.position = targetProj.position;
    this.pixiTarget.scale    = targetProj.scale;
    this.pixiTarget.scale.x *= 1.2
    this.pixiTarget.scale.y *= 1.2

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
      y: nextMole.molePositions.yHiddenPosition,
    }
    var direction = vec2subtract(molePosition, this.position)
    var length = distance(molePosition, this.position)
    length = length > 0.005 ? length : 0.005; // Prevent jumps over the target
    
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

Hammer.prototype.moveRandomly = function( dt, time ){
    var target = {
        x : (Math.sin( time * 2 ) / 2 + 0.5) + (Math.cos(time * 10) + 1 ) / 10 ,
        y : (Math.cos( time * 2 ) / 2 + 0.5) + (Math.cos(time * 10) + 1 ) / 10
    } 
    
    var direction = vec2subtract(target, this.position)
    var length = distance(target, this.position)

    var normalizedDirection = {
        x: direction.x / length || 0,
        y: direction.y / length || 0
    }

    this.position.x += normalizedDirection.x * dt * (this.speed);
    this.position.y += normalizedDirection.y * dt * (this.speed);
};

Hammer.prototype.activate = function(){
    var self = this;
    this.hit = true;
    var hasHit = this.board.hit( this.position );
    if (hasHit) {
      this.scoreSinceLastHit = 0;
      this.speed = this.originalSpeed;
    }
};
