import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    let cells = [];
    for(let i=0;i<144;i++) {
      cells.push(i);
    }

    let apple = this.getRandNumber();
    this.state = {
      cells,
      apple,
      snakeHead : 77
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  getRandNumber() {
    return Math.floor(Math.random() * 144);
  }

  handleKeyPress = (e) => {
    switch(e.key) {
      case "ArrowUp":
        return this.setState({snakeHead : this.state.snakeHead - 12});
      case "ArrowDown" :
        return this.setState({snakeHead : this.state.snakeHead + 12});
      case "ArrowRight" : 
        return this.setState({snakeHead : this.state.snakeHead + 1});
      case "ArrowLeft" :
        return this.setState({snakeHead : this.state.snakeHead - 1});
      default :
        return ;
    }
  }

  render() {
    const {cells,apple,snakeHead} = this.state;
    console.log(this.state);
    return (
      <div>
        <header>
          <h1>React Snake Game</h1>
        </header>
        <div className="grid">
          {cells.map((item) => {
            if(item === apple) {
              return <div key={item} className="cell apple"></div> 
            } else if(item === snakeHead) {
              return <div key={item} className="cell snake-head"></div> 
            } else {
              return <div key={item} className="cell"></div>
            }
          })}
        </div>
      </div>
    );
  }
}

export default App;
