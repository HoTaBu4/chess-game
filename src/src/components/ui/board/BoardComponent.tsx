import React, { FC } from 'react';
import { Board } from '../../models/board';
import { Cell } from '../../models/cell';
import CellComponent from './cellsComponent';
import { useState } from 'react';
import { Player } from '../../models/Player';
import { Colors } from '../../models/Colors';

interface BoardProps {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  currentPlayer: Player | null;
  swapPlayer: () => void;
  onGameOver: (winner: Colors) => void;
  gameOver: boolean;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  swapPlayer,
  currentPlayer,
  onGameOver,
  gameOver,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const highlight = (cell: Cell | null) => {
    board.highlightCells(cell);
    setBoard(board.getCopyBoard());
  };

  function click(cell: Cell) {
    if (gameOver) {
      return;
    }

    if (
      selectedCell &&
      selectedCell.x === cell.x &&
      selectedCell.y === cell.y
    ) {
      setSelectedCell(null);
      highlight(null);

      return;
    }

    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      const movingColor = selectedCell.figure?.color;
      const moveMade = selectedCell.movefigures(cell);

      if (moveMade && movingColor) {
        const opponentColor =
          movingColor === Colors.WHITE ? Colors.BLACK : Colors.WHITE;

        highlight(null);
        const opponentInCheck = board.isKingUnderAttack(opponentColor);
        const opponentHasMoves = board.hasAnyLegalMove(opponentColor);

        if (opponentInCheck && !opponentHasMoves) {
          onGameOver(movingColor);
        } else {
          swapPlayer();
        }

        setSelectedCell(null);

        return;
      }
    }

    if (cell.figure?.color === currentPlayer?.color) {
      setSelectedCell(cell);
      highlight(cell);
    } else if (selectedCell) {
      setSelectedCell(null);
      highlight(null);
    } else {
      highlight(null);
    }
  }

  return (
    <div className="board">
      {board.cells.map((row, i) => (
        <React.Fragment key={i}>
          {row.map(cell => (
            <CellComponent
              click={click}
              cell={cell}
              key={cell.id}
              selected={
                selectedCell?.x === cell.x && cell.y === selectedCell?.y
              }
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;
