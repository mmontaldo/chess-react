import React from 'react';

function SideMenu ({ handleNewGame }) {
  return (
    <aside className="side-menu">
      <nav aria-label="Main menu">
        <button className={'new-game-bttn'} type="button" onClick={handleNewGame}>
          Start New Game
        </button>
      </nav>
    </aside>
  )
}

export default React.memo(SideMenu)
