
import { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Direction,
  initializeGame,
  moveTiles,
  addRandomTile,
  isGameOver,
  hasWon,
  Position
} from './gameLogic';
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";

export interface GameState {
  grid: Grid;
  score: number;
  bestScore: number;
  isGameOver: boolean;
  hasWon: boolean;
  newTile: { position: Position; value: number } | null;
  mergedPositions: Position[];
}

export const useGameState = () => {
  const [state, setState] = useState<GameState>({
    grid: [],
    score: 0,
    bestScore: 0,
    isGameOver: false,
    hasWon: false,
    newTile: null,
    mergedPositions: []
  });
  
  const [gameId, setGameId] = useState(0); // Used to force re-renders
  const [moves, setMoves] = useState(0);
  
  // Initialize the game
  const initGame = useCallback(() => {
    const currentUser = localStorage.getItem('currentUser');
    const bestScore = currentUser 
      ? JSON.parse(currentUser).highScore 
      : localStorage.getItem('bestScore') 
        ? parseInt(localStorage.getItem('bestScore') || '0') 
        : 0;
    
    const { grid, newTiles } = initializeGame();
    
    setState({
      grid,
      score: 0,
      bestScore,
      isGameOver: false,
      hasWon: false,
      newTile: newTiles[1], // Only show animation for the last tile
      mergedPositions: []
    });
    
    setMoves(0);
    setGameId(prevId => prevId + 1);
  }, []);
  
  // Use effect to initialize the game on component mount
  useEffect(() => {
    initGame();
  }, [initGame]);
  
  // Update local storage when best score changes
  useEffect(() => {
    if (state.score > state.bestScore) {
      setState(prev => ({ ...prev, bestScore: state.score }));
      
      // Update best score in local storage
      const currentUser = localStorage.getItem('currentUser');
      
      if (currentUser) {
        // Update user's high score
        const user = JSON.parse(currentUser);
        user.highScore = state.score;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Update user in users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map((u: any) => 
          u.username === user.username ? { ...u, highScore: state.score } : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      } else {
        // Just update anonymous best score
        localStorage.setItem('bestScore', state.score.toString());
      }
    }
  }, [state.score, state.bestScore]);
  
  // Check for game over
  useEffect(() => {
    if (state.grid.length > 0 && isGameOver(state.grid) && !state.isGameOver) {
      setState(prev => ({ ...prev, isGameOver: true }));
      toast.error("Game Over!");
    }
  }, [state.grid, state.isGameOver]);
  
  // Check for win
  useEffect(() => {
    if (state.grid.length > 0 && hasWon(state.grid) && !state.hasWon) {
      setState(prev => ({ ...prev, hasWon: true }));
      toast.success("You reached 2048! Keep going!");
    }
  }, [state.grid, state.hasWon]);
  
  // Handle moves
  const move = useCallback((direction: Direction) => {
    setState(prev => {
      if (prev.isGameOver) return prev;
      
      const { grid: movedGrid, score: moveScore, moved, mergedPositions } = moveTiles(prev.grid, direction);
      
      if (!moved) return prev;
      
      const { grid: gridWithNewTile, position, value } = addRandomTile(movedGrid);
      
      // Increment move counter
      setMoves(m => m + 1);
      
      return {
        ...prev,
        grid: gridWithNewTile,
        score: prev.score + moveScore,
        newTile: { position, value },
        mergedPositions
      };
    });
  }, []);
  
  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          move('up');
          e.preventDefault();
          break;
        case 'ArrowRight':
          move('right');
          e.preventDefault();
          break;
        case 'ArrowDown':
          move('down');
          e.preventDefault();
          break;
        case 'ArrowLeft':
          move('left');
          e.preventDefault();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);
  
  // Handle swipe events
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 50) {
          move('right');
        } else if (deltaX < -50) {
          move('left');
        }
      } else {
        // Vertical swipe
        if (deltaY > 50) {
          move('down');
        } else if (deltaY < -50) {
          move('up');
        }
      }
    };
    
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [move]);
  
  return {
    ...state,
    gameId,
    moves,
    initGame,
    move
  };
};
