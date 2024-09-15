import { Link } from "react-router-dom";

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
import { useRemainingHeight } from "@/_Hooks";
import { useState } from "react";
import { IUserAuth } from "@/types/interface";
import { emailAuthInitialState } from "@/store/InitialStates";
import { useEmailLoginMutation } from "@/store";
import { Loader2 } from "lucide-react";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export const Login = () => {
  const remainingHeight = useRemainingHeight([
    {
      id: "HEADER__NAVBAR__ID",
    },
  ]);

  const [data, setData] = useState<IUserAuth>(emailAuthInitialState);
  const [emailLogin, { isLoading }] = useEmailLoginMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });

  const signupAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await emailLogin(data);
  };

  return (
    <div
      className="flex h-screen justify-center items-center"
      style={{
        height: remainingHeight,
      }}
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={signupAccount} className="grid gap-1">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={data.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="******"
                required
                value={data.password}
                onChange={handleInputChange}
              />
            </div>
            {isLoading ? (
              <Button
                size="sm"
                variant="secondary"
                className="flex gap-1"
                disabled
              >
                <Loader2 className="h-[18px] w-[18px] animate-spin text-primary" />
                Loading.....
              </Button>
            ) : (
              <Button size="sm" type="submit" className="w-full">
                Login
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              type="button"
              // disabled
            >
              Login with Google(disabled)
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
