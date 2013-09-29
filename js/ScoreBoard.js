function ScoreBoard(pixiStage, board){
  this.score = 0;
  this.time = 30;

  this.scoreText = new PIXI.Text(this.score.toFixed(0), {font:"bold 40pt Arial", fill:"#fff"});
  this.scoreText.anchor.x = 1;
  this.scoreText.anchor.y = 1;
  this.scoreText.position.x = 620;
  this.scoreText.position.y = 270;

  this.timeText = new PIXI.Text( timeToString( this.time ), {font:"bold 40pt Arial", fill:"#fff"});
  this.timeText.anchor.x = 0;
  this.timeText.anchor.y = 1;
  this.timeText.position.x = 180;
  this.timeText.position.y = 270;

  this.board = board;

  pixiStage.addChild( this.scoreText );
  pixiStage.addChild( this.timeText );
}

ScoreBoard.prototype = {
  incrementScore: function( upMoleNumber, dt ){
    var scoreIncrement = Math.floor(upMoleNumber * 100 * dt);
    this.score += scoreIncrement;
    this.scoreText.setText( this.score.toFixed(0));
    return scoreIncrement;
  },

  decrementScore: function( amount ){
    this.score -= amount;
    
    if (this.score < 0)
      this.score = 0
    
    this.scoreText.setText( this.score.toFixed(0));
  },

  updateTime : function( dt ){
    this.time -= dt;
    this.timeText.setText( timeToString( this.time ) );
  },

  /**
   * Update method. returns the increment to the score
   */
  update : function( time, dt ){
    var scoreIncrement = this.incrementScore( this.board.countScoringMoles(), dt);
    this.updateTime( dt );
    return scoreIncrement;
  },
}

function timeToString( t ){
  var s = t % 60;
  return (( t - s )/ 60).toFixed(0) + ":" + (s<10?"0":"")  + s.toFixed(0);
}
