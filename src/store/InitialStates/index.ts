import {
  ICrowdFundingPost,
  ILoanPost,
  IProfileData,
  IUserAuth,
} from "@/types/interface";

export const emailAuthInitialState: IUserAuth = {
  email: "",
  password: "",
};

export const crowdFundingInitialState: Partial<ICrowdFundingPost> = {
  // id: "",
  title: "",
  business_name: "",
  business_description: "",
  // created_at: "",
  // updated_at: "",
  // images: [],
  target_amount: 0,
  creator_id: "",
};

export const loanPostInitialState: Partial<ILoanPost> = {
  // id: "",
  creator_id: "",
  loan_amount: 0,
  loan_purpose: "",
  status: "",
  // created_at: "",
  // updated_at: "",
};

export const profileCreationInitialState: Omit<IProfileData, "sub" | "email"> =
  {
    first_name: "",
    last_name: "",
    birth_date: "",
    address: {
      country: "",
      city: "",
      state: "",
      address: "",
    },
    profession: {
      job_title: "",
      company: "",
      industry: "",
    },
    social_media: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
    phone_number: "",
    profile_picture: "",
    bio: "",
    university: {
      batch: "",
      department: "",
      name: "",
      uni_id: "",
    },
  };
