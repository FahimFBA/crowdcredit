import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Progress } from "../ui/progress";
import { textLimiter } from "../Text";
import { useAppSelector } from "@/store";

interface IPost {
  creator_id: string; // original post creator
  title: string;
  businessDetails?: {
    businessName: string;
    businessDescription: string;
  };
  personalLoan?: {
    isPersonalLoan: boolean;
    amount: number;
    loanPurpose: string;
  };
  crowdFunding?: {
    isCrowdFunding: boolean;
    targetAmount: number;
    currentAmount: number;
    totalContributors: number;
  };
}

export const Post = ({
  title,
  businessDetails,
  personalLoan,
  crowdFunding,
  creator_id,
}: IPost) => {
  const { isCrowdFunding, currentAmount, targetAmount, totalContributors } =
    crowdFunding || {};
  const {
    businessDescription,
    // businessName
  } = businessDetails || {};
  const {
    amount = 0,
    //  isPersonalLoan,
    loanPurpose,
  } = personalLoan || {};

  const userUID = useAppSelector((state) => state?.user?.uid);
  const [progress] = useState((currentAmount! / targetAmount!) * 100);

  if (isCrowdFunding) {
    return (
      <Card>
        <CardHeader className="flex flex-col gap-0">
          <CardTitle className="capitalize">{title}</CardTitle>
          <CardDescription>
            Total Contributors: {totalContributors}
          </CardDescription>
        </CardHeader>
        {businessDescription && (
          <CardContent className="h-[65px]">
            {textLimiter(businessDescription, 60)}
          </CardContent>
        )}
        <CardFooter className="flex flex-col items-end gap-3">
          <div className="w-full flex flex-col gap-1.5">
            <div className="text-center text-muted-foreground font-semibold">
              ${currentAmount} / ${targetAmount}
            </div>
            <Progress value={progress} />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              Contribute
            </Button>
            {userUID === creator_id && (
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-0">
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription>Total Bids: 3</CardDescription>
      </CardHeader>
      <CardContent className="h-[65px]">
        {textLimiter(loanPurpose!, 60)}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="font-semibold">$ {amount}</div>
        <Button variant="secondary" size="sm">
          Bid
        </Button>
      </CardFooter>
    </Card>
  );
};
