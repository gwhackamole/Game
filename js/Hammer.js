function Hammer(pixiStage,board)
{
    var self = this;
    this.board = board;
    this.pixiHammer  = new PIXI.Sprite.fromImage('asset/hammer.jpg');
    var ratio = this.pixiHammer.height / this.pixiHammer.width;
    this.pixiHammer.height = 50;
    this.pixiHammer.width = this.pixiHammer.height / ratio;
    this.pixiHammer.alpha = 0.5;
    this.hit = false;
    this.setPosition(100, 50);
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
          self.pixiHammer.alpha = 0.5;
        },100);
};







