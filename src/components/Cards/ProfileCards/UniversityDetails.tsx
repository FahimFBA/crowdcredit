import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUniversityData } from "@/types/interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LucidePencil } from "lucide-react";
import { Button } from "@/components/ui";
import { useState } from "react";
import { UniversityDetailsSheet } from "@/components/Sheets/Profile/UniversityDetailsSheet";

export const UniversityDetails = ({
  title,
  data,
  handleUpdate,
  isLoading,
}: {
  title: string;
  data: IUniversityData;
  handleUpdate?: (universityData: IUniversityData) => Promise<void>;
  isLoading: boolean;
}) => {
  const [state, setState] = useState<IUniversityData>(data);
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
          <UniversityDetailsSheet
            title="University Details"
            description="Update your university details, then click on save changes to update your profile."
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
              <TableCell className="font-medium">University Name</TableCell>
              <TableCell className="text-right">{data?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Department</TableCell>
              <TableCell className="text-right">{data?.department}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Batch</TableCell>
              <TableCell className="text-right">{data?.batch}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">University ID</TableCell>
              <TableCell className="text-right">{data?.uni_id}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
