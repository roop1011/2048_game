
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

// Mock database functions until we connect to a real database
const mockUsers = [
  { username: "demo", password: "password", highScore: 2048 }
];

interface User {
  username: string;
  password: string;
  highScore: number;
}

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [signupForm, setSignupForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("currentUser");
    if (user) {
      navigate("/game");
    }
    
    // Initialize local storage if not exists
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(mockUsers));
    }
  }, [navigate]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
      const user = users.find(
        (u) => u.username === loginForm.username && u.password === loginForm.password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        toast.success("Login successful!");
        navigate("/game");
      } else {
        toast.error("Invalid username or password");
      }
      setIsLoading(false);
    }, 800); // Simulated delay for "network request"
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
      
      if (users.some(user => user.username === signupForm.username)) {
        toast.error("Username already exists");
        setIsLoading(false);
        return;
      }

      const newUser = {
        username: signupForm.username,
        password: signupForm.password,
        highScore: 0
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      
      toast.success("Account created successfully!");
      navigate("/game");
      setIsLoading(false);
    }, 800); // Simulated delay for "network request"
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center px-4 py-24 animate-page-transition-in">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">Welcome to 2048</h1>
            <p className="mt-2 text-muted-foreground">Sign in to save your scores</p>
          </div>

          <Card className="w-full glass-panel">
            <CardHeader>
              <Tabs defaultValue="login" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="mt-4">
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-username">Username</Label>
                        <Input 
                          id="login-username" 
                          name="username" 
                          placeholder="Enter your username" 
                          required 
                          value={loginForm.username}
                          onChange={handleLoginChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input 
                          id="login-password" 
                          name="password" 
                          type="password" 
                          placeholder="Enter your password" 
                          required 
                          value={loginForm.password}
                          onChange={handleLoginChange}
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="mt-4">
                  <form onSubmit={handleSignup}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-username">Username</Label>
                        <Input 
                          id="signup-username" 
                          name="username" 
                          placeholder="Choose a username" 
                          required 
                          value={signupForm.username}
                          onChange={handleSignupChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input 
                          id="signup-password" 
                          name="password" 
                          type="password" 
                          placeholder="Choose a password" 
                          required 
                          value={signupForm.password}
                          onChange={handleSignupChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm">Confirm Password</Label>
                        <Input 
                          id="signup-confirm" 
                          name="confirmPassword" 
                          type="password" 
                          placeholder="Confirm your password" 
                          required 
                          value={signupForm.confirmPassword}
                          onChange={handleSignupChange}
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardHeader>
            <CardFooter className="flex flex-col space-y-4">
              <p className="text-sm text-center text-muted-foreground">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;
