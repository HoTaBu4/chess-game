import { Cell } from '../cell';
import { Colors } from '../Colors';
import { Figure, FIguresNames } from './figure';

import blacklogo from '../../../assets/black-bishop.png';
import whitelogo from '../../../assets/white-bishop.png';

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
    this.name = FIguresNames.BISHOP;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    }

    return false;
  }
}
