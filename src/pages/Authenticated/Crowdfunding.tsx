import { withTemplate } from "../_Templates";
import { CrowdFundingPost } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import {
  useGetAllCrowdFundingProjectsQuery,
  useCreateCrowdFundingProjectMutation,
  useDeleteCrowdFundingProjectMutation,
  useContributeToCrowdFundingProjectMutation,
} from "@/store";
import { useState } from "react";
import {
  ICrowdFundingContribution,
  ICrowdFundingPost,
} from "@/types/interface";
import { crowdFundingInitialState } from "@/store/InitialStates";
import { toast } from "sonner";
import { CrowdFundingSheet } from "@/components/Sheets";

export const Crowdfunding = withTemplate(({ reduxState }) => {
  const user_id = reduxState?.user?.uid as string;
  const { data, isLoading } = useGetAllCrowdFundingProjectsQuery();
  const [crowdFundingData, setCrowdFundingData] = useState<
    Partial<ICrowdFundingPost>
  >({
    ...crowdFundingInitialState,
    creator_id: user_id!,
  });

  const [
    createCrowdFundingProject,
    { isLoading: isCreatingCrowdFundingProject },
  ] = useCreateCrowdFundingProjectMutation();

  const [
    deleteCrowdFundingProject,
    { isLoading: isDeletingCrowdFundingProject },
  ] = useDeleteCrowdFundingProjectMutation();

  const [
    contributeToCrowdFundingProject,
    { isLoading: isContributingToCrowdFundingProject },
  ] = useContributeToCrowdFundingProjectMutation();

  const [sheetState, setSheetState] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCrowdFundingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      createCrowdFundingProject(crowdFundingData)
        .unwrap()
        .then(() => {
          setSheetState(false);
          setCrowdFundingData({
            ...crowdFundingInitialState,
            creator_id: user_id!,
          });
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

  const handlePostDelete = ({
    id,
    creator_id,
  }: {
    id: string;
    creator_id: string;
  }) => {
    toast.promise(deleteCrowdFundingProject({ id, creator_id }).unwrap(), {
      loading: "Deleting Project...",
      success: () => {
        return `Project deleted successfully`;
      },
      error: () => {
        return `Failed to delete project`;
      },
    });
  };

  const handleContribute = async (data: ICrowdFundingContribution) =>
    toast.promise(contributeToCrowdFundingProject(data).unwrap(), {
      loading: "Contributing to Project...",
      success: () => {
        return `Contributed successfully`;
      },
      error: () => {
        return `Failed to contribute`;
      },
    });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mb-10">
      <div className="flex flex-col items-center">
        <h1 className="text-xl mb-4 font-bold capitalize">Crowdfunding</h1>
        <CrowdFundingSheet
          title="Create Crowd Funding Project"
          description="Please fill in the details to create a new crowd funding project"
          sheetState={sheetState}
          setSheetState={setSheetState}
          data={crowdFundingData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isCreatingCrowdFundingProject}
          trigger={
            <Button variant="outline" className="mb-4">
              Create A New Crowdfunding Project
            </Button>
          }
          buttonText="Create Project"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {data?.map((item) => {
          const {
            business_description,
            business_name,
            contributions,
            // created_at,
            id,
            // images,
            target_amount,
            title,
            creator_id,
            // updated_at,
          } = item || {};
          return (
            <CrowdFundingPost
              key={id}
              id={id}
              creator_id={creator_id}
              title={title}
              businessDetails={{
                businessName: business_name,
                businessDescription: business_description,
              }}
              target={{
                targetAmount: target_amount,
                currentAmount:
                  contributions
                    ?.map((item) => item.amount)
                    .reduce((a, b) => a + b, 0) ?? 0,
                totalContributors: contributions?.length ?? 0,
              }}
              actions={{
                deletePost: {
                  deletePostIsLoading: isDeletingCrowdFundingProject,
                  deletePostFn: () => handlePostDelete({ id, creator_id }),
                },
                contribute: {
                  contributeIsLoading: isContributingToCrowdFundingProject,
                  contributeFn: handleContribute,
                },
              }}
            />
          );
        })}
      </div>
    </div>
  );
});
