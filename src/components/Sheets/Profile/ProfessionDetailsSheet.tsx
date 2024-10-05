import { InputField } from "@/components/Form/InputField";
import { IBaseSheetComponent, IProfessionData } from "@/types/interface";
import { BaseSheetComponent } from "../BaseSheetComponent";

export const ProfessionDetailsSheet = ({
  buttonText,
  data,
  description,
  handleChange,
  handleSubmit,
  isLoading,
  title,
  trigger,
  setSheetState,
  sheetState,
}: Omit<IBaseSheetComponent, "children"> & {
  data: IProfessionData;
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
          id="job_title"
          placeholder="Job Title"
          type="text"
          label="Job Title"
          value={data?.job_title}
          onChange={handleChange}
        />
        <InputField
          id="industry"
          placeholder="Industry"
          type="text"
          label="Industry"
          value={data?.industry}
          onChange={handleChange}
        />
        <InputField
          id="company"
          placeholder="Company"
          type="text"
          label="Company"
          value={data?.company}
          onChange={handleChange}
        />
      </div>
    </BaseSheetComponent>
  );
};
