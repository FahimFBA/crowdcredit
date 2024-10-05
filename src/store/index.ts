import { userAuthAPI, tableDataAPI } from "./API";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { notificationsSlice, systemSlice, userDataSlice } from "./Slices";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const persistConfig = {
  key: "root",
  storage,
};

const persistedSystemReducer = persistReducer(
  persistConfig,
  systemSlice.reducer,
);

const persistedUserReducer = persistReducer(
  persistConfig,
  userDataSlice.reducer,
);

export const store = configureStore({
  reducer: {
    [systemSlice.name]: persistedSystemReducer,
    [userDataSlice.name]: persistedUserReducer,
    [notificationsSlice.name]: notificationsSlice.reducer,
    [userAuthAPI.reducerPath]: userAuthAPI.reducer,
    [tableDataAPI.reducerPath]: tableDataAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userAuthAPI.middleware, tableDataAPI.middleware),
});

export const persistedStore = persistStore(store);

setupListeners(store.dispatch);

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export * from "./hooks";
export * from "./API";
export * from "./Slices";
