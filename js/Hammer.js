function Hammer(stage)
{
    var texture = PIXI.Texture.fromImage('img/hammer.jpg');
    var Hammer  = new PIXI.Sprite(texture);
    var state;
}

Hammer.prototype.setPosition = function(coordx,coordy){
    position.x = parseFloat(coordx);
    position.y = parseFloat(coordy);
}

Hammer.prototype.setStateInMove = function(){
    this.state = "inMove";
}

Hammer.prototype.setStateBam = function(){
    this.state = "bam";
}





