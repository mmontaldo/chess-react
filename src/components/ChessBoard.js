import GameOver from "./GameOver";

export default function ChessBoard({
  gameRef,
  pieces,
  selectedSquare,
  setSelectedSquare,
  movePiece,
  getLegalMoves,
  resetGame,
  theme,
}) {
  const allPieces = pieces.map(({ square, type, color }, i) => (
    <div
      key={`piece-${i}`}
      className={`piece ${color}${type} square-${numericalPos(square)}`}
      onClick={() => setSelectedSquare(square)}
    />
  ));

  const hints = getLegalMoves();
  const hintDivs = hints.map((move, i) => (
    <div
      key={`hint-${i}`}
      className={`hint square-${numericalPos(move)}`}
      onClick={() => movePiece(move)}
    />
  ));

  return (
    <div className={`chess-board ${theme}`}>
      {allPieces}
      {hintDivs}
      {gameRef.current?.isGameOver() && <GameOver handleNewGame={resetGame} />}
    </div>
  );
}

function numericalPos(position) {
  const [cur_x, cur_y] = position.match(/([a-z]\d)/)[0];
  const num_x = ["a", "b", "c", "d", "e", "f", "g", "h"].indexOf(cur_x) + 1;
  return num_x + "" + cur_y;
}
