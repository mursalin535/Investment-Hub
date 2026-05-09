# Investment Hub - URL Structure Documentation

## Overview
The application now uses a more semantic URL structure with separate routes for groups and companies.

## URL Structure

### 1. **Newsfeed Sections** (Different URLs)
- `/newsfeed` or `/newsfeed/feed` - Main feed with posts
- `/newsfeed/groups` - Groups list view (inline in Newsfeed)
- `/newsfeed/companies` - Companies list view (inline in Newsfeed)
- `/newsfeed/news` - News articles view (inline in Newsfeed)

### 2. **Individual Group Pages** (Using Group Names as Slugs)
- `/groups/:groupName` - Individual group page
  - Example: `/groups/dhaka-tech-investors`
  - Example: `/groups/agro-growth-fund`
  - Example: `/groups/real-estate-circle`
- Backward compatible: `/group/:groupId` still works (for legacy support)

### 3. **Individual Company Pages** (Using Company Names as Slugs)
- `/companies/:companyName` - Individual company page
  - Example: `/companies/greenharvest-ltd`
  - Example: `/companies/softtech-solutions`
  - Example: `/companies/buildright-construction`
- Backward compatible: `/company/:companyId` still works (for legacy support)

### 4. **Other Pages** (Unchanged)
- `/` - Home page
- `/about` - About page
- `/investment` - Investment page
- `/login` - Login page
- `/signup` - Sign up page
- `/profile` - User profile page
- `/news` - News page (legacy)

## URL Slug Format

The URL slugs are automatically generated from names using the `slugify()` function:
- Converts to lowercase
- Replaces spaces with hyphens
- Removes special characters
- Example: "Dhaka Tech Investors" → "dhaka-tech-investors"

## Components Updated

### 1. **Newsfeed.jsx**
- Now accepts a `tab` prop from the router
- Uses URL-based navigation instead of local state tabs
- Dynamically loads GroupList and CompanyList components inline

### 2. **GroupPage.jsx**
- Now accepts `:groupName` parameter (also supports legacy `:groupId`)
- Uses `slugify()` to match group names
- Falls back to ID lookup if name match fails

### 3. **CompanyPage.jsx**
- Now accepts `:companyName` parameter (also supports legacy `:companyId`)
- Uses `slugify()` to match company names
- Falls back to ID lookup if name match fails

### 4. **GroupList.jsx**
- Updated to use `/groups/:groupName` links
- Added `viewMode` prop for inline display in Newsfeed
- Uses `slugify()` for URL generation

### 5. **CompanyList.jsx**
- Updated to use `/companies/:companyName` links
- Added `viewMode` prop for inline display in Newsfeed
- Uses `slugify()` for URL generation

### 6. **Profile.jsx**
- Updated navigation handlers to use group/company names
- Uses `slugify()` for URL generation
- Calls: `handleGroupClick(group.name)` and `handleCompanyClick(company.name)`

## Helper Functions

### New File: `src/lib/slugify.js`

```javascript
export const slugify(name) // Converts names to URL-friendly slugs
export const deslugify(slug) // Converts slugs back to readable format
export const createSlug(name) // Alias for slug creation
export const getSlugFromParams(param) // Helper for route params
```

## Router Configuration

Updated in `main.jsx`:
- Added nested routes under `/newsfeed`
- `/newsfeed/feed`, `/newsfeed/groups`, `/newsfeed/companies`, `/newsfeed/news`
- New routes: `/groups/:groupName`, `/companies/:companyName`
- Maintained backward compatibility: `/group/:groupId`, `/company/:companyId`

## Benefits

1. **SEO Friendly** - Group/company names in URLs improve search visibility
2. **User Friendly** - URLs are now readable and descriptive
3. **Bookmarkable** - Users can bookmark specific groups/companies
4. **Semantic Structure** - Clear separation between list and detail views
5. **Backward Compatible** - Old ID-based URLs still work
6. **Organized Navigation** - All newsfeed sections have distinct URLs
