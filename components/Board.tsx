import React from 'react';
import useWindowSize from '../hooks/useWindowSize';
import { getAllCells } from '../model/board';
import { Cell } from '../model/types';
import settings from '../settings';
import CellUI from './CellUI';

export default (): JSX.Element => {
  const size = useWindowSize();
  const side = Math.min(size.width - 40, size.height- 40);
  const cells = getAllCells();
  const style: React.CSSProperties =  {
    position: 'absolute',
    left: (size.width - side) / 2,
    top: (size.height - side) / 2,
    color: '#fff',
    width: side,
    height: side,
    backgroundColor: '#555',
  };
  const drawCell = (cell: Cell): JSX.Element => {
    const cellStyle: React.CSSProperties = {
      position: 'absolute',
      width: side / settings.width,
      height: side / settings.height,
      left: (side / settings.width) * cell.x,
      top: (side / settings.height) * cell.y,
      zIndex: cell.x * settings.height + cell.y,
    };
    return <CellUI key={`${cell.x}-${cell.y}`} style={cellStyle} cell={cell} />;
  };
  return <div style={style}>{cells.map(drawCell)}</div>
};
