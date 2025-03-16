
export type Direction = 'up' | 'right' | 'down' | 'left';
export type Grid = (number | null)[][];
export type Position = { row: number; col: number };

// Create an initial grid
export const createGrid = (size: number = 4): Grid => {
  return Array(size).fill(null).map(() => Array(size).fill(null));
};

// Get empty positions in the grid
export const getEmptyPositions = (grid: Grid): Position[] => {
  const positions: Position[] = [];
  
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === null) {
        positions.push({ row: rowIndex, col: colIndex });
      }
    });
  });
  
  return positions;
};

// Add a random tile (2 or 4) to the grid
export const addRandomTile = (grid: Grid): { grid: Grid; position: Position; value: number } => {
  const newGrid = grid.map(row => [...row]);
  const emptyPositions = getEmptyPositions(newGrid);
  
  if (emptyPositions.length === 0) {
    return { grid: newGrid, position: { row: -1, col: -1 }, value: 0 };
  }
  
  const randomPositionIndex = Math.floor(Math.random() * emptyPositions.length);
  const position = emptyPositions[randomPositionIndex];
  
  // 90% chance for a 2, 10% chance for a 4
  const value = Math.random() < 0.9 ? 2 : 4;
  
  newGrid[position.row][position.col] = value;
  
  return { 
    grid: newGrid, 
    position,
    value 
  };
};

// Initialize the game with two random tiles
export const initializeGame = (size: number = 4): { grid: Grid; newTiles: { position: Position; value: number }[] } => {
  let grid = createGrid(size);
  const newTiles = [];
  
  // Add first tile
  const firstTile = addRandomTile(grid);
  grid = firstTile.grid;
  newTiles.push({ position: firstTile.position, value: firstTile.value });
  
  // Add second tile
  const secondTile = addRandomTile(grid);
  grid = secondTile.grid;
  newTiles.push({ position: secondTile.position, value: secondTile.value });
  
  return { grid, newTiles };
};

// Rotate the grid clockwise (for up, left, down movements)
const rotateGrid = (grid: Grid, times: number = 1): Grid => {
  const size = grid.length;
  let newGrid = grid.map(row => [...row]);
  
  for (let i = 0; i < times; i++) {
    const rotated: Grid = [];
    for (let col = 0; col < size; col++) {
      const newRow = [];
      for (let row = size - 1; row >= 0; row--) {
        newRow.push(newGrid[row][col]);
      }
      rotated.push(newRow);
    }
    newGrid = rotated;
  }
  
  return newGrid;
};

// Process a single row (moving right)
const processRow = (row: (number | null)[]): { newRow: (number | null)[]; score: number; merged: boolean[] } => {
  const newRow = [...row];
  const size = newRow.length;
  let score = 0;
  const merged = Array(size).fill(false);
  
  // Move all numbers to the right
  for (let i = size - 2; i >= 0; i--) {
    if (newRow[i] !== null) {
      let j = i;
      while (j + 1 < size && newRow[j + 1] === null) {
        newRow[j + 1] = newRow[j];
        newRow[j] = null;
        j++;
      }
      
      // Check for merges
      if (j + 1 < size && newRow[j + 1] === newRow[j] && !merged[j + 1]) {
        newRow[j + 1] = newRow[j + 1]! * 2;
        score += newRow[j + 1]!;
        newRow[j] = null;
        merged[j + 1] = true;
      }
    }
  }
  
  return { newRow, score, merged };
};

// Move tiles in the specified direction
export const moveTiles = (grid: Grid, direction: Direction): { 
  grid: Grid; 
  score: number; 
  moved: boolean;
  mergedPositions: Position[];
} => {
  const size = grid.length;
  let rotations = 0;
  let newGrid: Grid;
  let score = 0;
  let moved = false;
  const mergedPositions: Position[] = [];
  
  // Determine rotations needed based on direction
  switch (direction) {
    case 'up':
      rotations = 1;
      break;
    case 'left':
      rotations = 2;
      break;
    case 'down':
      rotations = 3;
      break;
    default: // 'right'
      rotations = 0;
  }
  
  // Rotate grid to process all movements as 'right'
  newGrid = rotateGrid(grid, rotations);
  
  // Process each row
  for (let i = 0; i < size; i++) {
    const { newRow, score: rowScore, merged } = processRow(newGrid[i]);
    
    // Check if the grid changed
    for (let j = 0; j < size; j++) {
      if (newRow[j] !== newGrid[i][j]) {
        moved = true;
      }
      if (merged[j]) {
        // Convert merged position back to original orientation
        let pos: Position = { row: i, col: j };
        // Rotate position back based on original direction
        for (let r = 0; r < (4 - rotations) % 4; r++) {
          pos = { row: pos.col, col: size - 1 - pos.row };
        }
        mergedPositions.push(pos);
      }
    }
    
    newGrid[i] = newRow;
    score += rowScore;
  }
  
  // Rotate grid back to original orientation
  newGrid = rotateGrid(newGrid, (4 - rotations) % 4);
  
  return { grid: newGrid, score, moved, mergedPositions };
};

// Check if there are no more moves possible
export const isGameOver = (grid: Grid): boolean => {
  // Check for empty cells
  if (getEmptyPositions(grid).length > 0) {
    return false;
  }
  
  const size = grid.length;
  
  // Check for possible merges
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const current = grid[row][col];
      
      // Check cell to the right
      if (col < size - 1 && grid[row][col + 1] === current) {
        return false;
      }
      
      // Check cell below
      if (row < size - 1 && grid[row + 1][col] === current) {
        return false;
      }
    }
  }
  
  return true;
};

// Check if player has won (has a 2048 tile)
export const hasWon = (grid: Grid): boolean => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 2048) {
        return true;
      }
    }
  }
  return false;
};
