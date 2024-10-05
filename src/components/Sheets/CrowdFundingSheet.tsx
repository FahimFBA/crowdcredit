import { InputField } from "../Form/InputField";
import { IBaseSheetComponent, ICrowdFundingPost } from "@/types/interface";
import { BaseSheetComponent } from "./BaseSheetComponent";

export const CrowdFundingSheet = ({
  title,
  description,
  handleChange,
  data,
  trigger,
  handleSubmit,
  isLoading,
  setSheetState,
  sheetState,
  buttonText,
}: Omit<IBaseSheetComponent, "children"> & {
  data: Partial<ICrowdFundingPost>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <BaseSheetComponent
      title={title}
      description={description}
      trigger={trigger}
      buttonText={buttonText}
      handleSubmit={handleSubmit}
      isLoading={isLoading as boolean}
      sheetState={sheetState}
      setSheetState={setSheetState}
    >
      <div className="my-4 flex flex-col gap-3">
        <InputField
          id="title"
          placeholder="Write a title for your crowd funding project"
          type="text"
          label="Crowd Funding Title"
          value={data?.title}
          onChange={handleChange}
          required
        />
        <InputField
          id="business_name"
          placeholder="Write business name"
          type="text"
          label="Business Name"
          value={data?.business_name}
          onChange={handleChange}
          required
        />
        <InputField
          id="business_description"
          placeholder="Write business description"
          type="text"
          label="Business Description"
          value={data?.business_description}
          onChange={handleChange}
          required
        />
        <InputField
          id="target_amount"
          placeholder="Write target amount"
          type="number"
          label="Target Amount"
          value={data?.target_amount}
          onChange={handleChange}
          required
        />
      </div>
    </BaseSheetComponent>
  );
};
