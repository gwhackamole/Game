function Board(stage)
{
	/*this.hammer = new Hammer(stage)
	
	this.moles = []
	var mole = new Mole(stage)
	this.moles.push(mole)*/
        var mole = null ;
	this.buttons = []
	var button = new Button(stage, mole)
	this.buttons.push(button)
	
	this.score = 0
	
	this.text = new PIXI.Text("Whack it!")
	stage.addChild(this.text)
}

Board.prototype.update = function(time, dt)
{
	this.text.position.x = Math.sin(time) * 100 + 200
	this.text.position.y = 200
}
