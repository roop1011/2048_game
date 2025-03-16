
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import LeaderboardTable from '@/components/LeaderboardTable';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Gamepad2, User } from 'lucide-react';

const Leaderboard = () => {
  const isLoggedIn = !!localStorage.getItem('currentUser');

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
      <div className="min-h-screen pt-24 pb-16 px-4 animate-page-transition-in">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
            <p className="text-muted-foreground">See how you rank against other players</p>
          </div>

          {!isLoggedIn && (
            <div className="glass-panel p-4 rounded-xl mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User size={18} className="text-primary" />
                <span>Sign in to save your scores and appear on the leaderboard!</span>
              </div>
              <div className="flex gap-2">
                <Link to="/auth">
                  <Button variant="outline" size="sm">Sign In</Button>
                </Link>
                <Link to="/game">
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <Gamepad2 size={16} />
                    <span>Play Game</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <LeaderboardTable />

          <div className="mt-8 text-center">
            <Link to="/game">
              <Button>
                <Gamepad2 size={20} className="mr-2" />
                Play Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
