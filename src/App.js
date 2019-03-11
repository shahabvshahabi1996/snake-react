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
        },
        tail : []
      },
      dir : {
        x : 1,
        y : 0
      },
      gameover : false,
      score : 0
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
    this.gameLoop();
  }


  gameRestart = () => {
    this.setState({
      apple : {
        x : this.getRandNumber(),
        y : this.getRandNumber()
      },
      snake : {
        head : {
          x : 5,
          y : 5
        },
        tail : []
      },
      dir : {
        x : 1,
        y : 0
      },
      gameover : false,
      score : 0
    }); 
  }

  getRandNumber() {
    return Math.floor(Math.random() * 12);
  }

  gameLoop = () => {
    this.setState((prevState) => ({snake : {
      head : {
        x : prevState.snake.head.x + prevState.dir.x,
        y : prevState.snake.head.y + prevState.dir.y
      },
      tail : prevState.snake.tail.map((item) => {
        return {x : item.x + prevState.dir.x,y : item.y + prevState.dir.y}
      }) 
    }}),() => {
      this.checkConflict();
      setTimeout(() => {
        this.gameLoop()
      },1000);
    })
  } 

  checkConflict = () => {
    let {snake , apple } = this.state;
    if(apple.x === snake.head.x && apple.y === snake.head.y) {
      this.setState({
          apple :  {
            x : this.getRandNumber(),
            y : this.getRandNumber()
          },
          score : this.state.score + 1, 
          tail : snake.tail.push(snake.head)
      });
    } else if(snake.head.x > 11 || snake.head.x < 0 || snake.head.y > 11 || snake.head.y < 0) {
      this.setState({gameover : true , dir : {x : 0 , y : 0}});
    } else {
      return ;
    }
  }

  goUp = () => {
    this.setState({dir : {
        x : 0,
        y : -1
    }});
  }

  goDown = () => {
    this.setState({dir : {
      x : 0,
      y : 1
    }});
  }

  goRight = () => {
    this.setState({dir : {
      x : 1,
      y : 0
    }});
  }

  goLeft = () => {
    this.setState({dir : {
      x : -1,
      y : 0
    }});
  }

  handleKey = (e) => {
    switch(e.key) {
      case "ArrowUp": {
        return this.goUp();
      }
      case "ArrowDown" : {
        return this.goDown();
      }
      case "ArrowRight" : {
        return this.goRight();
      } 
      case "ArrowLeft" : {
       return this.goLeft();
      }
      default :
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

  isSnakeEatsApple = (col,row) => {
    let {apple , snake} = this.state;
    return apple.x === row && row === snake.head.x && apple.y === col && col === snake.head.y;
  }

  isTail = (col,row) => {
    let {snake : {tail}} = this.state;
    let res = false;
    tail.map((item) => {
      if(item.x === row && item.y === col) {
        res = true
      }

      return item;
    })
    return res;  
  }

  render() {
    const {cells , gameover , score} = this.state;
    console.log(this.state.snake);
    return (
      <div>
        <header>
          <h1>React Snake Game</h1>
        </header>
        <div className="grid">
          <div className={`gameover ${gameover ? 'active-over' : ""}`}>
            <div className="text">
              <h1>Game Over , <span>Your Score is : {score}</span></h1>
              <h3><button className="button" onClick={this.gameRestart}>Try Again</button></h3>
            </div>
          </div>
          {cells.map((col) => {
            return col.map((row,i) => {
              return (
                <div key={i} className={
                  `cell 
                  ${this.isSnakeEatsApple(row.i,row.j) 
                  ? 'snake-head' : this.isApple(row.i,row.j) 
                  ? 'apple' : this.isHead(row.i,row.j) 
                  ? 'snake-head' : this.isTail(row.i,row.j)
                  ? 'snake-tail' : ''}
                  `}></div>
              )
            }) 
          })}
        </div>
      </div>
    );
  }
}

export default App;
