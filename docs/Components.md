# Components Documentation

## Overview

This document provides detailed information about the reusable components in the CrowdCredit application. Components are organized into logical categories and follow a consistent pattern for props, state management, and styling.

## Card Components

### CrowdFundingPost

Located in `src/components/Cards/CrowdFundingPost.tsx`

```typescript
interface CrowdFundingPostProps {
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  author: {
    name: string;
    avatar: string;
  };
  onFund: (amount: number) => void;
}
```

Purpose: Displays crowdfunding opportunities with progress tracking and interaction options.

### Post

Located in `src/components/Cards/Post.tsx`

```typescript
interface PostProps {
  type: 'loan' | 'crowdfunding';
  data: LoanPost | CrowdfundingPost;
  actions?: ReactNode;
  onAction?: (type: string, data: any) => void;
}
```

Purpose: Generic post component that can display either loan or crowdfunding information.

### Profile Cards

#### PersonalDetails

Located in `src/components/Cards/ProfileCards/PersonalDetails.tsx`

```typescript
interface PersonalDetailsProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
  };
  onEdit?: () => void;
  readonly?: boolean;
}
```

Purpose: Displays user's personal information with optional edit functionality.

## Form Components

### InputField

Located in `src/components/Form/InputField/index.tsx`

```typescript
interface InputFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number';
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}
```

Purpose: Reusable input field with built-in validation and error handling.

### TextAreaField

Located in `src/components/Form/TextAreaField/index.tsx`

```typescript
interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  rows?: number;
  maxLength?: number;
  placeholder?: string;
}
```

Purpose: Multi-line text input with character count and validation.

### LoanForm

Located in `src/components/Form/Prebuilt/LoanForm.tsx`

```typescript
interface LoanFormProps {
  onSubmit: (data: LoanFormData) => void;
  initialData?: Partial<LoanFormData>;
  isLoading?: boolean;
}
```

Purpose: Pre-built form for loan applications with validation and submission handling.

## Layout Components

### Navbar

Located in `src/components/Layout/Navbar/index.tsx`

```typescript
interface NavbarProps {
  user?: User;
  onSignOut?: () => void;
}
```

Purpose: Main navigation component with responsive design and user menu.

### MobileSideBar

Located in `src/components/Layout/Navbar/MobileSideBar.tsx`

```typescript
interface MobileSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}
```

Purpose: Mobile-friendly navigation sidebar with animation.

## Modal Components

### BaseModal

Located in `src/components/Modal/BaseModal.tsx`

```typescript
interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}
```

Purpose: Base modal component with customizable header, content, and footer.

### DeleteModal

Located in `src/components/Modal/DeleteModal.tsx`

```typescript
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}
```

Purpose: Confirmation modal for delete operations.

## Sheet Components

### BaseSheetComponent

Located in `src/components/Sheets/BaseSheetComponent.tsx`

```typescript
interface BaseSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
}
```

Purpose: Base sheet component for sliding panels.

### CrowdFundingSheet

Located in `src/components/Sheets/CrowdFundingSheet.tsx`

```typescript
interface CrowdFundingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  data?: CrowdFundingData;
  onSubmit: (data: CrowdFundingData) => void;
}
```

Purpose: Sheet component for creating/editing crowdfunding posts.

## Skeleton Components

### LoadingUI

Located in `src/components/Skeleton/LoadingUI.tsx`

```typescript
interface LoadingUIProps {
  type: 'card' | 'list' | 'profile';
  count?: number;
}
```

Purpose: Loading state placeholders for various UI elements.

## Usage Examples

### Using Card Components

```tsx
import { CrowdFundingPost } from 'components/Cards';

function FundingList() {
  const handleFund = (amount: number) => {
    // Handle funding logic
  };

  return (
    <CrowdFundingPost
      title="Business Expansion"
      description="Help us grow our business"
      targetAmount={10000}
      currentAmount={5000}
      deadline="2024-12-31"
      author={{
        name: "John Doe",
        avatar: "/avatars/john.jpg"
      }}
      onFund={handleFund}
    />
  );
}
```

### Using Form Components

```tsx
import { InputField, TextAreaField } from 'components/Form';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  return (
    <form>
      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={(value) => setFormData(prev => ({...prev, name: value}))}
        required
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData(prev => ({...prev, email: value}))}
        required
      />
      <TextAreaField
        label="Message"
        name="message"
        value={formData.message}
        onChange={(value) => setFormData(prev => ({...prev, message: value}))}
        rows={4}
      />
    </form>
  );
}
```

## Best Practices

1. **Component Organization**
   - Keep components focused and single-responsibility
   - Use TypeScript interfaces for props
   - Implement proper error boundaries
   - Document component APIs

2. **State Management**
   - Use controlled components where possible
   - Implement proper prop drilling prevention
   - Utilize context when needed
   - Keep state as local as possible

3. **Styling**
   - Use Tailwind CSS classes
   - Follow responsive design principles
   - Maintain consistent spacing
   - Use theme variables

4. **Accessibility**
   - Include proper ARIA labels
   - Ensure keyboard navigation
   - Maintain proper contrast ratios
   - Support screen readers

## Component Development Guidelines

1. **New Components**
   - Create in appropriate directory
   - Include TypeScript interfaces
   - Add to index exports
   - Document props and usage

2. **Testing**
   - Write unit tests
   - Include accessibility tests
   - Test responsive behavior
   - Verify prop validation

3. **Performance**
   - Implement proper memoization
   - Optimize re-renders
   - Lazy load when appropriate
   - Monitor bundle size impact

## Theming

Components support dark/light mode through the `useTheme` hook:

```typescript
import { useTheme } from '_Hooks';

function ThemedComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}>
      {/* Component content */}
    </div>
  );
}
```

## Error Handling

Components implement consistent error handling:

```typescript
try {
  // Component logic
} catch (error) {
  // Log error
  console.error('Component error:', error);
  // Show error UI
  return <ErrorBoundary error={error} />;
}
```

## Support

For component-related issues:
1. Check props documentation
2. Review example usage
3. Check error boundaries
4. Create issue with reproduction
