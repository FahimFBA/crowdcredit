# API Documentation

## Overview

This document details the API integration layer of the CrowdCredit application. The API is organized into two main modules:
- Table Data API (`tableDataAPI`)
- User Authentication API (`userAuthAPI`)

## Table Data API

Located in `src/store/API/tableDataAPI.ts`, this module handles all database table operations.

### Methods

#### User Profile Operations

```typescript
// Get user profile
getUserProfile(userId: string): Promise<UserProfile>

// Update user profile
updateUserProfile(data: UpdateUserProfileData): Promise<void>

// Delete user profile
deleteUserProfile(userId: string): Promise<void>
```

#### Loan Operations

```typescript
// Create new loan request
createLoanRequest(data: LoanRequestData): Promise<void>

// Get loan details
getLoanDetails(loanId: string): Promise<LoanDetails>

// Update loan status
updateLoanStatus(loanId: string, status: LoanStatus): Promise<void>
```

#### Crowdfunding Operations

```typescript
// Create crowdfunding post
createCrowdfundingPost(data: CrowdfundingData): Promise<void>

// Get crowdfunding details
getCrowdfundingDetails(postId: string): Promise<CrowdfundingDetails>

// Update funding progress
updateFundingProgress(postId: string, amount: number): Promise<void>
```

## User Authentication API

Located in `src/store/API/userAuthAPI.ts`, this module handles all authentication-related operations.

### Methods

#### Authentication

```typescript
// Sign up new user
signUp(email: string, password: string): Promise<AuthResponse>

// Sign in user
signIn(email: string, password: string): Promise<AuthResponse>

// Sign out user
signOut(): Promise<void>

// Reset password
resetPassword(email: string): Promise<void>

// Update password
updatePassword(newPassword: string): Promise<void>
```

#### Session Management

```typescript
// Get current session
getCurrentSession(): Promise<Session | null>

// Refresh session
refreshSession(): Promise<Session>
```

## Error Handling

All API methods implement consistent error handling:

```typescript
try {
  // API operation
} catch (error) {
  if (error instanceof AuthError) {
    // Handle authentication errors
  } else if (error instanceof DatabaseError) {
    // Handle database errors
  } else {
    // Handle other errors
  }
}
```

## Response Types

### User Profile

```typescript
interface UserProfile {
  id: string;
  email: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
  };
  addressDetails: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  professionalDetails: {
    occupation: string;
    employer: string;
    experience: number;
  };
  universityDetails: {
    university: string;
    degree: string;
    graduationYear: number;
  };
}
```

### Loan Details

```typescript
interface LoanDetails {
  id: string;
  userId: string;
  amount: number;
  purpose: string;
  duration: number;
  status: LoanStatus;
  createdAt: string;
  documents: Document[];
}
```

### Crowdfunding Details

```typescript
interface CrowdfundingDetails {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  status: CrowdfundingStatus;
  updates: Update[];
}
```

## Authentication Response

```typescript
interface AuthResponse {
  user: User;
  session: Session;
  error?: AuthError;
}
```

## Usage Examples

### Creating a Loan Request

```typescript
import { tableDataAPI } from 'src/store/API';

const createLoan = async () => {
  try {
    await tableDataAPI.createLoanRequest({
      amount: 5000,
      purpose: 'Business Expansion',
      duration: 12,
      documents: [],
    });
  } catch (error) {
    console.error('Failed to create loan request:', error);
  }
};
```

### User Authentication

```typescript
import { userAuthAPI } from 'src/store/API';

const signInUser = async (email: string, password: string) => {
  try {
    const response = await userAuthAPI.signIn(email, password);
    if (response.user) {
      // Handle successful sign in
    }
  } catch (error) {
    // Handle authentication error
  }
};
```

## Error Codes

| Code | Description |
|------|-------------|
| AUTH001 | Invalid credentials |
| AUTH002 | Session expired |
| AUTH003 | Password reset required |
| DB001 | Database connection error |
| DB002 | Record not found |
| DB003 | Duplicate entry |

## Rate Limiting

- Authentication endpoints: 5 requests per minute
- Profile operations: 10 requests per minute
- Loan/Crowdfunding operations: 20 requests per minute

## Security Considerations

1. All requests must include authentication tokens
2. Sensitive data is encrypted in transit
3. Password requirements:
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one number
   - At least one special character

## Testing

API endpoints can be tested using the provided test suite:

```bash
npm run test:api
```

## Changelog

### Version 1.0.0
- Initial API implementation
- Basic CRUD operations
- Authentication flow

### Version 1.1.0
- Added crowdfunding operations
- Enhanced error handling
- Improved rate limiting

## Support

For API-related issues:
1. Check error codes documentation
2. Review request/response logs
3. Contact support team with relevant details
