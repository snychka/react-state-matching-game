import React from 'react'
import useHover from '../../hooks'
import GameContext from '../../GameContext'

import './TileSelector.css'

const TileSelector = (props) => {

  const [ref, hovered] = useHover()


 return (
   <GameContext.Consumer>
     {({numTiles, handleNumTileChange}) => {
       console.log('from tile selector ' + numTiles)
      const dropDown = hovered ? (
            <div className='tileSelectorContent' >
              <div className='number' onClick={_ => handleNumTileChange(4)}>4</div>
              <div className='number' onClick={_ => handleNumTileChange(16)}>16</div>
              <div className='number' onClick={_ => handleNumTileChange(36)}>36</div>
            </div>
      ) : null

     return (
     <div className='tileSelector'>
        <div>Number of Tiles</div>
        <div className='tileSelectorDropdown' ref={ref}>
          {numTiles}
          {dropDown}
     </div>
     </div>
     )
    }}
   </GameContext.Consumer>)
  }

  export default TileSelector
