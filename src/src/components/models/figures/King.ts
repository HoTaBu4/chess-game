import { Figure, FIguresNames } from './figure';
import { Colors } from '../Colors';
import { Cell } from '../cell';

import blacklogo from '../../../assets/black-king.png';
import whitelogo from '../../../assets/white-king.png';

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
    this.name = FIguresNames.KING;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    // Check if the target cell is within one square distance
    if (dx <= 1 && dy <= 1) {
      // Ensure the target cell is either empty or contains an opponent's piece
      if (target.figure === null || target.figure.color !== this.color) {
        if (!this.isUnderAttack(target)) {
          return true;
        }
      }
    }

    return false;
  }

  isUnderAttack(target: Cell): boolean {
    // Loop through all cells on the board
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const cell = this.cell.board.getCell(row, col);
        const opponentFigure = cell.figure;

        // If there is an opponent's piece on the cell
        if (opponentFigure && opponentFigure.color !== this.color) {
          // Special case for pawns since they attack differently than they move
          if (opponentFigure.name === FIguresNames.PAWN) {
            // Check if the pawn can attack the target cell
            if (
              (target.x === cell.x + 1 || target.x === cell.x - 1) &&
              target.y ===
                cell.y + (opponentFigure.color === Colors.BLACK ? 1 : -1)
            ) {
              return true; // The target cell is under attack by a pawn
            }
          } else {
            // For all other pieces, use the canMove method
            if (opponentFigure.canMove(target)) {
              return true; // The target cell is under attack
            }
          }
        }
      }
    }

    return false; // The target cell is safe
  }
}
