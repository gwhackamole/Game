function Board(stage)
{
	/*this.hammer = new Hammer(stage)
	
	this.moles = []
	this.buttons = []
	
	var mole = new Mole(stage)
	var button = new Button(stage, mole)
	
	this.moles.push(mole)
	this.buttons.push(button)*/
	
	this.score = 0
	
	this.text = new PIXI.Text("Whack it!")
	stage.addChild(this.text)
}

Board.prototype.update = function(time, dt)
{
	this.text.position.x = Math.sin(time) * 100 + 200
	this.text.position.y = 200
}
