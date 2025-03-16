
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Game from '@/components/Game';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { User, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const GamePage = () => {
  const navigate = useNavigate();
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
                <Link to="/leaderboard">
                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                    <Award size={16} />
                    <span>Leaderboard</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <Game />
        </div>
      </div>
    </>
  );
};

export default GamePage;
