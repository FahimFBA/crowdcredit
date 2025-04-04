# CrowdCredit - Loan Management Platform

A modern web application built with React, TypeScript, and Vite for managing crowd-funding and loan operations.

## 🚀 Tech Stack

- **Frontend Framework:** React 18.3
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Styling:** TailwindCSS
- **UI Components:** Radix UI
- **Authentication:** Supabase Auth
- **Routing:** React Router DOM
- **Form Handling:** Custom Form Components
- **Date Handling:** Day.js
- **Analytics:** React GA4
- **Toast Notifications:** Sonner

## 📁 Project Structure

```
src/
├── _Hooks/               # Custom React hooks
├── _Variables/           # Global variables and constants
├── assets/              # Static assets
├── components/          # Reusable UI components
│   ├── Cards/          # Card components
│   ├── Form/           # Form components
│   ├── Layout/         # Layout components
│   ├── Modal/          # Modal dialogs
│   ├── Sheets/         # Sheet components
│   ├── Skeleton/       # Loading states
│   ├── Text/           # Text components
│   └── ui/             # Base UI components
├── config/             # Configuration files
├── lib/                # Utility functions
├── pages/             # Application pages
│   ├── Authenticated/  # Protected routes
│   ├── GeneralPages/   # Public routes
│   └── utils/         # Routing utilities
├── store/             # Redux store configuration
│   ├── API/           # API integration
│   ├── Slices/        # Redux slices
│   └── hooks/         # Store hooks
└── types/             # TypeScript types and interfaces
```

## 🛠️ Setup & Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure environment variables
4. Start development server:
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎯 Key Features

### Authentication
- Supabase-based authentication system
- Protected routes for authenticated users
- Password reset functionality
- Session management

### Profile Management
- Personal details management
- Address information
- Professional details
- University information
- Profile completion tracking

### Crowdfunding
- Create and manage crowdfunding posts
- Detailed view of funding requests
- Progress tracking
- Interactive funding process

### Loan Management
- Loan request creation
- Loan details viewing
- Status tracking
- Document management

## 🧩 Components

### Cards
- `CrowdFundingPost`: Displays crowdfunding opportunities
- `Post`: Generic post display component
- Profile Cards:
  - `AddressDetails`: User address information
  - `PersonalDetails`: Basic user information
  - `ProfessionCard`: Professional information
  - `UniversityDetails`: Educational background

### Forms
- Custom form components with validation
- Pre-built templates for common forms
- Input fields with error handling
- Text area components

### Layout
- Responsive navbar with mobile support
- Footer component
- Mobile sidebar for navigation
- Theme-aware components

### Modals & Sheets
- Base modal component
- Delete confirmation modal
- Sheet components for profile sections
- Crowdfunding interaction sheets

## 🔄 State Management

The application uses Redux Toolkit for state management with the following slices:

- `userSlice`: User authentication and profile data
- `systemSlice`: Application-wide settings and states
- `notificationsSlice`: Toast notifications and alerts

## 🎣 Custom Hooks

- `useAuthStateChange`: Manages authentication state changes
- `useControlledState`: Controlled form state management
- `useRemainingHeight`: Dynamic height calculations
- `useTheme`: Theme management

## 🔐 Authentication Flow

1. User signs up/logs in through Supabase Auth
2. Authentication state is managed through Redux
3. Protected routes are handled by RouteLogic component
4. Session persistence using redux-persist

## 🔌 API Integration

API calls are organized in the `store/API` directory:
- `tableDataAPI`: Database table operations
- `userAuthAPI`: Authentication-related operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 🔧 Configuration

### ESLint
The project uses a custom ESLint configuration with:
- TypeScript support
- React-specific rules
- Strict type checking

### Tailwind
- Custom configuration with animations
- Theme support
- Responsive design utilities

## 🏗️ Architecture Decisions

1. **Component Structure**
   - Atomic design principles
   - Separation of concerns
   - Reusable base components

2. **State Management**
   - Centralized Redux store
   - Local state when appropriate
   - Persistent storage for critical data

3. **Routing**
   - Protected routes
   - Role-based access
   - Clean URLs

4. **Performance**
   - Code splitting
   - Lazy loading
   - Optimized builds

## 📚 Type System

The project uses TypeScript with:
- Strict type checking
- Interface-first design
- Enum usage for constants
- Comprehensive type definitions

Types are organized in:
- `types/interface.ts`: Interface definitions
- `types/types.ts`: Type aliases
- `types/enum.ts`: Enumerations

## 🔍 Development Guidelines

1. **Code Style**
   - Use functional components
   - Implement proper error handling
   - Write meaningful comments
   - Follow TypeScript best practices

2. **Testing**
   - Write unit tests for utilities
   - Component testing
   - Integration testing

3. **Performance**
   - Optimize renders
   - Implement proper memoization
   - Monitor bundle size

4. **Security**
   - Implement proper authentication
   - Validate user input
   - Handle sensitive data appropriately

## 📦 Dependencies

### Production Dependencies
- React and React DOM
- Redux Toolkit and React-Redux
- Supabase for authentication
- Radix UI components
- TailwindCSS for styling
- Day.js for date handling
- React Router for navigation

### Development Dependencies
- TypeScript
- ESLint
- Vite
- Various type definitions
- Development utilities

## 🚀 Deployment

The application can be deployed using:
1. Build the application: `npm run build`
2. Preview the build: `npm run preview`
3. Deploy the `dist` directory to your hosting platform

## 🤝 Support

For support, please:
1. Check existing documentation
2. Review issue tracker
3. Create a new issue if needed

---

This project is maintained with ❤️ by the CrowdCredit team.
