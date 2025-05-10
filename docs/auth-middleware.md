# Authentication Middleware Documentation

## Overview

This document explains the authentication middleware implementation in the KAMU Restaurant application. The middleware handles route protection, role-based access control, and authentication validation.

## Files Created/Modified

1. **middleware.ts** (root): 
   - Handles route protection
   - Role-based access control
   - Authentication validation

2. **lib/authMiddleware.ts**: 
   - Utility functions for authentication middleware
   - JWT token decoding and validation

3. **app/unauthorized/page.tsx**: 
   - Page for unauthorized access attempts
   - Auto-redirects users to their appropriate dashboard

4. **services/authService.ts**: 
   - Added cookie management for JWT tokens
   - Enhanced logout functionality

5. **contexts/AuthContext.tsx**: 
   - Updated to work with cookies for middleware

## How It Works

### Authentication Flow

1. **User Login**:
   - When user signs in, JWT token is stored in:
     - localStorage (for client-side auth)
     - cookies (for middleware/server-side auth)

2. **Route Protection**:
   - Middleware intercepts all page requests
   - Dashboard routes are always protected and require authentication
   - Other non-public routes are checked for valid JWT tokens
   - Redirects unauthenticated users to login

3. **Role-Based Access**:
   - Routes are restricted based on user roles
   - Users attempting to access unauthorized routes are redirected to the unauthorized page

4. **Logout**:
   - Clears tokens from both localStorage and cookies
   - Redirects to login page

### Routes

- **Public Routes** (no authentication required): 
  - `/` - Home page
  - `/signin` - Login page
  - `/signup` - Registration page
  - `/auth-test` - Authentication testing page

- **Protected Routes** (authentication required):
  - All routes starting with `/dashboard/`
  
- **Role-Based Protected Routes**:
  - Customer: `/dashboard`
  - Restaurant: `/dashboard/restaurant`
  - RestaurantAdmin: `/dashboard/restaurant` (same access as Restaurant)
  - Rider: `/dashboard/rider`
  - Admin: `/dashboard/admin`

## Technical Implementation

### JWT Token Validation

The middleware decodes and validates JWT tokens without making network requests, ensuring:
- Token exists
- Token is not expired
- User has appropriate role for requested route

### Special Role Handling

The middleware includes special handling for specific roles:

- **RestaurantAdmin**: Users with the RestaurantAdmin role have full access to all Restaurant routes. This allows restaurant administrators to access the restaurant dashboard and perform restaurant management tasks.

### Cookie Management

Cookies are set with:
- `path=/` to be available throughout the application
- 7-day expiration to match the backend refresh token policy
- No `httpOnly` flag, as middleware needs to read them client-side

## Future Improvements

1. Implement refresh token rotation in middleware
2. Add CSRF protection for extra security
3. Consider using secure and httpOnly cookies with a proxy endpoint for improved security
