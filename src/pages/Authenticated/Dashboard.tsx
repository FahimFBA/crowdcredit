import { InputField } from "@/components/Form/InputField";
import { withTemplate } from "../_Templates";
import { Post } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useState } from "react";
import { toast } from "sonner";
import { ILoanPost } from "@/types/interface";
import { loanPostInitialState } from "@/store/InitialStates";
import { useCreateLoanPostMutation, useGetAllLoanPostsQuery } from "@/store";

export const Dashboard = withTemplate(({ reduxState }) => {
  const creator_id = reduxState?.user?.uid;

  const [sheetState, setSheetState] = useState(false);

  const { data: allLoanPostData, isLoading } = useGetAllLoanPostsQuery();

  console.log("allLoanPostData", allLoanPostData);

  const [loanPostData, setLoanPostData] = useState<Partial<ILoanPost>>({
    ...loanPostInitialState,
    creator_id: creator_id!,
  });

  const [createLoanPost, { isLoading: isCreatingLoanPost }] =
    useCreateLoanPostMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      createLoanPost(loanPostData)
        .unwrap()
        .then(() => {
          setSheetState(false);
          setLoanPostData({ ...loanPostInitialState, creator_id: creator_id! });
        }),
      {
        loading: "Creating Project...",
        success: () => {
          return `Project created successfully`;
        },
        error: () => {
          return `Failed to create project`;
        },
      },
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoanPostData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-xl mb-4 font-bold capitalize">
          Loan Disbursements
        </h1>
        <Sheet open={sheetState} onOpenChange={setSheetState}>
          <SheetTrigger>
            <Button variant="outline" className="mb-4" size="sm">
              Create Loan Request
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create Crowd Funding Project</SheetTitle>
              <SheetDescription>
                Please fill in the details to create a new crowd funding project
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit}>
              <div className="my-4 flex flex-col gap-3">
                <InputField
                  id="loan_purpose"
                  placeholder="Write a purpose for the loan"
                  type="text"
                  label="Loan Purpose"
                  value={loanPostData?.loan_purpose}
                  onChange={handleChange}
                  required
                />
                <InputField
                  id="loan_amount"
                  placeholder="Amount to be loaned"
                  type="number"
                  label="Loan Amount"
                  value={loanPostData?.loan_amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <SheetFooter>
                <SheetClose>
                  <Button variant="link" size="sm" type="button">
                    cancel
                  </Button>
                </SheetClose>
                {isCreatingLoanPost ? (
                  <Button variant="secondary" disabled size="sm" type="submit">
                    Creating....
                  </Button>
                ) : (
                  <Button variant="default" size="sm" type="submit">
                    Create
                  </Button>
                )}
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {allLoanPostData?.map((item) => (
          <Post
            title="Loan Request"
            key={item?.id}
            creator_id={item?.creator_id}
            personalLoan={{
              amount: item?.loan_amount,
              isPersonalLoan: true,
              loanPurpose: item?.loan_purpose,
            }}
            actions={{}}
          />
        ))}
      </div>
    </div>
  );
});
