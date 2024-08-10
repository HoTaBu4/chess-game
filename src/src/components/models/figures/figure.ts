import { Cell } from '../cell';
import { Colors } from '../Colors';

import logo from '../../../assets/white-bishop.png';

export enum FIguresNames {
  FIGURE = 'figure',
  KING = 'king',
  KNIGHT = 'knight',
  PAWN = 'Pawn',
  QUEEN = 'Queen',
  ROOK = 'Rook',
  BISHOP = 'Bishop',
}

export class Figure {
  color: Colors;

  logo: typeof logo | null;

  cell: Cell;

  name: FIguresNames;

  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FIguresNames.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }

    if (target.figure?.name == FIguresNames.KING) {
      return false;
    }

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MoveFigure(_target: Cell) {}
}
