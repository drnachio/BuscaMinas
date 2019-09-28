/* eslint-disable operator-assignment */
/* eslint-disable no-param-reassign */
import { Board, Cell, CellState, SetCellState, GetCellInfo } from '../types';
import setting from '../../settings';

let isEnabled = true;

const allCells = new Array<Cell>();

const getInitialBoard = (): Board => {
  const result = new Array<Cell[]>();
  for (let y = 0; y < setting.height; y++) {
    const row = new Array<Cell>();
    for (let x = 0; x < setting.width; x++) {
      const cell = {
        state: CellState.empty,
        x,
        y,
        stateChangedHandlers: new Array<SetCellState>(),
      };
      row.push(cell);
      allCells.push(cell);
    }
    result.push(row);
  }
  return result;
};

const currentBoard = getInitialBoard();

export const getBoard = (): Board => currentBoard;

export const getIsEnabled = (): boolean => isEnabled;

export const getAllCells = (): Cell[] => allCells;

export const setCellState = (cell: Cell, state: CellState): void => {
  cell.state = state;
  cell.stateChangedHandlers.forEach((handler): void => {
    handler(state);
  });
};


const clearBoard = (): void => {
  allCells.forEach((cell): void => {
    setCellState(cell, CellState.empty);
  });
};

export const getNextCellsCross = (cell: Cell): Cell[] => {
  const result = new Array<Cell>();
  for (
    let y = Math.max(0, cell.y - 1);
    y < Math.min(cell.y + 2, setting.height);
    y++
  ) {
    for (
      let x = Math.max(0, cell.x - 1);
      x < Math.min(cell.x + 2, setting.width);
      x++
    ) {
      if (x === cell.x || y === cell.y) {
        result.push(currentBoard[y][x]);
      }
    }
  }
  return result;
};

export const getNextCells = (cell: Cell): Cell[] => {
  const result = new Array<Cell>();
  for (
    let y = Math.max(0, cell.y - 1);
    y < Math.min(cell.y + 2, setting.height);
    y++
  ) {
    for (
      let x = Math.max(0, cell.x - 1);
      x < Math.min(cell.x + 2, setting.width);
      x++
    ) {
      result.push(currentBoard[y][x]);
    }
  }
  return result;
};

const addNines = (): void => {
  const cellsWithMine = allCells
    .sort((): number => Math.random() - 0.5)
    .filter((_, i) => i < setting.totalMines);

  cellsWithMine.forEach((cell): void => {
    setCellState(cell, cell.state | CellState.isMine);
    getNextCells(cell).forEach((colindan): void => {
      colindan.state += 1;
    });
  });
};

export const resetBoard = (): void => {
  clearBoard();
  addNines();
  isEnabled = true;
};

export const openCell = (cell: Cell): void => {
  if (!(cell.state & GetCellInfo.opened)) {
    setCellState(cell, cell.state | GetCellInfo.opened);
    if (cell.state & GetCellInfo.isMine) {
      isEnabled = false;
      setTimeout(() => {
        resetBoard();
      }, 1000);
    } else if ((cell.state & GetCellInfo.mineNum) === 0) {
        setTimeout(() => {
          getNextCellsCross(cell).forEach((nextCell): void => {
            if (!(cell.state & GetCellInfo.isMine)) {
              openCell(nextCell);
            }
          });
        }, 100);
      }
  }
};

resetBoard();
