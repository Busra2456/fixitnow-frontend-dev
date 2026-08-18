"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { loginAction } from "../_actions/authActions";
import Link from "next/link";

const initialState = {
  success: false,
  message: "",
};

const LoginForm = () => {
  const [state, action, pending] = useActionState(
    loginAction,
    initialState
  );

  useEffect(() => {
    if (!state?.message) return;

    if (state.success) {
      toast.success(state.message || "Login successful!");
    } else {
      toast.error(state.message || "Login failed!");
    }
  }, [state]);

  return (
    <Card className="w-full max-w-md border-border bg-background p-6 shadow-lg sm:p-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-3 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
  <Image
            src="/Wrench.svg"
            alt="FixItNow"
            width={400}
            height={400}
            priority          
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Login to your FixItNow account
        </p>
      </div>

      {/* Login Form */}
      <form action={action} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            disabled={pending}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

        
          </div>

          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            disabled={pending}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
          disabled={pending}
        >
          {pending ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* Register */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Don not have an account?{"/register"}
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </div>
    </Card>
  );
};

export default LoginForm;