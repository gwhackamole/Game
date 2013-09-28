function Hammer(pixiStage,board)
{
    var self = this;
    this.board = board;
    this.pixiHammer  = new PIXI.Sprite.fromImage('asset/Hammer.png');
    var ratio = this.pixiHammer.height / this.pixiHammer.width;
    this.pixiHammer.alpha = 0.1;
    this.hit = false;
    this.setPosition(310, 490);
    pixiStage.addChild(this.pixiHammer);
    setInterval(function(){self.activate()}, 4000);
}

Hammer.prototype.update = function(time, dt) {
    if (this.knockedOut && time - this.timeWhenHit >= 5) {
        this.recover();
    }
};

Hammer.prototype.setPosition = function(x,y){
    this.pixiHammer.position.x = x;
    this.pixiHammer.position.y = y;
};

Hammer.prototype.checkHit = function(){
    return this.hit;
};

Hammer.prototype.activate = function(){
    var self = this;
    this.hit = true;
    this.pixiHammer.alpha = 1;
    this.board.hit();
    setTimeout(
        function(){
          self.hit = false;
          self.pixiHammer.alpha = 0.1;
        },200);
};







