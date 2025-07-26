import { useState, useEffect } from 'react';
import GameOver from './GameOver';

export default function ChessBoard({ gameRef, fen, onMove, handleNewGame }) {
  const [selectedSquare, setSelectedSquare] = useState('');
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!fen) return;

    try {
      gameRef.current.load(fen);
      setPieces(gameRef.current.board().flat().filter(Boolean));
    } catch (err) {
      console.error('Failed to load FEN in ChessBoard', err);
    }
  }, [fen]);

  const moves = selectedSquare ? gameRef.current.moves({ square: selectedSquare }) : [];

  const allPieces = pieces.map(({ square, type, color }, i) => (
    <div
      key={`piece-${i}`}
      className={`piece ${color}${type} square-${numericalPos(square)}`}
      onClick={() => handlePieceClick(square)}
    />
  ));

  const hintDivs = moves.map((move, i) => (
    <div
      key={`hint-${i}`}
      className={`hint square-${numericalPos(move)}`}
      onClick={() => handleMove(move)}
    />
  ));

  return (
    <div className="chess-board">
      {allPieces}
      {hintDivs}
      {gameRef.current.isGameOver() && (
        <GameOver handleNewGame={handleNewGame} />
      )}
    </div>
  );

  function handlePieceClick(square) {
    setSelectedSquare(square);
  }

  function handleMove(to) {
    try {
      gameRef.current.move(to);
      onMove();
      setPieces(gameRef.current.board().flat().filter(Boolean));
    } catch (err) {
      console.error('Move error:', err);
    }
    setSelectedSquare('');
  }

  function numericalPos (position) {
    const [cur_x, cur_y] = position.match(/([a-z]\d)/)[0];
    const num_x = ['a','b','c','d','e','f','g','h'].indexOf(cur_x) + 1;
    return num_x + '' + cur_y;
  }
}

