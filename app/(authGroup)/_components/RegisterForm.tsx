"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/authActions";
import Link from "next/link";
import Image from "next/image";

const initialState = {
  success: false,
  message: "",
};

const RegisterForm = () => {
  const [state, action, pending] = useActionState(
    registerAction,
    initialState
  );

  useEffect(() => {
    if (!state?.message) return;

    if (state.success) {
      toast.success(
        state.message || "Registration successful!"
      );
    } else {
      toast.error(
        state.message || "Registration failed!"
      );
    }
  }, [state]);

  return (
    <Card className="w-full border-border bg-background p-6 shadow-lg sm:p-8">
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
            />          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight">
          Create Your Account
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Join FixItNow and get started today
        </p>
      </div>

      {/* Form */}
      <form action={action} className="space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">
            Full Name
          </Label>

          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            required
            disabled={pending}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address
          </Label>

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
          <Label htmlFor="password">
            Password
          </Label>

          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            required
            disabled={pending}
          />
        </div>

        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="role">
            Account Type
          </Label>

          <Select
            name="role"
            defaultValue="CUSTOMER"
            disabled={pending}
          >
            <SelectTrigger id="role" className="w-full">
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="CUSTOMER">
                Customer
              </SelectItem>

              <SelectItem value="TECHNICIAN">
                Technician
              </SelectItem>
            </SelectContent>
          </Select>

          <p className="text-xs text-muted-foreground">
            Customer can book home services. Technician can
            provide home services.
          </p>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
          disabled={pending}
        >
          {pending
            ? "Creating Account..."
            : "Create Account"}
        </Button>
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{"/login"}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Login
        </Link>
      </div>
    </Card>
  );
};

export default RegisterForm;