import {
  AddressDetails,
  PersonalDetails,
  ProfessionCard,
  UniversityDetails,
} from "@/components/Cards/ProfileCards";
import { withTemplate } from "../_Templates";
import {
  IAddressData,
  IProfessionData,
  IProfileData,
  IUniversityData,
} from "@/types/interface";
import {
  useGetUserProfileDetailsQuery,
  useUpdateUserProfileDetailsMutation,
} from "@/store";
import { LoadingUI } from "@/components/Skeleton";

export const Profile = withTemplate(() => {
  const { data, isError, isFetching, isLoading } =
    useGetUserProfileDetailsQuery();

  const [updateUserProfileDetails, { isLoading: isUpdating }] =
    useUpdateUserProfileDetailsMutation();

  const handleUpdateProfile = async (data: IProfileData) => {
    await updateUserProfileDetails({
      data,
    });
  };

  const handleUpdateUniversity = async (universityData: IUniversityData) => {
    await updateUserProfileDetails({
      data: {
        ...(data as IProfileData),
        university: universityData,
      },
    });
  };

  const handleUpdateAddress = async (addressData: IAddressData) => {
    await updateUserProfileDetails({
      data: {
        ...(data as IProfileData),
        address: addressData,
      },
    });
  };

  const handleUpdateProfession = async (addressData: IProfessionData) => {
    await updateUserProfileDetails({
      data: {
        ...(data as IProfileData),
        profession: addressData,
      },
    });
  };

  if (isLoading || isFetching) {
    return <LoadingUI />;
  }
  if (isError) {
    return <div>error</div>;
  }

  const university = data?.university as IUniversityData;
  const personalDetails = data as IProfileData;
  const userAddress = data?.address as IAddressData;
  const professionData = data?.profession as IProfessionData;

  return (
    <div className="grid grid-cols-2 gap-3">
      <PersonalDetails
        title="Personal Details"
        data={personalDetails}
        handleUpdate={handleUpdateProfile}
        isLoading={isUpdating}
      />
      <UniversityDetails
        title="University Details"
        data={university}
        handleUpdate={handleUpdateUniversity}
        isLoading={isUpdating}
      />
      <AddressDetails
        title="Address"
        data={userAddress}
        handleUpdate={handleUpdateAddress}
        isLoading={isUpdating}
      />
      <ProfessionCard
        title="Profession"
        data={professionData}
        handleUpdate={handleUpdateProfession}
        isLoading={isUpdating}
      />
    </div>
  );
});
