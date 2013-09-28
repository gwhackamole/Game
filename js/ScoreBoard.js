function ScoreBoard(pixiStage, board){
  this.score = 0;
  this.text = new PIXI.Text("" + this.score);
  this.board = board;

  pixiStage.addChild( this.text );
}

ScoreBoard.prototype = {
  incrementScore: function( upMoleNumber, dt ){
    this.score += upMoleNumber * 100 * dt;
    this.text.setText(""+this.score);
  },

  update : function( time, dt ){
    this.incrementScore( this.board.countScoringMoles(), dt);
  }

}


