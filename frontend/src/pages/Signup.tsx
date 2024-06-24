import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoundSpinner } from "@/components/ui/spinner";
import useSignup from "@/hooks/useSignup";
import { SignupInputsType } from "@/types";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [signupInputs, setSignupInputs] = useState<SignupInputsType>({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignup();

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                name="fullName"
                value={signupInputs.fullName}
                onChange={(e) =>
                  setSignupInputs({ ...signupInputs, fullName: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                name="username"
                value={signupInputs.username}
                onChange={(e) =>
                  setSignupInputs({ ...signupInputs, username: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={signupInputs.password}
                onChange={(e) =>
                  setSignupInputs({ ...signupInputs, password: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={signupInputs.confirmPassword}
                onChange={(e) =>
                  setSignupInputs({
                    ...signupInputs,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              onClick={() => signup(signupInputs)}
            >
              {loading ? <RoundSpinner /> : "Create an account"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
