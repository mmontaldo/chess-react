import './css/App.css';
import { useState, useRef, useEffect } from 'react';
import { Chess } from 'chess.js';
import useLocalStorage from './hooks/useLocalStorage';
import ChessBoard from './components/ChessBoard.js';
import SideMenu from './components/SideMenu.js';

function App() {

  const [ storedPosition, setStoredPosition ] = useLocalStorage('chess-fen', null);
  const gameRef = useRef(new Chess());
  const [ gamePosition, setGamePosition ] = useState("");

  const setRefAndSavePosition = () => {
    setGamePosition(gameRef.current.fen());
    setStoredPosition(gameRef.current.fen());
  }

  useEffect(() => {
    try {
      gameRef.current = new Chess(storedPosition || undefined);
    } catch (error) {
      console.error('Invalid FEN loaded from Storage: Resetting game');
      gameRef.current = new Chess();
    }
    setRefAndSavePosition();
  }, [storedPosition]);

  const handleNewGame = () => {
    gameRef.current.reset();
    setRefAndSavePosition();
  };

  return (
    <div className="App">
      <SideMenu handleNewGame={handleNewGame} />
      <main>
        <header className="App-header">
          <h1>ChessReact</h1>
        </header>
        <ChessBoard
          handleNewGame={handleNewGame}
          gameRef={gameRef}
          setRefAndSavePosition={setRefAndSavePosition}
        />
      </main>
    </div>
  );
}

export default App;
