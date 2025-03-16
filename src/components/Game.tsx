
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GameBoard from './GameBoard';
import { useGameState } from '@/lib/useGameState';
import { RefreshCw, Award } from 'lucide-react';

const Game = () => {
  const { 
    grid, 
    score, 
    bestScore, 
    isGameOver, 
    hasWon, 
    newTile, 
    mergedPositions,
    gameId,
    moves,
    initGame 
  } = useGameState();

  // Instructions on how to play
  const instructions = [
    "Swipe or use arrow keys to move tiles",
    "When two tiles with the same number touch, they merge!",
    "Join the tiles to reach 2048 and beyond"
  ];

  return (
    <div className="max-w-md mx-auto px-4">
      {/* Game header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">2048</h1>
          <p className="text-sm text-muted-foreground">Join the tiles, reach 2048!</p>
        </div>
        
        <div className="flex gap-4">
          <div className="glass-panel px-4 py-2 min-w-[80px] text-center">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Score</div>
            <div className="text-xl font-bold">{score}</div>
          </div>
          
          <div className="glass-panel px-4 py-2 min-w-[80px] text-center">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Best</div>
            <div className="text-xl font-bold">{bestScore}</div>
          </div>
        </div>
      </div>
      
      {/* Game actions */}
      <div className="flex justify-between mb-6">
        <Button 
          onClick={initGame}
          variant="secondary" 
          className="gap-2 text-sm"
        >
          <RefreshCw size={16} />
          New Game
        </Button>
        
        <div className="glass-panel px-4 py-2 flex items-center gap-2 text-sm">
          <Award size={16} className="text-accent" />
          Moves: {moves}
        </div>
      </div>
      
      {/* Game board */}
      <GameBoard 
        grid={grid} 
        newTile={newTile} 
        mergedPositions={mergedPositions}
        gameId={gameId}
      />
      
      {/* Game over overlay */}
      {isGameOver && (
        <div className="fixed inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center z-50 animate-page-transition-in">
          <div className="glass-panel p-8 text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Game Over</h2>
            <p className="mb-6">Your score: <span className="font-bold">{score}</span></p>
            <Button onClick={initGame} className="w-full">Play Again</Button>
          </div>
        </div>
      )}
      
      {/* Instructions - shown below the game board */}
      <div className="mt-8 glass-panel p-4 rounded-xl">
        <h3 className="text-lg font-medium mb-2">How to Play</h3>
        <ul className="space-y-2">
          {instructions.map((instruction, index) => (
            <li key={index} className="text-sm flex items-start gap-2">
              <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary w-5 h-5 text-xs font-bold">
                {index + 1}
              </span>
              {instruction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
