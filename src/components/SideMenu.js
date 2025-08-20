import React from "react";

function SideMenu({ resetGame, theme, setTheme }) {
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <aside className="side-menu">
      <nav aria-label="Main menu">
        <button className={"new-game-bttn"} type="button" onClick={resetGame}>
          Start New Game
        </button>
        <div>
          <label htmlFor="theme-select">Choose Theme:</label>
          <select
            id="theme-select"
            value={theme}
            className="select-dropdown"
            onChange={handleThemeChange}
          >
            <option value="wood">Wood</option>
            <option value="green">Green</option>
            <option value="stone">Stone</option>
          </select>
        </div>
      </nav>
    </aside>
  );
}

export default React.memo(SideMenu);
