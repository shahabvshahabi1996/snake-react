import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    let cells = [];
    for(let i=0;i<12;i++) {
      const cols = [];
      for(let j=0;j<12;j++) {
        cols.push({i,j});
      }
      cells.push(cols);
    }

    this.state = {
      cells,
      apple : {
        x : this.getRandNumber(),
        y : this.getRandNumber()
      },
      snake : {
        head : {
          x : 5,
          y : 5
        }
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  getRandNumber() {
    return Math.floor(Math.random() * 12);
  }

  checkConflict = () => {
    let {snake , apple} = this.state;
    if(apple.x === snake.head.x && apple.y === snake.head.y) {
      this.setState({apple :  {
        x : this.getRandNumber(),
        y : this.getRandNumber()
      }});
    }
  }


  goUp = () => {
    this.checkConflict();
    this.setState({snake : {
      head : {
        x : this.state.snake.head.x,
        y : this.state.snake.head.y - 1
      }
    }});
  }

  goDown = () => {
    this.checkConflict();
    this.setState({snake : {
      head : {
        x : this.state.snake.head.x,
        y : this.state.snake.head.y + 1
      }
    }});
  }

  goRight = () => {
    this.checkConflict();
    this.setState({snake : {
      head : {
        x : this.state.snake.head.x + 1,
        y : this.state.snake.head.y
      }
    }});
  }

  goLeft = () => {
    this.checkConflict();
    this.setState({snake : {
      head : {
        x : this.state.snake.head.x - 1 ,
        y : this.state.snake.head.y
      }
    }});
  }

  handleKeyPress = (e) => {

    let {intervalFn} = this.state;

    var intervalMovements;

    if(intervalFn) {
      clearInterval(intervalFn)
    }
    
    switch(e.key) {
      case "ArrowUp": {
        intervalMovements = setInterval(() => {
          this.goUp();
        },500)
        this.setState({intervalFn : intervalMovements});
        return;
      }
      case "ArrowDown" : {
        intervalMovements = setInterval(() => {
          this.goDown();
        },500)
        this.setState({intervalFn : intervalMovements});
        return;
      }
      case "ArrowRight" : {
        intervalMovements = setInterval(() => {
          this.goRight();
        },500)
        this.setState({intervalFn : intervalMovements});
        return;
      } 
      case "ArrowLeft" : {
        intervalMovements = setInterval(() => {
          this.goLeft();
        },500)
        this.setState({intervalFn : intervalMovements});
        return;
      }
      default :
        clearInterval(intervalFn)
        return ;
    }
  }

  isApple = (col,row) => {
    let {apple} = this.state;
    return apple.x === row && apple.y === col; 
  }

  isHead = (col,row) => {
    let {snake} = this.state;
    return snake.head.x === row && snake.head.y === col
  }

  render() {
    const {cells} = this.state;
    return (
      <div>
        <header>
          <h1>React Snake Game</h1>
        </header>
        <div className="grid">
          {cells.map((col) => {
            return col.map((row,i) => {
              return (
                <div key={i} className={`cell ${this.isApple(row.i,row.j) ? 'apple' : this.isHead(row.i,row.j) ? 'snake-head' : ''}`}></div>
              )
            }) 
          })}
        </div>
      </div>
    );
  }
}

export default App;
