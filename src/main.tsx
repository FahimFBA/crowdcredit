import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./config/supabase.config.ts";
import { persistedStore, store } from "./store/index.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <SessionContextProvider supabaseClient={supabase}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
        <Toaster
          position="bottom-right"
          richColors
          expand={false}
          toastOptions={{}}
        />
      </PersistGate>
    </SessionContextProvider>
  </Provider>,
);
