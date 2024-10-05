import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../config/supabase.config";
import {
  ICrowdFundingContribution,
  ICrowdFundingPost,
  ILoanPost,
  ILoanPostBid,
} from "@/types/interface";

const crowdFundingTableName = "crowd_funding";
const crowdFundingContributionTableName = "crowd_funding_contributions";
const loanPostsTableName = "loan-table";
const loanPostBiddingTable = "loan_table_bidders";
// const crowdFundingImagesBucket = "crowd funding images bucket";

export const tableDataAPI = createApi({
  reducerPath: "tableDataAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Crowd Funding", "Loan Post"],

  endpoints: (builder) => ({
    // CROWD FUNDING API
    getAllCrowdFundingProjects: builder.query<ICrowdFundingPost[], void>({
      queryFn: async () => {
        const { data, error } = await supabase.from(crowdFundingTableName)
          .select(`
            *,
            contributions: crowd_funding_contributions(*)
          `);

        if (error) {
          throw new Error(error.message);
        }

        try {
          return {
            data: data ?? [],
          };
        } catch (err) {
          return {
            error: err,
          };
        }
      },
      providesTags: ["Crowd Funding"],
    }),

    getOneCrowdFundingProject: builder.query<
      ICrowdFundingPost,
      {
        id: string;
      }
    >({
      queryFn: async ({ id }) => {
        const { data, error } = await supabase
          .from(crowdFundingTableName)
          .select(
            `
          *,
          contributions: crowd_funding_contributions(*)
        `,
          )
          .eq("id", id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        try {
          return {
            data: data ?? {},
          };
        } catch (err) {
          return {
            error: err,
          };
        }
      },
    }),
    createCrowdFundingProject: builder.mutation<
      null,
      Partial<ICrowdFundingPost>
    >({
      queryFn: async (template) => {
        try {
          const { error } = await supabase
            .from(crowdFundingTableName)
            .insert(template);

          if (error) {
            throw new Error(error.message);
          }

          return {
            data: null,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Crowd Funding"],
    }),

    updateCrowdFundingProject: builder.mutation<
      null,
      Partial<ICrowdFundingPost>
    >({
      queryFn: async (template) => {
        try {
          const { error } = await supabase
            .from(crowdFundingTableName)
            .update(template)
            .eq("id", template.id);

          if (error) {
            throw new Error(error.message);
          }

          return {
            data: null,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Crowd Funding"],
    }),

    deleteCrowdFundingProject: builder.mutation<
      null,
      { id: string; creator_id: string }
    >({
      queryFn: async ({ id, creator_id }) => {
        try {
          const { error } = await supabase
            .from(crowdFundingTableName)
            .delete()
            .eq("id", id)
            .eq("creator_id", creator_id);

          if (error) {
            throw new Error(error.message);
          }

          return {
            data: null,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Crowd Funding"],
    }),
    contributeToCrowdFundingProject: builder.mutation<
      null,
      ICrowdFundingContribution
    >({
      queryFn: async ({
        crowd_funding_post_id,
        contributor_id,
        amount,
        // contributed_at
      }) => {
        try {
          const { error } = await supabase
            .from(crowdFundingContributionTableName)
            .insert([
              {
                crowd_funding_post_id,
                contributor_id,
                amount,
                // contributed_at,
              },
            ]);

          if (error) {
            throw new Error(error.message);
          }

          return {
            data: null,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Crowd Funding"],
    }),

    // LOAN API
    getAllLoanPosts: builder.query<ILoanPost[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from(loanPostsTableName)
          .select("*");

        if (error) {
          throw new Error(error.message);
        }

        try {
          return {
            data: data ?? [],
          };
        } catch (err) {
          return {
            error: err,
          };
        }
      },
      providesTags: ["Loan Post"],
    }),

    getOneLoanPost: builder.query<ILoanPost, { id: string }>({
      queryFn: async ({ id }) => {
        const { data, error } = await supabase
          .from(loanPostsTableName)
          .select(
            `
          *,
          bidders: loan_table_bidders(*)
        `,
          )
          .eq("id", id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        try {
          return {
            data: data ?? {},
          };
        } catch (err) {
          return {
            error: err,
          };
        }
      },
    }),

    bidOneLoanPost: builder.mutation<null, Partial<ILoanPostBid>>({
      queryFn: async (data) => {
        try {
          const { error } = await supabase
            .from(loanPostBiddingTable)
            .insert([data]);

          if (error) {
            throw new Error(error.message);
          }

          return {
            data: null,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
    }),
    createLoanPost: builder.mutation<null, Partial<ILoanPost>>({
      queryFn: async (template) => {
        try {
          const { error } = await supabase
            .from(loanPostsTableName)
            .insert(template);

          if (error) {
            throw new Error(error.message);
          }

          return {
            data: null,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Loan Post"],
    }),

    updateLoanPost: builder.mutation<null, Partial<ILoanPost>>({
      queryFn: async (template) => {
        try {
          const { error } = await supabase
            .from(loanPostsTableName)
            .update(template)
            .eq("id", template.id);

          if (error) {
            throw new Error(error.message);
          }

          return {
            data: null,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Loan Post"],
    }),

    deleteLoanPost: builder.mutation<null, { id: string; creator_id: string }>({
      queryFn: async ({ id, creator_id }) => {
        try {
          const { error } = await supabase
            .from(loanPostsTableName)
            .delete()
            .eq("id", id)
            .eq("creator_id", creator_id);

          if (error) {
            throw new Error(error.message);
          }

          return {
            data: null,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["Loan Post"],
    }),
  }),
});

export const {
  useGetAllCrowdFundingProjectsQuery,
  useCreateCrowdFundingProjectMutation,
  useGetAllLoanPostsQuery,
  useCreateLoanPostMutation,
  useDeleteCrowdFundingProjectMutation,
  useContributeToCrowdFundingProjectMutation,
  useGetOneCrowdFundingProjectQuery,
  useUpdateCrowdFundingProjectMutation,
  useUpdateLoanPostMutation,
  useDeleteLoanPostMutation,
  useBidOneLoanPostMutation,
  useGetOneLoanPostQuery,
} = tableDataAPI;
