function Hammer(pixiStage)
{
    this.pixiHammer  = new PIXI.Sprite.fromImage('asset/hammer.jpg');
    this.state = null;
    this.setPosition(150, 50);
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





