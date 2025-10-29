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
      const enemyColor =
        this.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;

      if (!this.cell.board.isCellUnderAttack(target, enemyColor)) {
        return true;
      }
    }

    return false;
  }
}
