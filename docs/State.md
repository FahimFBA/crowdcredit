# State Management Documentation

## Overview

This document details the Redux state management implementation in the CrowdCredit application. The application uses Redux Toolkit for efficient state management with proper TypeScript integration.

## Store Structure

```
src/store/
├── index.ts                # Store configuration
├── API/                    # API integration
│   ├── tableDataAPI.ts     # Database operations
│   └── userAuthAPI.ts      # Authentication operations
├── Slices/                 # Redux slices
│   ├── userSlice.ts        # User state management
│   ├── systemSlice.ts      # System-wide state
│   └── notificationsSlice.tsx  # Notification management
└── hooks/                  # Custom store hooks
```

## Store Configuration

Located in `src/store/index.ts`:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const store = configureStore({
  reducer: {
    user: userReducer,
    system: systemReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Slices

### User Slice

Located in `src/store/Slices/userSlice.ts`:

```typescript
interface UserState {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
    },
    // ... other reducers
  },
});
```

### System Slice

Located in `src/store/Slices/systemSlice.ts`:

```typescript
interface SystemState {
  theme: 'light' | 'dark';
  language: string;
  isLoading: boolean;
  modalState: {
    isOpen: boolean;
    type: string | null;
    data: any;
  };
}

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // ... other reducers
  },
});
```

### Notifications Slice

Located in `src/store/Slices/notificationsSlice.tsx`:

```typescript
interface NotificationState {
  notifications: Notification[];
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});
```

## Usage Examples

### Using Store Hooks

```typescript
import { useAppSelector, useAppDispatch } from 'src/store/hooks';

function UserProfile() {
  const dispatch = useAppDispatch();
  const { user, profile } = useAppSelector((state) => state.user);
  
  const handleUpdateProfile = (data: UserProfile) => {
    dispatch(userActions.setProfile(data));
  };

  return (
    // Component JSX
  );
}
```

### Dispatching Actions

```typescript
// Authentication
dispatch(userActions.setUser(userData));

// System Settings
dispatch(systemActions.setTheme('dark'));

// Notifications
dispatch(notificationsActions.addNotification({
  id: uuid(),
  type: 'success',
  message: 'Profile updated successfully'
}));
```

## Async Operations

### Using createAsyncThunk

```typescript
const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId: string) => {
    const response = await api.getUserProfile(userId);
    return response.data;
  }
);

// Usage in component
dispatch(fetchUserProfile(userId));
```

### Error Handling

```typescript
// In slice
extraReducers: (builder) => {
  builder
    .addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    })
    .addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
}
```

## Persistence

The application uses redux-persist for state persistence:

```typescript
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'system'], // Only persist these reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
```

## TypeScript Integration

### Type Definitions

```typescript
// Store types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks with types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Best Practices

1. **State Organization**
   - Keep state normalized
   - Avoid redundant data
   - Use proper TypeScript types

2. **Performance**
   - Memoize selectors
   - Avoid unnecessary updates
   - Use proper dependency arrays

3. **Error Handling**
   - Implement proper error states
   - Handle async operations
   - Provide user feedback

4. **Testing**
   - Test reducers
   - Test async operations
   - Mock API calls

## Common Patterns

### Selector Memoization

```typescript
import { createSelector } from '@reduxjs/toolkit';

const selectUserState = (state: RootState) => state.user;

export const selectUserProfile = createSelector(
  selectUserState,
  (user) => user.profile
);
```

### Action Creators

```typescript
const updateProfile = (data: UserProfile) => (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    // API call
    dispatch(userActions.setProfile(data));
  } catch (error) {
    dispatch(notificationsActions.addNotification({
      type: 'error',
      message: error.message
    }));
  } finally {
    dispatch(setLoading(false));
  }
};
```

## Support

For state management issues:
1. Check Redux DevTools
2. Review action flows
3. Verify state updates
4. Check persistence configuration
