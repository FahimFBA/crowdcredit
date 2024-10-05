import { InputField } from "@/components/Form/InputField";
import { IAddressData, IBaseSheetComponent } from "@/types/interface";
import { BaseSheetComponent } from "../BaseSheetComponent";

export const AddressDetailsSheet = ({
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
  data: IAddressData;
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
          id="address"
          placeholder="Write your address"
          type="text"
          label="Address"
          value={data?.address}
          onChange={handleChange}
        />
        <InputField
          id="city"
          placeholder="Write your city"
          type="text"
          label="City"
          value={data?.city}
          onChange={handleChange}
        />
        <InputField
          id="state"
          placeholder="Write your state"
          type="text"
          label="State"
          value={data?.state}
          onChange={handleChange}
        />
        <InputField
          id="country"
          placeholder="Write your Country"
          type="text"
          label="Country"
          value={data?.country}
          onChange={handleChange}
        />
      </div>
    </BaseSheetComponent>
  );
};
