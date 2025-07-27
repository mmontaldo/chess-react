import './css/App.css';
import useChessGame from './hooks/useChessGame';
import ChessBoard from './components/ChessBoard.js';
import SideMenu from './components/SideMenu.js';

function App() {
  const {
    gameRef,
    pieces,
    selectedSquare,
    setSelectedSquare,
    movePiece,
    getLegalMoves,
    resetGame
  } = useChessGame();

  return (
    <div className="App">
      <SideMenu
        resetGame={resetGame}
      />
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
        />
      </main>
    </div>
  );
}

export default App;
