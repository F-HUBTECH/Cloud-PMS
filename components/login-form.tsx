"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/dashboard");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      alert(error.message);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleLogin}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/auth/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={handleGoogleLogin}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24"
            height="24"
          >
            <g>
              <path
                fill="#4285F4"
                d="M24 9.5c3.54 0 6.07 1.53 7.47 2.81l5.54-5.39C33.6 3.61 29.2 1.5 24 1.5 14.82 1.5 6.98 7.73 3.69 16.09l6.44 5.01C11.6 15.13 17.32 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.1 24.55c0-1.64-.15-3.21-.42-4.73H24v9.18h12.42c-.54 2.9-2.18 5.36-4.66 7.02l7.18 5.59C43.98 37.13 46.1 31.3 46.1 24.55z"
              />
              <path
                fill="#FBBC05"
                d="M10.13 28.09a14.5 14.5 0 0 1 0-8.18l-6.44-5.01A23.97 23.97 0 0 0 1.9 24c0 3.77.9 7.34 2.49 10.5l6.44-5.01z"
              />
              <path
                fill="#EA4335"
                d="M24 46.5c6.48 0 11.93-2.15 15.9-5.91l-7.18-5.59c-2 1.36-4.56 2.16-8.72 2.16-6.68 0-12.4-5.63-13.87-13.1l-6.44 5.01C6.98 40.27 14.82 46.5 24 46.5z"
              />
              <path fill="none" d="M1.9 1.5h44.2v44.2H1.9z" />
            </g>
          </svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/auth/sign-up" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
