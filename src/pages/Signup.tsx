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
import { useState } from "react";
import { emailAuthInitialState } from "@/store/InitialStates";
import { IUserAuth } from "@/types/interface";
import { useEmailSignupMutation } from "@/store";
import { Loader2 } from "lucide-react";
import { useRemainingHeight } from "@/_Hooks";

export const description = "Description here";

export const Signup = () => {
  const remainingHeight = useRemainingHeight([
    {
      id: "HEADER__NAVBAR__ID",
    },
  ]);

  const [data, setData] = useState<IUserAuth>(emailAuthInitialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });

  const [emailSignup, { isLoading }] = useEmailSignupMutation();

  const signupAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await emailSignup(data);
  };

  return (
    <div
      className="flex  justify-center items-center"
      style={{
        height: remainingHeight,
      }}
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
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
                Signup
              </Button>
            )}
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
