import { ProfessionDetailsSheet } from "@/components/Sheets";
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
import { IProfessionData } from "@/types/interface";
import { LucidePencil } from "lucide-react";
import { useState } from "react";

export const ProfessionCard = ({
  title,
  data,
  handleUpdate,
  isLoading,
}: {
  title: string;
  data: IProfessionData;
  handleUpdate?: (data: IProfessionData) => Promise<void>;
  isLoading: boolean;
}) => {
  const [state, setState] = useState<IProfessionData>(data);
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
          <ProfessionDetailsSheet
            title="Profession Details"
            description="Update your profession details, then click on save changes to update your profile."
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
              <TableCell className="font-medium">Company</TableCell>
              <TableCell className="text-right">{data?.company}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Industry</TableCell>
              <TableCell className="text-right">{data?.industry}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Job Title</TableCell>
              <TableCell className="text-right">{data?.job_title}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
