import { useEffect } from "react";
import { supabase } from "../config/supabase.config";
import { loginSuccess, logoutSuccess, useAppDispatch } from "../store";

export const useAuthStateChange = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        if (session?.user) {
          dispatch(
            loginSuccess({
              email: session.user.email as string,
              uid: session.user.id,
            }),
          );
        } else {
          dispatch(logoutSuccess());
        }
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);
};
