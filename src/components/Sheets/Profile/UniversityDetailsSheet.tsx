import { InputField } from "@/components/Form/InputField";
import { IBaseSheetComponent, IUniversityData } from "@/types/interface";
import { BaseSheetComponent } from "../BaseSheetComponent";

export const UniversityDetailsSheet = ({
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
  data: IUniversityData;
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
          id="name"
          placeholder="University Name"
          type="text"
          label="University Name"
          value={data?.name}
          onChange={handleChange}
        />
        <InputField
          id="batch"
          placeholder="Batch Year"
          type="text"
          label="Batch"
          value={data?.batch}
          onChange={handleChange}
        />
        <InputField
          id="department"
          placeholder="Department"
          type="text"
          label="Department"
          value={data?.department}
          onChange={handleChange}
        />
        <InputField
          id="uni_id"
          placeholder="Write your university ID"
          type="text"
          label="University ID"
          value={data?.uni_id}
          onChange={handleChange}
        />
      </div>
    </BaseSheetComponent>
  );
};
