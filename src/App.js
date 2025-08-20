import "./css/App.css";
import ChessBoard from "./components/ChessBoard.js";
import SideMenu from "./components/SideMenu.js";

import useChessGame from "./hooks/useChessGame";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const {
    gameRef,
    pieces,
    selectedSquare,
    setSelectedSquare,
    movePiece,
    getLegalMoves,
    resetGame,
  } = useChessGame();

  const [theme, setTheme] = useLocalStorage("chess-theme", "wood");

  return (
    <div className="App">
      <SideMenu resetGame={resetGame} theme={theme} setTheme={setTheme} />
      <main>
        <header className="App-header">
          <h1>ChessReact</h1>
        </header>
        <ChessBoard
          gameRef={gameRef}
          pieces={pieces}
          selectedSquare={selectedSquare}
          setSelectedSquare={setSelectedSquare}
          movePiece={movePiece}
          getLegalMoves={getLegalMoves}
          isGameOver={gameRef.current.isGameOver()}
          handleNewGame={resetGame}
          theme={theme}
        />
      </main>
    </div>
  );
}

export default App;
