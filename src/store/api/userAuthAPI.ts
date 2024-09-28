import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../config/supabase.config";
import { IUserAuth } from "@/types/interface";
import {
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
} from "@supabase/supabase-js";

const supabaseUsersTableName = "users";
// i built this using the sql editor in supabase 👇
const supabaseAuthUsersTableName = "auth_users_database";
const UsersBucketName = "Users";

export const userAuthAPI = createApi({
  reducerPath: "userAuthAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    logout: builder.mutation<string, void>({
      queryFn: async () => {
        try {
          await supabase.auth.signOut();
          return {
            data: "logged out successfully",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    sendEmailLinkSignin: builder.mutation<string, Pick<IUserAuth, "email">>({
      queryFn: async ({ email }) => {
        try {
          // first check if user exists in the database
          const { data } = await supabase
            .from(supabaseUsersTableName)
            .select("email")
            .eq("email", email)
            .single();

          // throw error if user doesn't exist
          if (data == null) {
            throw new Error(
              "User doesn't exist in Database, Please contact Admin at alumni@aspari.fr",
            );
          } else {
            await supabase.auth.signInWithOtp({
              email,
              options: {
                // set this to false if you do not want the user to be automatically signed up
                shouldCreateUser: true,
                emailRedirectTo: `${import.meta.env.VITE_APP_DOMAIN_URL}/reset-password`,
              },
            });
          }

          return {
            data: "Login Link sent to your email",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
    }),

    emailSignup: builder.mutation<AuthResponse["data"], IUserAuth>({
      queryFn: async ({ email, password }) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${import.meta.env.VITE_APP_DOMAIN_URL}/login`,
            },
          });

          if (error) {
            throw error; // Throw error if there's a Supabase error
          }

          return {
            data,
          };
        } catch (err) {
          return {
            error: err as AuthError,
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    emailLogin: builder.mutation<AuthTokenResponsePassword["data"], IUserAuth>({
      queryFn: async ({ email, password }) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            throw new Error(error.message);
          }

          return {
            data,
          };
        } catch (err) {
          return {
            error: err as AuthError,
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    sendResetPassWordEmail: builder.mutation<
      {
        title: string;
        description: string;
      },
      Pick<IUserAuth, "email">
    >({
      queryFn: async ({ email }) => {
        try {
          // first check if user exists in the database table
          const { data } = await supabase
            .from(supabaseUsersTableName)
            .select("email")
            .eq("email", email)
            .single();
          const userExistsInDb = data !== null ? true : false;

          // then check if user exists in the authentication table. Means, if user already has an account
          const accountExists: boolean = await supabase
            .from(supabaseAuthUsersTableName)
            .select("id")
            .eq("email", email)
            .then((res) =>
              (
                res as {
                  data: { id: string }[];
                }
              )?.data?.length > 0
                ? true
                : false,
            );
          if (accountExists && userExistsInDb) {
            await supabase.auth.resetPasswordForEmail(email, {
              redirectTo: `${import.meta.env.VITE_APP_DOMAIN_URL}/reset-password`,
            });
            return {
              data: {
                title: "Password reset link sent to your email",
                description: "Please check email and follow instructions.",
              },
            };
          } else if (userExistsInDb && !accountExists) {
            await supabase.auth.admin.inviteUserByEmail(email, {
              redirectTo: `${import.meta.env.VITE_APP_DOMAIN_URL}/reset-password`,
            });
            return {
              data: {
                title: "Invitation sent to your email address",
                description: "Please check email and follow instructions.",
              },
            };
          } else {
            throw new Error(
              "User doesn't exist in Database, Please contact Admin at alumni@aspari.fr",
            );
          }
        } catch (err) {
          return {
            error: err as Error,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    setNewPassWord: builder.mutation<string, Pick<IUserAuth, "password">>({
      queryFn: async ({ password }) => {
        try {
          const { error } = await supabase.auth.updateUser({
            password,
          });

          if (error) {
            throw new Error(error.message);
          }

          return {
            data: "Successfully reset Password",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    // Upload profile picture image
    uploadProfilePicture: builder.mutation<
      string,
      {
        file: File;
        uid: string;
      }
    >({
      queryFn: async ({ file, uid }) => {
        try {
          const folderPath = `${uid}/profile-picture`;

          await supabase.storage
            .from(UsersBucketName)
            .upload(folderPath, file, {
              contentType: "image/*",
            });

          const { data: profilePictureUrl } = await supabase.storage
            .from(UsersBucketName)
            .createSignedUrl(folderPath, 600000, {
              transform: {
                width: 350,
                height: 350,
                // quality: 70,
                // format: "origin",
                resize: "cover",
              },
            });

          return {
            data: profilePictureUrl?.signedUrl,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    removeProfilePicture: builder.mutation<
      void,
      {
        uid: string;
      }
    >({
      queryFn: async ({ uid }) => {
        try {
          const folderPath = `${uid}/profile-picture`;
          await supabase.storage.from(UsersBucketName).remove([folderPath]);

          return {
            data: undefined,
          };
        } catch (err) {
          return {
            error: err as Error,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useEmailLoginMutation,
  useLogoutMutation,
  useSendResetPassWordEmailMutation,
  useSetNewPassWordMutation,
  useSendEmailLinkSigninMutation,
  useUploadProfilePictureMutation,
  useRemoveProfilePictureMutation,
  useEmailSignupMutation,
} = userAuthAPI;
