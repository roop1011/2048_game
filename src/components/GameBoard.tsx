
import { useMemo } from 'react';
import Tile from './Tile';
import { Grid, Position } from '@/lib/gameLogic';

interface GameBoardProps {
  grid: Grid;
  newTile: { position: Position; value: number } | null;
  mergedPositions: Position[];
  gameId: number;
}

const GameBoard = ({ grid, newTile, mergedPositions, gameId }: GameBoardProps) => {
  const size = grid.length;
  
  // Generate background grid cells
  const backgroundCells = useMemo(() => {
    const cells = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        cells.push(
          <div 
            key={`cell-${row}-${col}`}
            className="bg-secondary/50 rounded-md"
            style={{
              width: `calc(${100 / size}% - 16px)`,
              height: `calc(${100 / size}% - 16px)`,
              margin: '8px',
            }}
          />
        );
      }
    }
    return cells;
  }, [size]);
  
  // Generate tiles
  const tiles = useMemo(() => {
    const tileElements = [];
    
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const value = grid[row][col];
        if (value !== null) {
          const position: Position = { row, col };
          const isNew = newTile !== null && 
                      newTile.position.row === row && 
                      newTile.position.col === col;
                      
          const isMerged = mergedPositions.some(
            pos => pos.row === row && pos.col === col
          );
          
          tileElements.push(
            <Tile 
              key={`tile-${row}-${col}-${gameId}-${value}`}
              value={value}
              position={position}
              size={size}
              isNew={isNew}
              isMerged={isMerged}
            />
          );
        }
      }
    }
    
    return tileElements;
  }, [grid, newTile, mergedPositions, size, gameId]);
  
  return (
    <div 
      className="relative w-full aspect-square max-w-md mx-auto bg-secondary/20 rounded-xl p-2 shadow-inner no-select"
    >
      {/* Background cells */}
      <div className="absolute inset-0 flex flex-wrap">
        {backgroundCells}
      </div>
      
      {/* Tiles */}
      {tiles}
      
      {/* Touch control indicators - invisible but help with touch areas */}
      <div className="absolute inset-0 grid grid-cols-1 grid-rows-1">
        <div className="swipe-up" />
        <div className="swipe-right" />
        <div className="swipe-down" />
        <div className="swipe-left" />
      </div>
    </div>
  );
};

export default GameBoard;
