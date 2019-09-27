/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Cell, GetCellInfo, CellState } from '../model/types';
import useCellState from '../hooks/useCellState';
import { openCell, getIsEnabled, setCellState } from '../model/board';


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
  let className = ' isClosed';

  const onClick = (): void => {
    if(getIsEnabled()) {
      openCell(cell);
    }
  };
  
  const onFlag = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.preventDefault();
    setCellState(cell, cellState | CellState.flagged);
  };

  if (isOpen) {
    if (isMine) {
      className= ' mine';
    } else {
      content = collidingMines ? collidingMines.toLocaleString() : '';
      className = ' active';
      if (content) {
        className += ' number';
      }
    }
  } else {
    currentStyle.cursor = 'pointer';
    if (cellState & GetCellInfo.flagged) {
      className += ' flag';
    }
  } 

  return (
    <div className={`box${className}`} onContextMenu={onFlag} onClick={onClick} style={currentStyle}>
      <span>
        {content}
      </span>
    </div>
  );
};
