# Routing & Authentication Documentation

## Overview

This document details the routing and authentication implementation in the CrowdCredit application. The application uses React Router for navigation and Supabase for authentication.

## Route Structure

```
src/pages/
├── _Templates/            # Page templates
├── _Types/               # Route type definitions
├── Authenticated/        # Protected routes
│   ├── Crowdfunding.tsx
│   ├── Dashboard.tsx
│   ├── Profile.tsx
│   └── Settings.tsx
├── GeneralPages/         # Public routes
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   └── ResetPassword.tsx
└── utils/               # Routing utilities
    ├── RouteLogic.tsx
    └── Routes.tsx
```

## Route Configuration

Located in `src/pages/utils/Routes.tsx`:

```typescript
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path: '/profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: '/settings',
        element: <ProtectedRoute><Settings /></ProtectedRoute>,
      },
      {
        path: '/crowdfunding',
        element: <ProtectedRoute><Crowdfunding /></ProtectedRoute>,
      },
    ],
  },
];
```

## Protected Routes

Located in `src/pages/utils/RouteLogic.tsx`:

```typescript
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuthStateChange();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
```

## Authentication Flow

### Sign Up

```typescript
async function handleSignUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Create initial profile
    await createUserProfile(data.user.id);
    
    // Redirect to dashboard
    navigate('/dashboard');
  } catch (error) {
    console.error('Error signing up:', error);
    // Handle error
  }
}
```

### Sign In

```typescript
async function handleSignIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Get user profile
    await fetchUserProfile(data.user.id);
    
    // Redirect to previous location or dashboard
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  } catch (error) {
    console.error('Error signing in:', error);
    // Handle error
  }
}
```

### Sign Out

```typescript
async function handleSignOut() {
  try {
    await supabase.auth.signOut();
    // Clear user data from store
    dispatch(userActions.clearUser());
    // Redirect to home
    navigate('/');
  } catch (error) {
    console.error('Error signing out:', error);
    // Handle error
  }
}
```

## Route Guards

### Role-Based Access

```typescript
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

function AdminRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole={UserRole.ADMIN}>
      {children}
    </ProtectedRoute>
  );
}
```

### Profile Completion Guard

```typescript
function ProfileRequiredRoute({ children }: { children: ReactNode }) {
  const { profile } = useAppSelector(state => state.user);
  
  if (!profile?.isComplete) {
    return <Navigate to="/profile/complete" replace />;
  }
  
  return <>{children}</>;
}
```

## Navigation

### Programmatic Navigation

```typescript
import { useNavigate } from 'react-router-dom';

function NavigationExample() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/dashboard', { 
      state: { someData: 'value' },
      replace: true 
    });
  };
}
```

### Link Components

```typescript
import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <NavLink 
        to="/profile"
        className={({ isActive }) => 
          isActive ? 'active-link' : ''
        }
      >
        Profile
      </NavLink>
    </nav>
  );
}
```

## Route Parameters

### Dynamic Routes

```typescript
// Route definition
{
  path: '/crowdfunding/:postId',
  element: <ProtectedRoute><CrowdfundingDetails /></ProtectedRoute>,
}

// Usage in component
function CrowdfundingDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState<CrowdfundingPost | null>(null);

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
  }, [postId]);
}
```

## Error Handling

### Error Boundaries

```typescript
function RouteErrorBoundary() {
  const error = useRouteError();
  
  if (isAuthError(error)) {
    return <Navigate to="/login" replace />;
  }
  
  return <ErrorPage error={error} />;
}
```

### Not Found Route

```typescript
{
  path: '*',
  element: <NotFound />,
}
```

## Best Practices

1. **Route Organization**
   - Group related routes
   - Use lazy loading
   - Implement proper guards

2. **Authentication**
   - Secure sensitive routes
   - Handle token expiration
   - Implement proper redirects

3. **Performance**
   - Use route splitting
   - Implement preloading
   - Cache route data

4. **Error Handling**
   - Implement error boundaries
   - Handle 404 routes
   - Provide user feedback

## Common Patterns

### Route Data Loading

```typescript
function UserProfile() {
  const { userId } = useParams();
  const { data, loading, error } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetchUser
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <NotFound />;

  return <ProfileDisplay user={data} />;
}
```

### Route Guards with Permissions

```typescript
function PermissionGuard({ 
  children, 
  requiredPermission 
}: PermissionGuardProps) {
  const { user } = useAppSelector(state => state.user);
  
  if (!user?.permissions.includes(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
}
```

## Support

For routing and authentication issues:
1. Check authentication state
2. Verify route configuration
3. Review navigation history
4. Check permission settings
