import React from 'react';

function SideMenu ({ resetGame }) {
  return (
    <aside className="side-menu">
      <nav aria-label="Main menu">
        <button className={'new-game-bttn'} type="button" onClick={resetGame}>
          Start New Game
        </button>
      </nav>
    </aside>
  )
}

export default React.memo(SideMenu)
