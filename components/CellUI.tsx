/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Cell, GetCellInfo } from '../model/types';
import useCellState from '../hooks/useCellState';
import { openCell } from '../model/board';

interface CellProps {
  style: React.CSSProperties;
  cell: Cell;
}

export default ({ style, cell }: CellProps): JSX.Element => {
  const cellState = useCellState(cell);
  const isOpen = cellState & GetCellInfo.opened;
  const isMine = cellState & GetCellInfo.isMine;
  const collidingMines = cellState & GetCellInfo.mineNum;

  const currentStyle = {
    ...style,
  };

  let content = '';
  let className = 'isClosed';

  const onClick = (): void => {
    openCell(cell);
  };

  if (isOpen) {
    if (isMine) {
      className= 'mine';
    } else {
      content = collidingMines ? collidingMines.toLocaleString() : '';
      className = 'isOpened';
      if (content) {
        className += ' number';
      }
    }
  } else {
    currentStyle.cursor = 'pointer';
  }

  return (
    <div className={`box ${className}`} onClick={onClick} style={currentStyle}>
      {content}
    </div>
  );
};
