import { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import useLocalStorage from "./useLocalStorage";

export default function useChessGame() {
  const [fen, setFen] = useLocalStorage("chess-fen", null);
  const gameRef = useRef(new Chess());

  const [selectedSquare, setSelectedSquare] = useState("");
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    try {
      gameRef.current.load(fen);
      updateGameState();
    } catch (error) {
      console.error("Invalid FEN loaded from Storage: Resetting game");
      gameRef.current = new Chess();
    }
  }, [fen]);

  const resetGame = () => {
    gameRef.current.reset();
    updateGameState();
  };

  const updateGameState = () => {
    const newFen = gameRef.current.fen();
    setFen(newFen);
    const boardPieces = gameRef.current.board().flat().filter(Boolean);
    setPieces(boardPieces);
  };

  const movePiece = (move) => {
    try {
      gameRef.current.move(move);
      updateGameState();
      setSelectedSquare("");
    } catch (err) {
      console.error("Move error:", err);
    }
  };

  const getLegalMoves = () => {
    return selectedSquare
      ? gameRef.current.moves({ square: selectedSquare })
      : [];
  };

  return {
    gameRef,
    pieces,
    selectedSquare,
    setSelectedSquare,
    movePiece,
    getLegalMoves,
    resetGame,
  };
}
