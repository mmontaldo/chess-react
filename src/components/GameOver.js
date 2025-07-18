import React from 'react';

function GameOver ({ handleNewGame }) {
  return (
    <div className={'game-over-card'}>
      <div className={'game-over-text'}>
        Game Over
      </div>
      <button className={'new-game-bttn'} onClick={handleNewGame}>
        New Game
      </button>
    </div>
  )
}

export default React.memo(GameOver)
