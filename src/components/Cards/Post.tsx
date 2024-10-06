import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { textLimiter } from "../Text";
import { BaseSheetComponent } from "../Sheets/BaseSheetComponent";
import { useState } from "react";
import { ILoanPost, ILoanPostBid } from "@/types/interface";
import { LoanForm } from "../Form/Prebuilt";
import {
  RootState,
  useBidOneLoanPostMutation,
  useDeleteLoanPostMutation,
  useUpdateLoanPostMutation,
} from "@/store";
import { LucidePencil, LucideTrash } from "lucide-react";
import { useAppSelector } from "@/store";
import { DeleteModal } from "../Modal";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { InputField } from "../Form/InputField";
import { BaseModal } from "../Modal/BaseModal";

export const Post = (data: ILoanPost) => {
  const navigate = useNavigate();
  const userId = useAppSelector((state: RootState) => state.user?.uid);
  const [sheetState, setSheetState] = useState<boolean>(false);
  const [loanPostData, setLoanPostData] = useState<Partial<ILoanPost>>(data);
  const {
    creator_id,
    id,
    loan_amount,
    loan_purpose,
    // status,
    // created_at,
    // updated_at,
  } = data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoanPostData((prev) => ({ ...prev, [name]: value }));
  };

  const [handleSubmit, { isLoading: isCreatingLoanPost }] =
    useUpdateLoanPostMutation();

  const handlePostUpdate = async () => {
    await handleSubmit(loanPostData).then(() => setSheetState(false));
  };

  const isAuthor = creator_id === userId;

  const [handleDelete] = useDeleteLoanPostMutation();

  const deletePostFn = async () => {
    toast.promise(
      handleDelete({ id: data.id!, creator_id: data.creator_id! }).unwrap(),
      {
        loading: "Deleting...",
        success: "Post deleted successfully",
        error: "An error occured while deleting post",
      },
    );
  };

  const [loanBidData, setLoanBidData] = useState<Partial<ILoanPostBid>>({
    loan_post_id: data.id!,
    bidder_id: userId!,
    amount: 0,
  });

  const [handleBid, { isLoading: isBidding }] = useBidOneLoanPostMutation();
  const [bidModal, setBidModal] = useState(false);

  const handleBidPostFn = async () => {
    toast.promise(
      handleBid(loanBidData)
        .unwrap()
        .then(() => setBidModal(false)),
      {
        loading: "Bidding...",
        success: "Bid placed successfully",
        error: "An error occured while placing bid",
      },
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-0">
        <CardTitle className="capitalize">{loan_purpose}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <div className="font-semibold">৳ {loan_amount}</div>
        <div className="flex gap-2">
          {!isAuthor && (
            <Button size="sm" onClick={() => setBidModal(true)}>
              Bid
            </Button>
          )}
          {isAuthor && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/dashboard/` + id)}
              >
                Stats
              </Button>
              <BaseSheetComponent
                title="Update Loan Project"
                description="Please update the details of your loan project, then click on update to save changes"
                sheetState={sheetState}
                setSheetState={setSheetState}
                trigger={
                  <Button size="sm" variant="secondary">
                    <LucidePencil className="w-3 h-3" />
                  </Button>
                }
                buttonText="Update"
                handleSubmit={handlePostUpdate}
                isLoading={isCreatingLoanPost}
              >
                <div className="my-4 flex flex-col gap-3">
                  <LoanForm data={loanPostData} handleChange={handleChange} />
                </div>
              </BaseSheetComponent>
              <DeleteModal
                icon={
                  <Button size="sm" variant="destructive">
                    <LucideTrash className="w-3 h-3" />
                  </Button>
                }
                title="Delete Post"
                onConfirm={async () => deletePostFn?.()}
                description="Are you sure you want to delete this post?"
              />
            </>
          )}
        </div>
      </CardFooter>

      <BaseModal
        text={{
          dialogueTitle: textLimiter(loan_purpose, 34) as string,
          dialogueDescription: "",
        }}
        state={{
          modalState: bidModal,
          setModalState: (state: boolean) => setBidModal(state),
        }}
        confirmButtonText="Place Your Bid For This Loan Request Post"
        onConfirm={handleBidPostFn}
        status={{
          isLoading: isBidding!,
          isLoadingText: "Loading, please wait...",
        }}
      >
        <InputField
          id="amount"
          type="number"
          label="Your Proposed Interest Rate"
          onChange={(e) =>
            setLoanBidData({ ...loanBidData, amount: +e.target.value })
          }
          placeholder="Enter Amount"
          value={loanBidData.amount}
          required
        />
      </BaseModal>
    </Card>
  );
};
