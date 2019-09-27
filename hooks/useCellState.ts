/* eslint-disable no-param-reassign */
import { useState, useEffect } from "react";
import { CellState, Cell } from "../model/types";

const useCellState = (cell: Cell): CellState => {
  const [state, setState] = useState<CellState>(cell.state);

  useEffect(() => {
    cell.stateChangedHandlers.push(setState);
    return (): void => {
      cell.stateChangedHandlers = cell.stateChangedHandlers.filter((handler): boolean => handler !== setState);
    };
  },[]);
  return state;
}

export default useCellState;