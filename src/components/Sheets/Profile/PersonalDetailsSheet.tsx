import { InputField } from "@/components/Form/InputField";
import { IBaseSheetComponent, IProfileData } from "@/types/interface";
import { BaseSheetComponent } from "../BaseSheetComponent";

export const PersonalDetailsSheet = ({
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
  data: Partial<IProfileData>;
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
          id="first_name"
          placeholder="Write your first name"
          type="text"
          label="First Name"
          value={data?.first_name}
          onChange={handleChange}
        />
        <InputField
          id="last_name"
          placeholder="Write your last name"
          type="text"
          label="Last Name"
          value={data?.last_name}
          onChange={handleChange}
        />
        <InputField
          id="phone_number"
          placeholder="Write your phone number"
          type="text"
          label="Phone Number"
          value={data?.phone_number}
          onChange={handleChange}
        />
        <InputField
          id="birth_date"
          placeholder="Write your birth date"
          type="date"
          label="Birth Date"
          value={data?.birth_date}
          onChange={handleChange}
        />
      </div>
    </BaseSheetComponent>
  );
};
