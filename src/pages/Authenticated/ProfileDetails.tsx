import { useParams } from "react-router-dom";
import { withTemplate } from "../_Templates";
import { useGetOneProfileDataQuery } from "@/store";
import { LoadingUI } from "@/components/Skeleton";
import {
  AddressDetails,
  PersonalDetails,
  ProfessionCard,
  UniversityDetails,
} from "@/components/Cards/ProfileCards";
import {
  IAddressData,
  IProfessionData,
  IProfileData,
  IUniversityData,
} from "@/types/interface";

export const ProfileDetails = withTemplate(() => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, isFetching } = useGetOneProfileDataQuery(
    id!,
  );

  if (isLoading || isFetching) {
    return <LoadingUI />;
  }

  if (isError) {
    return (
      <div className="text-center text-xl mb-5 mt-6">
        Error: User not found.
      </div>
    );
  }

  const isUpdating = false;

  const university = data?.university as IUniversityData;
  const personalDetails = data as IProfileData;
  const userAddress = data?.address as IAddressData;
  const professionData = data?.profession as IProfessionData;

  return (
    <div className="grid grid-cols-2 gap-3">
      <PersonalDetails
        title="Personal Details"
        data={personalDetails}
        isLoading={isUpdating}
      />
      <UniversityDetails
        title="University Details"
        data={university}
        isLoading={isUpdating}
      />
      <AddressDetails
        title="Address"
        data={userAddress}
        isLoading={isUpdating}
      />
      <ProfessionCard
        title="Profession"
        data={professionData}
        isLoading={isUpdating}
      />
    </div>
  );
});
