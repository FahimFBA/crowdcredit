# Custom Hooks Documentation

## Overview

This document details the custom React hooks available in the CrowdCredit application. These hooks encapsulate common functionality and provide reusable stateful logic across components.

## Available Hooks

### useAuthStateChange

Located in `src/_Hooks/useAuthStateChange.ts`

```typescript
function useAuthStateChange(): {
  user: User | null;
  loading: boolean;
  error: Error | null;
}
```

Purpose: Manages authentication state changes and user session.

Example usage:
```typescript
import { useAuthStateChange } from '_Hooks';

function AuthAwareComponent() {
  const { user, loading, error } = useAuthStateChange();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return user ? <AuthenticatedUI /> : <LoginPrompt />;
}
```

### useControlledState

Located in `src/_Hooks/useControlledState.ts`

```typescript
function useControlledState<T>(
  initialValue: T,
  onChange?: (value: T) => void
): [T, (value: T) => void]
```

Purpose: Manages form input state with controlled components pattern.

Example usage:
```typescript
import { useControlledState } from '_Hooks';

function ControlledInput() {
  const [value, setValue] = useControlledState('');
  
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### useRemainingHeight

Located in `src/_Hooks/useRemainingHeight.tsx`

```typescript
function useRemainingHeight(
  headerHeight: number
): {
  containerRef: RefObject<HTMLDivElement>;
  remainingHeight: number;
}
```

Purpose: Calculates remaining viewport height after accounting for fixed elements.

Example usage:
```typescript
import { useRemainingHeight } from '_Hooks';

function ScrollableContent() {
  const { containerRef, remainingHeight } = useRemainingHeight(64); // header height

  return (
    <div 
      ref={containerRef}
      style={{ height: remainingHeight }}
      className="overflow-auto"
    >
      {/* Scrollable content */}
    </div>
  );
}
```

### useTheme

Located in `src/_Hooks/useTheme.ts`

```typescript
function useTheme(): {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}
```

Purpose: Manages application theme state with system preference detection.

Example usage:
```typescript
import { useTheme } from '_Hooks';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## Implementation Details

### useAuthStateChange

```typescript
import { useEffect, useState } from 'react';
import { supabase } from 'src/config/supabase.config';

export function useAuthStateChange() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Subscribe to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Initial session check
    supabase.auth.getSession().then(
      ({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading, error };
}
```

### useControlledState

```typescript
import { useState, useCallback } from 'react';

export function useControlledState<T>(
  initialValue: T,
  onChange?: (value: T) => void
) {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange = useCallback(
    (newValue: T) => {
      setValue(newValue);
      onChange?.(newValue);
    },
    [onChange]
  );

  return [value, handleChange] as const;
}
```

### useRemainingHeight

```typescript
import { useEffect, useRef, useState } from 'react';

export function useRemainingHeight(headerHeight: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [remainingHeight, setRemainingHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const windowHeight = window.innerHeight;
        setRemainingHeight(windowHeight - headerHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [headerHeight]);

  return { containerRef, remainingHeight };
}
```

### useTheme

```typescript
import { useEffect } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();

  useEffect(() => {
    // Set initial theme based on system preference
    if (!theme) {
      setTheme(systemTheme ?? 'light');
    }
  }, [systemTheme, theme, setTheme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return {
    theme: theme as 'light' | 'dark',
    setTheme,
    toggleTheme,
  };
}
```

## Best Practices

1. **Hook Naming**
   - Prefix with 'use'
   - Clear, descriptive names
   - Consistent naming convention

2. **Dependencies**
   - Minimize external dependencies
   - Use dependency arrays correctly
   - Handle cleanup properly

3. **Error Handling**
   - Implement proper error states
   - Provide error feedback
   - Handle edge cases

4. **Performance**
   - Memoize callbacks
   - Optimize re-renders
   - Clean up subscriptions

## Testing Hooks

Example test setup:

```typescript
import { renderHook, act } from '@testing-library/react-hooks';

describe('useControlledState', () => {
  it('should update value when changed', () => {
    const { result } = renderHook(() => useControlledState(''));
    
    act(() => {
      result.current[1]('new value');
    });
    
    expect(result.current[0]).toBe('new value');
  });
});
```

## Common Issues and Solutions

1. **Infinite Re-renders**
   - Check dependency arrays
   - Memoize callbacks
   - Use appropriate state updates

2. **Memory Leaks**
   - Clean up subscriptions
   - Cancel async operations
   - Remove event listeners

3. **State Updates on Unmounted Components**
   - Track component mounted state
   - Use cleanup functions
   - Handle async operations properly

## Support

For hook-related issues:
1. Check implementation examples
2. Review dependency arrays
3. Test in isolation
4. Create minimal reproduction
