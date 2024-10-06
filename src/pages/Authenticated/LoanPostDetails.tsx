import { LoadingUI } from "@/components/Skeleton";
import { withTemplate } from "../_Templates";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneLoanPostQuery } from "@/store";

export const LoanPostDetails = withTemplate(() => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const { data, isLoading, isFetching, isError } = useGetOneLoanPostQuery({
    id: params.id!,
  });

  console.log(data);

  const { created_at, loan_amount, loan_purpose, updated_at, bidders } =
    data || {};

  if (isLoading || isFetching) {
    return <LoadingUI />;
  }

  if (isError) {
    return <div className="">Error</div>;
  }
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-2 mb-4">
        <h1 className="text-xl">Loan: {loan_purpose}</h1>
      </div>
      <div className="mb-6">
        <p className="text-primary">History</p>
        <p className="text-muted-foreground text-sm">Created: {created_at}</p>
        <p className="text-muted-foreground text-sm">
          Updated: {updated_at ?? 0}
        </p>
      </div>
      <h3 className="text-center mb-6 font-semibold text-lg underline">
        Target: ${loan_amount}
      </h3>
      <Table>
        <TableCaption>A list of all Bidders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Bidder ID</TableHead>
            <TableHead>Bid At</TableHead>
            <TableHead className="text-right">Proposed Interest Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bidders?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-10 text-xl font-semibold"
              >
                No contributions so far
              </TableCell>
            </TableRow>
          )}

          {data &&
            bidders?.map(({ amount, created_at, bidder_id, id }) => (
              <TableRow
                key={id}
                onClick={() => navigate(`/profile/` + bidder_id)}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">$ {bidder_id}</TableCell>
                <TableCell>{created_at}</TableCell>
                <TableCell className="text-right">$ {amount}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        {/* {bidders?.length !== 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                ${" "}
                {bidders
                  ?.map((item) => item?.amount)
                  ?.reduce((a, b) => a + b, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        )} */}
      </Table>
    </div>
  );
});
