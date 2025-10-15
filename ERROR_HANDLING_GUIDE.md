# SSR Error Handling & 404 Pages - Implementation Guide

## ✅ Complete Error Handling Implementation

Your Next.js 15 application now has **comprehensive SSR error handling** with proper 404 pages and error boundaries!

## 📁 File Structure

```
/src/app/
├── error.tsx                    → Catches errors on list page
├── not-found.tsx                → Global 404 page
├── page.tsx                     → List page (with error handling)
└── [accidentId]/
    ├── error.tsx                → Catches errors on detail page
    ├── not-found.tsx            → Accident not found page
    ├── loading.tsx              → Loading state for detail page
    └── page.tsx                 → Detail page (with 404 & error handling)
```

## 🎯 How Error Handling Works

### 1. **404 Not Found** (Accident Detail Page)

**When it triggers:**
- User visits `/999999` (non-existent accident ID)
- API returns 404 status code

**What happens:**
```typescript
if (response.status === 404) {
  notFound(); // Next.js function that triggers not-found.tsx
}
```

**User sees:**
- Custom "Accident Not Found" page
- Explanation of why it might not exist
- "Back to list" button
- "Return to Accidents List" button
- Red border card for visual emphasis

### 2. **Server Errors** (5xx, Network Issues)

**When it triggers:**
- API server is down
- Network connection issues
- Database errors
- Any unhandled error in the component

**What happens:**
```typescript
if (!response.ok) {
  throw new Error(`Failed to fetch...`);
}
```

**User sees:**
- Custom error page with error message
- "Try Again" button (re-attempts the request)
- "Return to List" button (navigates away)
- Error details (including error digest ID)

### 3. **List Page Errors**

**When it triggers:**
- json-server is not running
- Network issues
- Invalid pagination parameters
- API errors

**User sees:**
- Error card with helpful troubleshooting info
- "Try Again" button
- "Reload Page" button
- Suggestions for common issues

## 🔧 Key Implementation Details

### Error Boundaries (`error.tsx`)

**Important Notes:**
- ✅ Must be `'use client'` components
- ✅ Automatically wrap route segments
- ✅ Can recover with `reset()` function
- ✅ Show during runtime errors, not build errors

```typescript
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Handle error
}
```

### Not Found Pages (`not-found.tsx`)

**Important Notes:**
- ✅ Can be Server Components
- ✅ Triggered by `notFound()` function
- ✅ Hierarchical (route-specific or global)
- ✅ SEO-friendly (returns 404 status)

```typescript
import { notFound } from 'next/navigation';

if (response.status === 404) {
  notFound(); // Renders not-found.tsx
}
```

## 🧪 Testing the Error Handling

### Test 404 (Not Found):
1. Visit: `http://localhost:3000/999999`
2. Should see: "Accident Not Found" page
3. Status: 404

### Test Server Error:
1. Stop json-server: `Ctrl+C` in the server terminal
2. Visit: `http://localhost:3000/`
3. Should see: "Failed to Load Accidents" error page
4. Click "Try Again" → Still fails
5. Restart json-server → Click "Try Again" → Works!

### Test Invalid Accident ID:
1. Visit: `http://localhost:3000/abc123`
2. Might show error or 404 depending on API response

### Test Network Error:
1. Turn off network
2. Try to navigate pages
3. Should see appropriate error messages

## 🎨 Error Page Features

### Accident Not Found (`[accidentId]/not-found.tsx`)
- ✅ Clear "404" messaging
- ✅ Helpful explanation
- ✅ List of possible reasons
- ✅ Navigation back to list
- ✅ Consistent design with app

### Error Boundaries
- ✅ Display error message
- ✅ Show error digest (for logging/debugging)
- ✅ "Try Again" button (recoverable)
- ✅ "Go Back" or "Reload" options
- ✅ Helpful troubleshooting tips

### Global Not Found
- ✅ Catches any undefined routes
- ✅ Simple, clear messaging
- ✅ Link to home page

## 📊 Error Handling Flow

### For Accident Detail Page:

```
User visits /123
      ↓
Fetch accident by ID
      ↓
Check response.status
      ↓
┌─────┴─────┐
│           │
404         200         5xx
│           │           │
notFound()  Success!    throw Error
│           │           │
renders     Display     renders
not-found   accident    error.tsx
.tsx        details
```

### For List Page:

```
User visits / or /?page=2
      ↓
Fetch accidents
      ↓
Check response.ok
      ↓
┌─────┴─────┐
│           │
Error       Success
│           │
throw       Display
Error       table
│           │
renders     Show
error.tsx   data
```

## 🚀 Benefits of SSR Error Handling

### User Experience:
- ✅ **Clear feedback**: Users know what went wrong
- ✅ **Actionable**: Buttons to try again or go back
- ✅ **No blank pages**: Always show something useful
- ✅ **Consistent design**: Errors match app styling

### Developer Experience:
- ✅ **Easy debugging**: Error messages and digests logged
- ✅ **Recoverable**: Users can retry without reload
- ✅ **Maintainable**: Centralized error handling
- ✅ **Type-safe**: Full TypeScript support

### SEO & Performance:
- ✅ **Proper status codes**: 404s return real 404 status
- ✅ **Server-rendered**: Errors render on server
- ✅ **No JavaScript required**: Works without JS
- ✅ **Search engine friendly**: Crawlers see proper errors

## 🔍 Error Logging

All errors are logged to console with context:

```typescript
useEffect(() => {
  console.error('Accident detail error:', error);
}, [error]);
```

In production, replace this with:
- Sentry
- LogRocket
- Datadog
- Your error tracking service

## 💡 Best Practices Implemented

1. ✅ **Specific error boundaries** for each route
2. ✅ **Proper HTTP status checking** before processing
3. ✅ **Graceful degradation** with helpful messages
4. ✅ **Recovery options** (try again, go back)
5. ✅ **User-friendly explanations** (not just technical errors)
6. ✅ **Consistent UI** (cards, buttons match theme)
7. ✅ **Proper Next.js patterns** (notFound(), error.tsx)
8. ✅ **Hierarchical error handling** (route-specific + global)

## 📝 Summary

Your application now handles:

- ✅ **404 Not Found**: Specific accident not found
- ✅ **Server Errors**: API down, network issues
- ✅ **Invalid Routes**: Global 404 page
- ✅ **Loading States**: For each route
- ✅ **Recovery**: Try again without reload
- ✅ **Navigation**: Easy way to go back
- ✅ **SSR**: All rendered server-side
- ✅ **Type-safe**: Full TypeScript support

**You now have production-ready error handling that provides excellent UX while maintaining SSR benefits!** 🎉

## 🧪 Quick Test Commands

```bash
# Start everything
pnpm dev          # Terminal 1: Next.js
pnpm server       # Terminal 2: json-server

# Test 404
curl -I http://localhost:3000/999999

# Test without server (will error)
# Stop json-server, then visit http://localhost:3000/

# Test invalid route
curl -I http://localhost:3000/some-invalid-page
```
