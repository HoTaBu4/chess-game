import { Cell } from './cell';
import { Colors } from './Colors';
import { Pawn } from './figures/Pawn';
import { King } from './figures/King';
import { Queen } from './figures/Queen';
import { Bishop } from './figures/Bishop';
import { Knight } from './figures/Knight';
import { Rook } from './figures/Rook';
import { Figure, FIguresNames } from './figures/figure';

export class Board {
  cells: Cell[][] = [];

  lostBlackFigures: Figure[] = [];

  lostWhiteFigures: Figure[] = [];

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];

      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); // Черные ячейки
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); // белые
        }
      }

      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();

    newBoard.cells = this.cells;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    newBoard.lostBlackFigures = this.lostBlackFigures;

    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];

      for (let j = 0; j < row.length; j++) {
        const target = row[j];

        target.available =
          !!selectedCell?.figure?.canMove(target) &&
          !this.leavesKingInCheck(selectedCell, target);
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public getKingCell(color: Colors): Cell | null {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j];

        if (
          cell.figure?.name === FIguresNames.KING &&
          cell.figure.color === color
        ) {
          return cell;
        }
      }
    }

    return null;
  }

  /* eslint-disable no-param-reassign */
  public isCellUnderAttack(target: Cell, byColor: Colors): boolean {
    const originalFigure = target.figure;

    target.figure = null;

    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j];
        const attacker = cell.figure;

        if (!attacker || attacker.color !== byColor) {
          continue;
        }

        if (attacker.name === FIguresNames.PAWN) {
          const direction = byColor === Colors.BLACK ? 1 : -1;

          if (
            target.y === cell.y + direction &&
            Math.abs(target.x - cell.x) === 1
          ) {
            target.figure = originalFigure;

            return true;
          }
        } else if (attacker.name === FIguresNames.KING) {
          if (
            Math.abs(target.x - cell.x) <= 1 &&
            Math.abs(target.y - cell.y) <= 1
          ) {
            target.figure = originalFigure;

            return true;
          }
        } else {
          if (attacker.canMove(target)) {
            target.figure = originalFigure;

            return true;
          }
        }
      }
    }

    target.figure = originalFigure;

    return false;
  }
  /* eslint-enable no-param-reassign */

  public isKingUnderAttack(color: Colors): boolean {
    const kingCell = this.getKingCell(color);

    if (!kingCell) {
      return false;
    }

    const enemy = color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;

    return this.isCellUnderAttack(kingCell, enemy);
  }

  /* eslint-disable no-param-reassign */
  public leavesKingInCheck(from: Cell | null, target: Cell): boolean {
    if (!from?.figure) {
      return false;
    }

    const movingFigure = from.figure;
    const capturedFigure = target.figure;

    from.figure = null;
    target.figure = movingFigure;
    movingFigure.cell = target;

    const kingInCheck = this.isKingUnderAttack(movingFigure.color);

    movingFigure.cell = from;
    from.figure = movingFigure;
    target.figure = capturedFigure;
    if (capturedFigure) {
      capturedFigure.cell = target;
    }

    return kingInCheck;
  }
  /* eslint-enable no-param-reassign */
  /* eslint-enable no-param-reassign */

  public hasAnyLegalMove(color: Colors): boolean {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j];
        const figure = cell.figure;

        if (!figure || figure.color !== color) {
          continue;
        }

        for (let y = 0; y < this.cells.length; y++) {
          for (let x = 0; x < this.cells[y].length; x++) {
            const target = this.cells[y][x];

            if (
              figure.canMove(target) &&
              !this.leavesKingInCheck(cell, target)
            ) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }

  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0));
    new King(Colors.WHITE, this.getCell(4, 7));
  }

  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }

  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }

  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }

  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }

  public addFigures() {
    this.addPawns();
    this.addKnights();
    this.addKings();
    this.addBishops();
    this.addQueens();
    this.addRooks();
  }
}
