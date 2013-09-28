function Hammer(stage)
{
    this.texture = PIXI.Texture.fromImage('asset/hammer.jpg');
    this.pixiHammer  = new PIXI.Sprite(texture);
    this.state = null;
    stage.addChild(this.pixiHammer);
}

Hammer.prototype.setPosition = function(x,y){
    this.pixiHammer.position = new PIXI.Point(x, y);
}

Hammer.prototype.setStateInMove = function(){
    this.state = "inMove";
}

Hammer.prototype.setStateHit = function(){
    this.state = "hit";
}





