import { PersonalDetailsSheet } from "@/components/Sheets/Profile/PersonalDetailsSheet";
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
import { IProfileData } from "@/types/interface";
import { LucidePencil } from "lucide-react";
import { useState } from "react";

export const PersonalDetails = ({
  title,
  data,
  handleUpdate,
  isLoading,
}: {
  title: string;
  data: IProfileData;
  handleUpdate?: (data: IProfileData) => Promise<void>;
  isLoading: boolean;
}) => {
  const [state, setState] = useState<IProfileData>(data);
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
          <PersonalDetailsSheet
            title="Personal Details"
            description="Update your personal details, then click on save changes to update your profile."
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
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">First Name</TableCell>
              <TableCell className="text-right">{data?.first_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Last Name</TableCell>
              <TableCell className="text-right">{data?.last_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Email </TableCell>
              <TableCell className="text-right">{data?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Phone Number</TableCell>
              <TableCell className="text-right">{data?.phone_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Birth Date</TableCell>
              <TableCell className="text-right">{data?.birth_date}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
