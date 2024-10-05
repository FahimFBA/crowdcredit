import { withTemplate } from "../_Templates";
import { Post } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { ILoanPost } from "@/types/interface";
import { loanPostInitialState } from "@/store/InitialStates";
import { useCreateLoanPostMutation, useGetAllLoanPostsQuery } from "@/store";
import { BaseSheetComponent } from "@/components/Sheets/BaseSheetComponent";
import { LoanForm } from "@/components/Form/Prebuilt";

export const Dashboard = withTemplate(({ reduxState }) => {
  const creator_id = reduxState?.user?.uid;
  const [sheetState, setSheetState] = useState(false);

  const { data: allLoanPostData, isLoading } = useGetAllLoanPostsQuery();

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
        <BaseSheetComponent
          title="Create Loan Project"
          description="Please fill in the details to create a new loan project"
          sheetState={sheetState}
          setSheetState={setSheetState}
          trigger={
            <Button variant="outline" className="mb-4" size="sm">
              Create Loan Request Post
            </Button>
          }
          buttonText="Create"
          handleSubmit={handleSubmit}
          isLoading={isCreatingLoanPost}
        >
          <div className="my-4 flex flex-col gap-3">
            <LoanForm data={loanPostData} handleChange={handleChange} />
          </div>
        </BaseSheetComponent>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {allLoanPostData?.map((item) => <Post key={item?.id} {...item} />)}
      </div>
    </div>
  );
});
