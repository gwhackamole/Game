function Hammer(pixiStage)
{
    this.pixiHammer  = new PIXI.Sprite.fromImage('asset/hammer.jpg');
    this.state = null;
    var ratio = this.pixiHammer.height / this.pixiHammer.width;
    this.pixiHammer.height = 50;
    this.pixiHammer.width = this.pixiHammer.height / ratio;
    this.setPosition(100, 50);
    pixiStage.addChild(this.pixiHammer);
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

Hammer.prototype.setStateInMove = function(){
    this.state = "inMove";
};

Hammer.prototype.setStateHit = function(){
    this.state = "hit";
};





