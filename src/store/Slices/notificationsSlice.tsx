import { createSlice } from "@reduxjs/toolkit";
import { userAuthAPI } from "../API/userAuthAPI";
import { toast } from "sonner";
// import ReactGA from "react-ga4";

// const handleButtonClick = () => {
//   ReactGA.event({
//     category: "User",
//     action: "Clicked Button",
//     label: "Homepage Button",
//   });
// };

type ToastType = "loading" | "success" | "error" | "info" | "message"; // Add other types as needed

const toastBuilderShortcut = ({
  type,
  message,
  description,
  duration = 3000,
}: {
  type: ToastType;
  message?: string;
  description?: string;
  icon?: React.ReactNode;
  duration?: number;
}) => {
  toast.dismiss();
  const options = {
    description,
    duration: type == "loading" ? 20000 : duration,
  };
  toast[type](message, options);

  // if this is not present then it thows error, a case reducer blah blah.......
  return {};
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    const {
      sendEmailLinkSignin,
      emailLogin,
      emailSignup,
      logout,
      sendResetPassWordEmail,
      setNewPassWord,
    } = userAuthAPI.endpoints;

    /**
     * ! ✅ Logout
     */
    builder
      .addMatcher(logout.matchPending, () =>
        toastBuilderShortcut({
          type: "loading",
          message: "Logging out...",
          description: "Please wait a moment...",
        }),
      )
      .addMatcher(logout.matchFulfilled, () =>
        toastBuilderShortcut({
          type: "success",
          message: "Logged out successfully",
          description: "Please login Again to use app",
        }),
      )
      .addMatcher(logout.matchRejected, (_, action) =>
        toastBuilderShortcut({
          type: "error",
          message: "Error logging out",
          description: action.error.message,
        }),
      );

    /**
     * ! ✅ set New PassWord
     */

    builder
      .addMatcher(setNewPassWord.matchPending, () =>
        toastBuilderShortcut({
          type: "loading",
          message: "Setting new password...",
          description: "Please wait a moment...",
        }),
      )
      .addMatcher(setNewPassWord.matchFulfilled, () =>
        toastBuilderShortcut({
          type: "success",
          message: "Password reset successful",
        }),
      )
      .addMatcher(setNewPassWord.matchRejected, () =>
        toastBuilderShortcut({
          type: "error",
          message: "Password reset unsuccessful",
          description:
            "This password has already been used, please select a different one.",
        }),
      );

    /**
     * ! ✅ sendResetPassWordEmail
     */

    builder
      .addMatcher(sendResetPassWordEmail.matchPending, () =>
        toastBuilderShortcut({
          type: "loading",
          message: "Checking Database...",
          description: "Please wait a moment...",
        }),
      )
      .addMatcher(sendResetPassWordEmail.matchFulfilled, (_, action) =>
        toastBuilderShortcut({
          type: "success",
          message: action.payload.title,
          description: action.payload.description,
        }),
      )
      .addMatcher(sendResetPassWordEmail.matchRejected, (_, action) =>
        toastBuilderShortcut({
          type: "error",
          message: "Error sending password reset email",
          description: (
            action.payload as {
              message: string;
              stack: string;
            }
          ).message,
        }),
      );

    /**
     * ! ✅ Send Email login link
     */

    builder
      .addMatcher(sendEmailLinkSignin.matchPending, () =>
        toastBuilderShortcut({
          type: "loading",
          message: "Sending Email Login Link...",
          description: "Please wait a moment...",
        }),
      )
      .addMatcher(sendEmailLinkSignin.matchFulfilled, () =>
        toastBuilderShortcut({
          type: "success",
          message: "Email Login Link sent successfully",
          description: "Please check your email",
        }),
      )
      .addMatcher(sendEmailLinkSignin.matchRejected, (_, action) =>
        toastBuilderShortcut({
          type: "error",
          message: "Error sending Email Login Link",
          description: action?.payload
            ? (action.payload as string)
            : action.error.message,
        }),
      );
    /**
     * ! ✅ Email Signup
     */
    builder
      .addMatcher(emailSignup.matchPending, () =>
        toastBuilderShortcut({
          type: "loading",
          message: "Creating user account..",
          description: "Please wait a moment...",
        }),
      )
      .addMatcher(emailSignup.matchFulfilled, () =>
        toastBuilderShortcut({
          type: "success",
          message: "Account created, please check email",
        }),
      )
      .addMatcher(emailSignup.matchRejected, (_, action) => {
        console.log(action);
        toastBuilderShortcut({
          type: "error",
          message: "Error signing up!",
          description: (
            action.payload as {
              message: string;
              stack: string;
            }
          ).message,
        });
      });

    /**
     * ! ✅ Email Login
     */
    builder
      .addMatcher(emailLogin.matchPending, () =>
        toastBuilderShortcut({
          type: "loading",
          message: "Logging in to user account..",
          description: "Please wait a moment...",
        }),
      )
      .addMatcher(emailLogin.matchFulfilled, () =>
        toastBuilderShortcut({
          type: "success",
          message: "Logged in successfully",
        }),
      )
      .addMatcher(emailLogin.matchRejected, (_, action) =>
        toastBuilderShortcut({
          type: "error",
          message: "Error logging in",
          description: (
            action.payload as {
              message: string;
              stack: string;
            }
          ).message,
        }),
      );
  },
});
