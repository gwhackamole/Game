function ScoreBoard(pixiStage, board){
  this.score = 0;
  this.time = 120;

  this.scoreText = new PIXI.Text(this.score.toFixed(0));
  this.scoreText.anchor.x = 1;
  this.scoreText.anchor.y = 1;
  this.scoreText.position.x = 620;
  this.scoreText.position.y = 120;

  this.timeText = new PIXI.Text( timeToString( this.time ) );
  this.timeText.anchor.x = 1;
  this.timeText.anchor.y = 1;
  this.timeText.position.x = 320;
  this.timeText.position.y = 120;

  this.board = board;

  pixiStage.addChild( this.scoreText );
  pixiStage.addChild( this.timeText );
}

ScoreBoard.prototype = {
  incrementScore: function( upMoleNumber, dt ){
    this.score += upMoleNumber * 100 * dt;
    this.scoreText.setText(this.score.toFixed(0));
  },

  updateTime : function( dt ){
    this.time -= dt;
    this.timeText.setText( timeToString( this.time ) );
  },

  update : function( time, dt ){
    this.incrementScore( this.board.countScoringMoles(), dt);
    this.updateTime( dt );
  }
}

function timeToString( t ){
  var s = t % 60;
  return (( t - s )/ 60).toFixed(0) + ":" + (s<10?"0":"")  + s.toFixed(0);
}
