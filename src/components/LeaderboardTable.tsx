
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Award, User, Medal } from 'lucide-react';

interface LeaderboardUser {
  username: string;
  highScore: number;
  rank?: number;
}

const LeaderboardTable = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    // Get current user
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser).username);
    }

    // Load users from localStorage
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Sort users by high score and add rank
      const rankedUsers = storedUsers
        .sort((a: LeaderboardUser, b: LeaderboardUser) => b.highScore - a.highScore)
        .map((user: LeaderboardUser, index: number) => ({
          ...user,
          rank: index + 1
        }));
      
      setUsers(rankedUsers);
      setLoading(false);
    }, 500); // Simulate loading
  }, []);

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Medal className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Medal className="text-amber-700" size={20} />;
      default:
        return rank;
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin">
            <Award size={24} className="text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full glass-panel rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 text-center">Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead className="text-right">High Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                No scores yet. Be the first to play!
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow 
                key={user.username}
                className={currentUser === user.username ? "bg-primary/5" : ""}
              >
                <TableCell className="text-center font-medium">
                  {user.rank && user.rank <= 3 
                    ? <div className="flex justify-center">{getMedalIcon(user.rank)}</div>
                    : user.rank
                  }
                </TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                  <User size={16} className={currentUser === user.username ? "text-primary" : "text-muted-foreground"} />
                  {user.username}
                  {currentUser === user.username && <span className="text-xs text-primary ml-2">(You)</span>}
                </TableCell>
                <TableCell className="text-right">
                  {user.highScore.toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
