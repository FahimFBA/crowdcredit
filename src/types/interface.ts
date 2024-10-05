import { HTMLInputTypeAttribute } from "react";
import { IHTMLInputTypeChange } from "./types";

export interface IUserAuth {
  email: string;
  password: string;
}

export interface INavbarOptions {
  id: number;
  label: string;
  path: string;
  icon?: string;
  onClick?: () => void;
}

export interface ILoanPost {
  id: string;
  creator_id: string; // original creator UID
  created_at: string;
  updated_at: string;
  loan_amount: number;
  loan_purpose: string;
  status: string;
  bidders?: ILoanPostBid[];
}

export interface ICrowdFundingPost {
  business_name: string;
  business_description: string;
  created_at: string;
  updated_at?: string;
  current_amount: number;
  target_amount: number;
  images?: string[];
  contributions?: {
    id: number;
    amount: number;
    contributed_at: Date;
    crowd_funding_post_id: number;
    contributor_id?: string;
  }[];
  id: string;
  title: string;
  creator_id: string;
}

export interface IFormWrapperHOCProps {
  id?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  caption?: null | undefined | string | "" | JSX.Element;
}

export interface IDeleteEventModalProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  onConfirm: (id: string) => Promise<void>;
}

export interface iInputFieldProps extends IFormWrapperHOCProps {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value?: string | number;
  onChange: (e: IHTMLInputTypeChange) => void;
  accept?: string;
  className?: string;
}

export interface iTextAreaFieldProps extends IFormWrapperHOCProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows: number;
}

export interface IBaseModalProps {
  state: {
    modalState?: boolean;
    setModalState?: (state: boolean) => void;
  };
  text: {
    dialogueTitle: string;
    dialogueDescription: string;
  };
  className?: string;
  onConfirm: () => Promise<void | null>;
  children: React.ReactNode;
  triggerBtn?: React.ReactNode;
  confirmButtonText: string;
  confirmButtonID?: string;
  status: {
    isLoading: boolean;
    isLoadingText: string;
    isError?: boolean;
    isErrorText?: string;
  };
}

export interface ICrowdFundingContribution {
  crowd_funding_post_id: string;
  contributor_id: string;
  amount: number;
  contributed_at?: Date;
}

export interface ILoanPostBid {
  id?: string;
  bidder_id: string;
  loan_post_id: string;
  amount: number;
  created_at?: string;
}

export interface IProfileData {
  sub: string; // unchangeable // this is the user's UID
  email: string; // unchangeable
  first_name: string;
  last_name: string;
  birth_date: string;
  address: IAddressData;
  profession: IProfessionData;
  university: IUniversityData;
  social_media: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
  };
  phone_number: string;
  profile_picture: string;
  bio: string;
}

export interface IAddressData {
  country: string;
  city: string;
  state: string;
  address: string;
}

export interface IProfessionData {
  job_title: string;
  company: string;
  industry: string;
}

export interface IUniversityData {
  uni_id: string;
  name: string;
  department: string;
  batch: string;
}

export type PersonalDetailsType = Omit<
  IProfileData,
  "profession" | "university" | "address" | "social_media"
>;

export interface IBaseSheetComponent {
  title: string;
  description: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  trigger: React.ReactNode;
  sheetState?: boolean;
  setSheetState?: (state: boolean) => void;
  children: React.ReactNode;
  isLoading: boolean;
  buttonText: string;
}
