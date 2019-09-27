export enum CellState {
  empty   = 0b0000000,
  mines1  = 0b0000001,
  mines2  = 0b0000010,
  mines3  = 0b0000011,
  mines4  = 0b0000100,
  mines5  = 0b0000101,
  mines6  = 0b0000110,
  mines7  = 0b0000111,
  mines8  = 0b0001000,
  mines9  = 0b0001001,
  isMine  = 0b0010000,
  opened  = 0b0100000,
  flagged = 0b1000000,
}

export enum GetCellInfo {
  mineNum = 0b0001111,
  isMine  = 0b0010000,
  opened  = 0b0100000,
  flagged  = 0b1000000,
}

export type SetCellState = (newState: CellState) => void;

export interface Cell {
  x: number;
  y: number;
  state: CellState;
  stateChangedHandlers: SetCellState[];
}

export type Board = Cell[][];
