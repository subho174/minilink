import { useState } from "react"; // Import useState
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function LoginForm({
  className,
  isLogin = true,
  api,
  onToggleForm,
  ...props
}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  // function to submit sign-in or sign-up form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    try {
      // setting api endpoint dynamically based on sign-in or sign-up
      const endpoint = isLogin ? "/user/sign-in" : "/user/sign-up";
      const res = await api.post(endpoint, { email, password });
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        err.response.data.errorMessage ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-primary font-bold">
            {isLogin ? "Sign In to your account" : "Create New Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-base"
                />
              </div>

              <Button
                type="submit"
                className="w-full text-base"
                disabled={isLoading}
              >
                {/* dynamincally setting button text based on sign type and loading state */}
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />{" "}
                    {`${isLogin ? "Signing in..." : "Signing up..."}`}
                  </>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>

              <div className="text-center text-muted-foreground">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <a
                  href={isLogin ? "/sign-up" : "/sign-in"}
                  className="text-blue-600 font-medium  hover:text-blue-800"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Button variant="custom" asChild>
        <a href="/" className="flex gap-2 mx-auto">
          <ArrowLeft /> Back to Homepage
        </a>
      </Button>
    </div>
  );
}
