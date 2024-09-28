import { ICrowdFundingPost, ILoanPost, IUserAuth } from "@/types/interface";

export const emailAuthInitialState: IUserAuth = {
  email: "",
  password: "",
};

export const crowdFundingInitialState: Partial<ICrowdFundingPost> = {
  // id: "",
  title: "",
  business_name: "",
  business_description: "",
  contributors_list: [],
  // created_at: "",
  // updated_at: "",
  current_amount: 0,
  images: [],
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
