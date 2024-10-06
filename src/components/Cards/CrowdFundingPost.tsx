import { useState } from "react";
import { textLimiter } from "../Text";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { BaseModal } from "../Modal/BaseModal";
import { Button } from "../ui";
import { InputField } from "../Form/InputField";
import { DeleteModal } from "../Modal";
import { useAppSelector, useUpdateCrowdFundingProjectMutation } from "@/store";
import { ICrowdFundingContribution } from "@/types/interface";
import { Link } from "react-router-dom";
import { LucidePencil, LucideTrash2 } from "lucide-react";
import { CrowdFundingSheet } from "../Sheets";
import { toast } from "sonner";

interface IPost {
  id: string;
  creator_id: string; // original post creator
  title: string;
  businessDetails?: {
    businessName: string;
    businessDescription: string;
  };
  target?: {
    targetAmount: number;
    currentAmount: number;
    totalContributors: number;
  };
  actions: {
    deletePost?: {
      deletePostIsLoading: boolean;
      deletePostFn: () => void;
    };
    contribute?: {
      contributeIsLoading: boolean;
      contributeFn: (
        data: ICrowdFundingContribution,
      ) => Promise<string | number>;
    };
  };
}

export const CrowdFundingPost = ({
  id,
  title,
  actions,
  creator_id,
  businessDetails,
  target,
}: IPost) => {
  const { currentAmount, targetAmount, totalContributors } = target || {};
  const { businessDescription, businessName } = businessDetails || {};

  const { contribute, deletePost } = actions || {};
  const {
    deletePostFn,
    // deletePostIsLoading
  } = deletePost || {};
  const { contributeFn, contributeIsLoading } = contribute || {};
  const userUID = useAppSelector((state) => state?.user?.uid);

  const [contributeData, setContributeData] = useState({
    modal: false,
    amount: 0,
  });

  const handleContributionFn = async () => {
    contributeFn?.({
      crowd_funding_post_id: id,
      contributor_id: userUID,
      amount: contributeData.amount,
    });
    setContributeData({ amount: 0, modal: false });
  };

  const [
    updateCrowdFundingProject,
    { isLoading: isUpdatingCrowdFundingProject },
  ] = useUpdateCrowdFundingProjectMutation();

  const [editData, setEditData] = useState({
    title,
    business_description: businessDescription,
    business_name: businessName,
    target_amount: targetAmount,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditData({ ...editData, [e.target.id]: e.target.value });

  const [sheetState, setSheetState] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(
      updateCrowdFundingProject({ ...editData, id })
        .unwrap()
        .then(() => setSheetState(false)),
      {
        loading: "Loading, please wait...",
        success: "Project updated successfully",
        error: "An error occurred while updating project",
      },
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-0">
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription>{businessName}</CardDescription>
      </CardHeader>
      {businessDescription && (
        <CardContent className="h-[65px]">
          {textLimiter(businessDescription, 60)}
        </CardContent>
      )}
      <CardFooter className="flex flex-col items-end gap-3">
        <div className="w-full flex flex-col gap-1.5">
          <div className="text-center text-muted-foreground font-semibold">
            ৳{currentAmount} / ৳{targetAmount}
          </div>
          <Progress value={(currentAmount! / targetAmount!) * 100} />
          <p className="text-muted-foreground text-center text-sm">
            Total Contributions: {totalContributors}
          </p>
        </div>
        <div className="flex gap-2">
          {userUID !== creator_id ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                setContributeData({ ...contributeData, modal: true })
              }
            >
              Contribute
            </Button>
          ) : (
            <Link to={`/crowdfunding/${id}`}>
              <Button variant="secondary" size="sm">
                View Stats
              </Button>
            </Link>
          )}
          {userUID === creator_id && (
            <CrowdFundingSheet
              title="Update Crowd Funding Project"
              description="Edit your data then click the button below to update your project"
              sheetState={sheetState}
              setSheetState={setSheetState}
              data={editData}
              handleChange={handleChange}
              handleSubmit={handleUpdate}
              isLoading={isUpdatingCrowdFundingProject}
              trigger={
                <Button variant="secondary" size="sm">
                  <LucidePencil className="w-4 h-4" />
                </Button>
              }
              buttonText="Update Project"
            />
          )}
          {userUID === creator_id && deletePost && (
            <DeleteModal
              icon={
                <Button variant="destructive" size="sm">
                  <LucideTrash2 className="w-4 h-4" />
                </Button>
              }
              title="Delete Post"
              onConfirm={async () => deletePostFn?.()}
              description="Are you sure you want to delete this post?"
            />
          )}
        </div>
      </CardFooter>

      <BaseModal
        text={{
          dialogueTitle: textLimiter(title, 34) as string,
          dialogueDescription: businessDescription as string,
        }}
        state={{
          modalState: contributeData.modal,
          setModalState: (state: boolean) =>
            setContributeData({ ...contributeData, modal: state }),
        }}
        confirmButtonText="Contribute"
        onConfirm={handleContributionFn}
        status={{
          isLoading: contributeIsLoading!,
          isLoadingText: "Loading, please wait...",
        }}
      >
        <InputField
          id="amount"
          type="number"
          label="amount"
          onChange={(e) =>
            setContributeData({ ...contributeData, amount: +e.target.value })
          }
          placeholder="Enter amount"
          value={contributeData.amount}
          required
        />
      </BaseModal>
    </Card>
  );
};
