function Hammer(pixiStage,board)
{
    var self = this;
    this.board = board;
    this.pixiHammer  = new PIXI.Sprite.fromImage('asset/Hammer.png');
    var ratio = this.pixiHammer.height / this.pixiHammer.width;
    this.pixiHammer.alpha = 0.1;
    this.hit = false;
    this.pixiHammer.position ={
        x: 370,
        y: 490
    };
    this.pixiHammer.anchor = {
        x: 0.3,
        y: 0.75
    }

    this.position ={
       x : 0.5,
       y : 0.5
    };
    this.speed = 0.1;
    pixiStage.addChild(this.pixiHammer);
    setInterval(function(){self.activate()}, 4000);
}

Hammer.prototype.update = function(time, dt) {
    var m = this.getTargetedMole()
    if( !m ) return
    this.moveToClosestMole(dt, m)
    //var m =  this.moveToClosestMole(dt, m)
    //this.position = m.molePositions;
    this.pixiHammer.position = doTransform(this.position)
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
    var direction = vec2subtract(nextMole.molePositions, this.position)
    var length = distance(nextMole.molePositions, this.position)

    var normalizedDirection = {
        x: direction.x / length,
        y: direction.y / length
    }

    this.position.x += normalizedDirection.x * dt * this.speed;
    this.position.y += normalizedDirection.y * dt * this.speed;
}

Hammer.prototype.activate = function(){
    var self = this;
    this.hit = true;
    this.pixiHammer.alpha = 1;
    this.board.hit( this.position );

    setTimeout(
        function(){
          self.hit = false;
          self.pixiHammer.alpha = 0.1;
        },200);
};







