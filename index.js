import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const rowWidth = 21;
const columnDepth = 21;
const winningLength_1 = 4;  // winning length -1 

const fullBoard = rowWidth*columnDepth;

function HeadSquare(props) {
    return (
      <button
        className="head"
        >
        {props.value}
      </button>
    );
}
function Square(props) {
    return (
      <button
        className="square"
        onClick={props.onClick}
        >
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  
  renderHead(i) {
    return (
      <HeadSquare
        value={i}             />
    );
  }
  
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}  onClick={() => this.props.onClick(i)} />
    );
  }
  
  renderHeadRow() {   
   let anyRow = Array.from(Array(rowWidth+1).keys());
    return( anyRow.map((item) =>{
      return (
        this.renderHead(item)
      );
    }));
  }

  renderRow(j) {   
   let anyRow = Array.from(Array(rowWidth).keys());
    return( [this.renderHead(j+1),
    anyRow.map((item) =>{
      return (
        this.renderSquare(j*rowWidth+item)
      );
    })]);
  }
  
  renderColumns() {
  let anyColumn = Array.from(Array(columnDepth).keys());
    return( anyColumn.map((item)=>{
      return(
        <div className="board-row">
          {this.renderRow(item)}
        </div>
      );
    }));
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderHeadRow()}
        </div>       
        {this.renderColumns()}       
      </div>
    );
  }
}

class Game extends React.Component {
  
  constructor(props) {
    super(props);
 
    this.state = {
      history: [{
        squares: Array(fullBoard).fill(null), }],
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
            onClick={(i) => {if(!this.state.winner){this.handleClick(i);}}}
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
      if( length>winningLength_1) { return curType; }
      length=0;}
  }
  if( length>winningLength_1) { return curType; }

  // count vertical length
  length = 0;
  for(let k=j; k<fullBoard; k=k+rowWidth){
    if(squares[k]===curType) {length++;}
    else { break;}
  }
  if( length>winningLength_1) { return curType; }
  
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
  if( length>winningLength_1) { return curType; }

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
  if( length>winningLength_1) { return curType; }
/**/
  return null;
}
