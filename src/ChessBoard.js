import React, { useState } from 'react';
import { Chess } from 'chess.js'


export default function ChessBoard() {
  const [chess, setChess] = useState(new Chess());

  const pieces = chess.board().flat(1).filter(Boolean);
  const [selected_square, setSelected] = useState('');
  const [hints, setHints] = useState([]);

  const game_over_div =
    <div className={'game-over-card'}>
      <div className={'game-over-text'}>
        Game Over Mutha Fucka
      </div>
      <button className={'new-game-bttn'} onClick={startNewGame}>
        New Game
      </button>
    </div>
  const game_over = chess.isGameOver() ? game_over_div : '';

  const all_pieces = pieces.map(({ square, type, color }, i) =>
    <div
    className={`piece ${color + type} square-${numerical_pos(square)}`}
    key={i}
    onClick={() => clickPiece(i)}
    />
  );

  const moves = selected_square ? chess.moves({ square: selected_square }) : [];
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
      {game_over}
    </div>
  );

  function startNewGame () {
    setChess(new Chess());
  }

  function numerical_pos(position) {
    const [cur_x, cur_y] = position.match(/([a-z]\d)/)[0];
    const num_x = ['a','b','c','d','e','f','g','h'].indexOf(cur_x) + 1;
    return num_x + '' + cur_y;
  }

  function movePiece (to) {
    try {
      chess.move(to);
    } catch (err) {
      console.log(`caught ${err}`);
    }
    setSelected('');
  }

  function clickPiece (index) {
    setSelected(pieces[index].square);
  }
}
