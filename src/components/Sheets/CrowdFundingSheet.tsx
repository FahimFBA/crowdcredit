import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui";
import { InputField } from "../Form/InputField";
import { ICrowdFundingSheet } from "@/types/interface";

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
}: ICrowdFundingSheet) => {
  return (
    <Sheet open={sheetState} onOpenChange={setSheetState}>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
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
          <SheetFooter>
            <SheetClose>
              <Button variant="link" size="sm" type="button">
                cancel
              </Button>
            </SheetClose>
            {isLoading ? (
              <Button variant="secondary" disabled size="sm" type="submit">
                Creating....
              </Button>
            ) : (
              <Button variant="default" size="sm" type="submit">
                {buttonText}
              </Button>
            )}
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
