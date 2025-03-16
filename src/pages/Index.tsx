
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Gamepad2, Award, ChevronRight, User } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Index = () => {
  const isLoggedIn = localStorage.getItem('currentUser') !== null;

  useEffect(() => {
    // Add page transition animation
    document.body.classList.add('page-transition');
    return () => {
      document.body.classList.remove('page-transition');
    };
  }, []);

  return (
    <>
      <Navigation />
      <div className="min-h-screen animate-page-transition-in">
        {/* Hero Section */}
        <div className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
            <div className="space-y-6 max-w-3xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <span>The addictive puzzle game</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Join the tiles, reach <span className="text-primary">2048</span>!
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the classic puzzle game reimagined with elegant design and smooth animations.
                Challenge yourself to reach higher scores and climb the leaderboard.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to="/game">
                  <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full px-6">
                    <Gamepad2 size={20} />
                    Play Now
                  </Button>
                </Link>
                
                <Link to="/leaderboard">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 rounded-full px-6">
                    <Award size={20} />
                    Leaderboard
                  </Button>
                </Link>
                
                {!isLoggedIn && (
                  <Link to="/auth">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2 rounded-full px-6">
                      <User size={20} />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          {/* Decorative tiles floating in background */}
          <div className="absolute top-1/4 right-10 w-16 h-16 bg-tile-2 rounded-lg shadow-lg opacity-70 animate-[floating_8s_ease-in-out_infinite] rotate-12"></div>
          <div className="absolute top-1/3 left-10 w-16 h-16 bg-tile-4 rounded-lg shadow-lg opacity-70 animate-[floating_10s_ease-in-out_infinite_reverse] -rotate-6"></div>
          <div className="absolute top-2/3 right-1/4 w-16 h-16 bg-tile-8 rounded-lg shadow-lg opacity-70 animate-[floating_7s_ease-in-out_infinite] rotate-3"></div>
          <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-tile-16 rounded-lg shadow-lg opacity-70 animate-[floating_12s_ease-in-out_infinite_reverse] -rotate-12"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-tile-32 rounded-lg shadow-lg opacity-70 animate-[floating_9s_ease-in-out_infinite] rotate-6"></div>
        </div>
        
        {/* Features Section */}
        <div className="py-20 px-4 bg-secondary/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-panel p-6 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg mb-4">
                  <Gamepad2 size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Elegant Gameplay</h3>
                <p className="text-muted-foreground">
                  Smooth animations and intuitive controls make playing 2048 a delightful experience.
                </p>
              </div>
              
              <div className="glass-panel p-6 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg mb-4">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
                <p className="text-muted-foreground">
                  Compete with other players and track your progress on a global leaderboard.
                </p>
              </div>
              
              <div className="glass-panel p-6 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg mb-4">
                  <User size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">User Accounts</h3>
                <p className="text-muted-foreground">
                  Create an account to save your progress and compete with friends across devices.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Link to="/game">
                <Button variant="outline" className="rounded-full px-6 gap-2">
                  Start Playing
                  <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="py-12 px-4 text-center text-muted-foreground">
          <div className="max-w-4xl mx-auto">
            <div className="text-xl font-semibold mb-4">2048 Game</div>
            <p className="text-sm mb-6">
              A beautiful implementation of the classic 2048 puzzle game.
              <br />
              Created with attention to design detail and smooth interactions.
            </p>
            <div className="text-xs">
              © {new Date().getFullYear()} 2048 Game. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
