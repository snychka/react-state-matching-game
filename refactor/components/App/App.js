import React, { Component } from 'react';
import Board from '../Board'
import GameContext from '../../GameContext'
import OptionsPanel from '../OptionsPanel'
import { createTiles, indexOfSelected } from '../../misc/utils'

import './App.css';

class App extends Component{
  constructor(props) {
    super(props)

    this.state = {
      tiles: [],
      handleNumTileChange: this.handleNumTileChange,
      numTiles: 36,
      playing: false,
      previousTile: null,
      startGame: this.startGame
    }

  }

  startGame = (numTiles) => {

    this.setState({
      playing: true,
      toBeCleared: null,
      previousTile: null,
      tiles: createTiles(this.state.numTiles, this.handleTileClicked)
    })

  }

  handleNumTileChange  = (num) => {
    this.setState({numTiles: num, playing: false,  tiles: [], })
  }

  handleTileClicked = (id, color) => {

    const tiles = Array.from(this.state.tiles)
    const selectedTile = indexOfSelected(this.state.tiles, id, color)
    let previousTile = this.state.previousTile
    let toBeCleared = this.state.toBeCleared

    if (toBeCleared) {
      tiles[toBeCleared[0]].selected = false
      tiles[toBeCleared[1]].selected = false
    }

    tiles[selectedTile].selected = true

    if (previousTile !== null) {
    
      if (tiles[previousTile].color === color && tiles[previousTile].id !== id) {
        tiles[selectedTile].matched = true  
        tiles[previousTile].matched = true  
        previousTile = null
      } else {
        toBeCleared = [previousTile, selectedTile]
        previousTile = null

      }

    } else {
      previousTile = selectedTile
    }

    this.setState({ previousTile, tiles, toBeCleared })

  }

  render() {
    console.log('from app ' + this.state.numTiles)
  return (
    <div className="App">
      <header className="App-header">
        Turbo-Matcher
      </header>
        <GameContext.Provider value={this.state}>
          <OptionsPanel />
          <Board
            numTiles={this.state.numTiles}
            tiles={this.state.tiles} />
        </GameContext.Provider>
      }
    </div>
  );

  }
}

export default App;
