import React from "react";
import BoardComponent from "./BoardComponent";
import { Board } from "../../models/board";
import { Player } from "../../models/Player";

interface Props {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const OuterBoardComponent:React.FC<Props> = ({board,setBoard, swapPlayer, currentPlayer}) => {
  return (
    <div className="board__wrapper">
      <BoardComponent
        board={board}
        setBoard={setBoard}
        swapPlayer={swapPlayer}
        currentPlayer={currentPlayer}
      />
      <div className="board__identification-top">
        <div className="board__identification-item">A</div>
        <div className="board__identification-item">B</div>
        <div className="board__identification-item">C</div>
        <div className="board__identification-item">D</div>
        <div className="board__identification-item">E</div>
        <div className="board__identification-item">F</div>
        <div className="board__identification-item">G</div>
        <div className="board__identification-item">H</div>
      </div>
      <div className="board__identification-left identification-row">
        <div className="board__identification-item">1</div>
        <div className="board__identification-item">2</div>
        <div className="board__identification-item">3</div>
        <div className="board__identification-item">4</div>
        <div className="board__identification-item">5</div>
        <div className="board__identification-item">6</div>
        <div className="board__identification-item">7</div>
        <div className="board__identification-item">8</div>
      </div>
      <div className="board__identification-bottom identification-row">
        <div className="board__identification-item">A</div>
        <div className="board__identification-item">B</div>
        <div className="board__identification-item">C</div>
        <div className="board__identification-item">D</div>
        <div className="board__identification-item">E</div>
        <div className="board__identification-item">F</div>
        <div className="board__identification-item">G</div>
        <div className="board__identification-item">H</div>
      </div>
      <div className="board__identification-right identification-row">
        <div className="board__identification-item">1</div>
        <div className="board__identification-item">2</div>
        <div className="board__identification-item">3</div>
        <div className="board__identification-item">4</div>
        <div className="board__identification-item">5</div>
        <div className="board__identification-item">6</div>
        <div className="board__identification-item">7</div>
        <div className="board__identification-item">8</div>
      </div>
    </div>
  )
}


export default OuterBoardComponent;