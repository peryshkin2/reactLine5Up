import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function HeadSquare(props) {
    return (
      <button
        className="head"
        onClick={props.onClick}>
        {props.value}
      </button>
    );
}
function Square(props) {
    return (
      <button
        className="square"
        >
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  
  renderHead(i) {
    return (
      <HeadSquare
        value={i+1}        onClick={() => this.props.onClick(i)}      />
    );
  }
  
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}  />
    );
  }
  
  render() {
  
    return (
      <div>
        <div className="board-row">
          {this.renderHead(0)}
          {this.renderHead(1)}
          {this.renderHead(2)}
          {this.renderHead(3)}
          {this.renderHead(4)}
          {this.renderHead(5)}
          {this.renderHead(6)}
        </div>
        
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}

        </div>
        <div className="board-row">
	  {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
        </div>
<div className="board-row">
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
        </div>
<div className="board-row">
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
        </div>
<div className="board-row">
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
        </div>
<div className="board-row">
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
        </div>

      </div>
    );
  }
}

class Game extends React.Component {
  
  constructor(props) {
    super(props);
    const fullBoard = 42;
 //   const rowWidth = 7;
    this.state = {
      history: [{
        squares: Array(fullBoard).fill(null),      }],
      stepNumber: 0,
      xIsNext: true,
      winner: null,
    };
  }
  
  handleClick(i) {
    let j=i;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    while(squares[j]) {
        j-=rowWidth;			// set up "gravity"
        if(j<0){ return; }	// do not handle Click if top row filled
    }
    //alert("handleClic j="+j);
    squares[j] = this.state.xIsNext ? 'X' : 'O';
    let localWinner = this.state.winner;
    if (calculateWinner(squares,j)) {
       localWinner = squares[j];
       // return;  // do not handle Click if winner 
    }
    this.setState({
      history: history.concat([{        squares: squares,      }]),
      stepNumber: history.length,    
      xIsNext: !this.state.xIsNext,
      winner: localWinner,
    });
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      winner: null,
    });
  }
  
  render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
    //const winner = calculateWinner(current.squares);
     const moves = history.map((step, move) => {
       const desc = move ?
             'Go to move #' + move :        'Go to game start';
       return (
         <li key={move}>
           <button onClick={() => this.jumpTo(move)}>
           {desc}
           </button> 
         </li>
       );
     });
    let status;
    let overMsg;
    if (this.state.winner) {
      status = '  Winner: ' + this.state.winner;
      overMsg= '  Game is Over!';
    } else {
      status = ' Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <table className="game">
      <tr>
      <td>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => {if(!this.state.winner){this.handleClick(35+i);}}}
            />
        </div>
        </td>
        <td>
        <div className="game-info">
          <div className="end-game"><h2>&nbsp;&nbsp;{overMsg}</h2></div>
          <div><h2>&nbsp;&nbsp;{status}</h2></div>
          <ol>{moves}</ol>
        </div>
        </td>
        </tr>
      </table>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
const fullBoard = 42;
const rowWidth = 7;
function calculateWinner(squares,j) {
  
  const curType = squares[j];
  const leftEdge = j-(j%rowWidth);
  const rightEdge = leftEdge+rowWidth;
  
  //alert("left and right Edge:"+leftEdge+" "+rightEdge);
  
  // count holizontal length
  let length = 0;
  for(let k=leftEdge;k<rightEdge;k++){
  //alert("1 j="+j+" k="+k+" length="+length);
    if(squares[k]===curType)  length++;
    else  {
      if( length>3) { return curType; }
      length=0;}
  }
  if( length>3) { return curType; }

  // count vertical length
  length = 0;
  for(let k=j; k<fullBoard; k=k+rowWidth){
    if(squares[k]===curType) {length++;}
    else { break;}
  }
  if( length>3) { return curType; }
  
  // count diagonal left
  length = 0;
  for(let k=j;k<fullBoard;k=k+rowWidth+1){
    if(squares[k]===curType) { length++;}
    else { break;}
  }
  for(let k=j-(rowWidth+1);k>-1;k=k-(rowWidth+1)){
    if(squares[k]===curType) { length++;}
    else { break;}
  }
  if( length>3) { return curType; }

  // count diagonal right
  length = 0;
  for(let k=j;k<fullBoard;k=k+rowWidth-1){
    if(squares[k]===curType) { length++;}
    else { break;}
  }
  for(let k=j-(rowWidth-1);k>-1;k=k-(rowWidth-1)){
    if(squares[k]===curType) { length++;}
    else { break;}
  }
  if( length>3) { return curType; }
/**/
  return null;
}
