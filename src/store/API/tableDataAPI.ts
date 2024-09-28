import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../config/supabase.config";
import { ICrowdFundingPost, ILoanPost } from "@/types/interface";

const crowdFundingTableName = "crowd-funding";
const loanPostsTableName = "loan-table";
// const crowdFundingImagesBucket = "crowd funding images bucket";

export const tableDataAPI = createApi({
  reducerPath: "tableDataAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Crowd Funding", "Loan Post"],

  endpoints: (builder) => ({
    getAllCrowdFundingProjects: builder.query<ICrowdFundingPost[], void>({
      queryFn: async () => {
        const { data, error } = await supabase
          .from(crowdFundingTableName)
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
      providesTags: ["Crowd Funding"],
    }),

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
  }),
});

export const {
  useGetAllCrowdFundingProjectsQuery,
  useCreateCrowdFundingProjectMutation,
  useGetAllLoanPostsQuery,
  useCreateLoanPostMutation,
} = tableDataAPI;
