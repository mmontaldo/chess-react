import { useState } from 'react';
import GameOver from './GameOver';


export default function ChessBoard( { gameRef, setRefAndSavePosition, handleNewGame } ) {
  const pieces = gameRef.current.board().flat(1).filter(Boolean);
  const [selected_square, setSelected] = useState('');

  const all_pieces = pieces.map(({ square, type, color }, i) =>
    <div
    className={`piece ${color + type} square-${numerical_pos(square)}`}
    key={i}
    onClick={() => clickPiece(i)}
    />
  );

  const moves = selected_square ? gameRef.current.moves({ square: selected_square }) : [];
  const hint_divs = moves.map((hint, i) =>
    <div
      key={i}
      onClick={() => movePiece(hint)}
      className={`hint square-${numerical_pos(hint)}`}
    />
  );

  return (
    <div className="chess-board">
      {all_pieces}
      {hint_divs}
      {gameRef.current.isGameOver() ? <GameOver handleNewGame={handleNewGame} /> : ''}
    </div>
  );

  function numerical_pos(position) {
    const [cur_x, cur_y] = position.match(/([a-z]\d)/)[0];
    const num_x = ['a','b','c','d','e','f','g','h'].indexOf(cur_x) + 1;
    return num_x + '' + cur_y;
  }

  function movePiece (to) {
    try {
      gameRef.current.move(to);
    } catch (err) {
      console.error(`Error moving piece: ${err}`);
    }
    setSelected('');
    setRefAndSavePosition()
  }

  function clickPiece (index) {
    setSelected(pieces[index].square);
  }
}
