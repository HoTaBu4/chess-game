import React, { FC, useEffect } from 'react';
import { Board } from '../../models/board';
import { Cell } from '../../models/cell';
import CellComponent from './cellsComponent';
import { useState } from 'react';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function updateBoard() {
    const newBoard = board.getCopyBoard();

    setBoard(newBoard);
  }

  function hightLightCells() {
    board.hightLightCells(selectedCell);
    updateBoard();
  }

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFugures(cell);
      setSelectedCell(null);
    } else {
      setSelectedCell(cell);
    }
  }

  useEffect(() => {
    hightLightCells();
  }, [selectedCell]);

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
