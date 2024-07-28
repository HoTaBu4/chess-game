import { Figure, FIguresNames } from './figure';
import { Cell } from '../cell';
import { Colors } from '../Colors';

import blacklogo from '../../../assets/black-pawn.png';
import whitelogo from '../../../assets/white-pawn.png';

export class Pawn extends Figure {
  isFirstStep = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
    this.name = FIguresNames.PAWN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const direction = this.cell?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection = this.cell?.color === Colors.BLACK ? 2 : -2;

    if (
      (target.y === this.cell.y + direction ||
        (this.isFirstStep && target.y === this.cell.y + firstStepDirection)) &&
      target.x == this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    if (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target)
    ) {
      return true;
    }

    return false;
  }

  MoveFigure(target: Cell): void {
    super.MoveFigure(target);
    this.isFirstStep = false;
  }
}
