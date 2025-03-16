
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Award,
  Gamepad2,
  ChevronLeft,
  User
} from "lucide-react";

export function Navigation() {
  const location = useLocation();
  const [user, setUser] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser).username);
    }

    // Add scroll listener for transparent nav effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";
  const isGame = location.pathname === "/game";
  const isLeaderboard = location.pathname === "/leaderboard";
  const isAuth = location.pathname === "/auth";

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 dark:bg-black/50 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {!isHomePage && (
            <Link 
              to="/" 
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200"
            >
              <ChevronLeft size={20} />
              <span className="font-medium">Home</span>
            </Link>
          )}
        </div>

        <div className="flex-1 flex justify-center">
          <Link 
            to="/" 
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            2048
          </Link>
        </div>

        <nav className="flex items-center gap-2 md:gap-4">
          {!isGame && (
            <Link to="/game">
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary hover:bg-secondary transition-colors">
                <Gamepad2 size={20} className="mr-2" />
                <span className="hidden md:inline">Play</span>
              </Button>
            </Link>
          )}
          
          {!isLeaderboard && (
            <Link to="/leaderboard">
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary hover:bg-secondary transition-colors">
                <Award size={20} className="mr-2" />
                <span className="hidden md:inline">Leaderboard</span>
              </Button>
            </Link>
          )}
          
          {user ? (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-foreground hover:text-primary hover:bg-secondary transition-colors"
              onClick={() => {
                localStorage.removeItem("currentUser");
                window.location.href = "/";
              }}
            >
              <User size={20} className="mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          ) : !isAuth && (
            <Link to="/auth">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-foreground hover:text-primary hover:bg-secondary transition-colors"
              >
                <User size={20} className="mr-2" />
                <span className="hidden md:inline">Sign In</span>
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
