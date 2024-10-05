import { ILoanPost } from "@/types/interface";
import { InputField } from "../InputField";

export const LoanForm = ({
  data,
  handleChange,
}: {
  data: Partial<ILoanPost>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <InputField
        id="loan_purpose"
        placeholder="Write a purpose for the loan"
        type="text"
        label="Loan Purpose"
        value={data?.loan_purpose}
        onChange={handleChange}
        required
      />
      <InputField
        id="loan_amount"
        placeholder="Amount to be loaned"
        type="number"
        label="Loan Amount"
        value={data?.loan_amount}
        onChange={handleChange}
        required
      />
    </>
  );
};
