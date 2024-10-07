import { AddressDetailsSheet } from "@/components/Sheets";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IAddressData } from "@/types/interface";
import { LucidePencil } from "lucide-react";
import { useState } from "react";

export const AddressDetails = ({
  title,
  data,
  handleUpdate,
  isLoading,
}: {
  title: string;
  data: IAddressData;
  handleUpdate?: (data: IAddressData) => Promise<void>;
  isLoading: boolean;
}) => {
  const [state, setState] = useState<IAddressData>(data);
  const [sheetState, setSheetState] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-0">
        <CardTitle className="capitalize">{title}</CardTitle>
        {handleUpdate && (
          <AddressDetailsSheet
            title="Address Details"
            description="Update your address details, then click on save changes to update your profile."
            buttonText="Save Changes"
            data={state}
            handleChange={handleChange}
            handleSubmit={async () =>
              await handleUpdate(state).then(() => setSheetState(false))
            }
            isLoading={isLoading}
            sheetState={sheetState}
            setSheetState={setSheetState}
            trigger={
              <Button className="" size="icon" variant="default">
                <LucidePencil className="w-4 h-4" />
              </Button>
            }
          />
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Address</TableCell>
              <TableCell className="text-right">{data?.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">City</TableCell>
              <TableCell className="text-right">{data?.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">State</TableCell>
              <TableCell className="text-right">{data?.state}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Country</TableCell>
              <TableCell className="text-right">{data?.country}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
