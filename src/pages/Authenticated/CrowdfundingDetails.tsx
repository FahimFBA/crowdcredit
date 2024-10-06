import { LoadingUI } from "@/components/Skeleton";
import { withTemplate } from "../_Templates";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOneCrowdFundingProjectQuery } from "@/store";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const CrowdfundingDetails = withTemplate(() => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const { data, isLoading, isFetching, isError } =
    useGetOneCrowdFundingProjectQuery({
      id: params.id!,
    });

  const {
    business_description,
    business_name,
    created_at,
    // creator_id,
    // current_amount,
    // id,
    target_amount,
    title,
    contributions,
    updated_at,
  } = data || {};

  if (isLoading || isFetching) {
    return <LoadingUI />;
  }

  if (isError) {
    return <div>Error occured</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-2 mb-4">
        <h1 className="text-xl">{title}</h1>
        <h3 className="text-muted-foreground">{business_name}</h3>
      </div>
      <div className="mb-6">
        <p className="text-primary">{business_description}</p>
        <p className="text-muted-foreground text-sm">Created: {created_at}</p>
        <p className="text-muted-foreground text-sm">
          Updated: {updated_at ?? 0}
        </p>
      </div>
      <h3 className="text-center mb-6 font-semibold text-lg underline">
        Target: ৳ {target_amount}
      </h3>
      <Table>
        <TableCaption>A list of all contributors</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Donor ID</TableHead>
            <TableHead>Contributed At</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contributions?.length === 0 && (
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
            contributions?.map(
              ({
                amount,
                contributed_at,
                crowd_funding_post_id,
                contributor_id,
              }) => (
                <TableRow
                  key={crowd_funding_post_id}
                  onClick={() => navigate(`/profile/` + contributor_id)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {contributor_id}
                  </TableCell>
                  <TableCell>{contributed_at.toString()}</TableCell>
                  <TableCell className="text-right">৳ {amount}</TableCell>
                </TableRow>
              ),
            )}
        </TableBody>
        {contributions?.length !== 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                ৳{" "}
                {data?.contributions
                  ?.map((item) => item?.amount)
                  ?.reduce((a, b) => a + b, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
});
