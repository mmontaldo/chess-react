import './css/App.css';
import { useState, useRef, useEffect } from 'react';
import { Chess } from 'chess.js';
import useLocalStorage from './hooks/useLocalStorage';
import ChessBoard from './components/ChessBoard.js';
import SideMenu from './components/SideMenu.js';

function App() {

  const [ storedPosition, setStoredPosition ] = useLocalStorage('chess-fen', null);
  const gameRef = useRef(new Chess());

  useEffect(() => {
    try {
      gameRef.current = new Chess(storedPosition || undefined);
    } catch (error) {
      console.error('Invalid FEN loaded from Storage: Resetting game');
      gameRef.current = new Chess();
    }
  }, [storedPosition]);

  const saveCurrentPosition = () => {
    setStoredPosition(gameRef.current.fen());
  }

  const handleNewGame = () => {
    gameRef.current.reset();
    saveCurrentPosition();
  };

  return (
    <div className="App">
      <SideMenu handleNewGame={handleNewGame} />
      <main>
        <header className="App-header">
          <h1>ChessReact</h1>
        </header>
        <ChessBoard
          gameRef={gameRef}
          fen={storedPosition}
          onMove={saveCurrentPosition}
          handleNewGame={handleNewGame}
        />
      </main>
    </div>
  );
}

export default App;
