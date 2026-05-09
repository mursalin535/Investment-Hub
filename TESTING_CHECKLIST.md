# Testing Checklist - Investment Hub URL Structure

## Test URLs to Verify

### 1. Newsfeed Sections
- [ ] `/newsfeed` - Should show feed with all tabs
- [ ] `/newsfeed/feed` - Should show main feed tab
- [ ] `/newsfeed/groups` - Should show groups list inline in newsfeed
- [ ] `/newsfeed/companies` - Should show companies list inline in newsfeed
- [ ] `/newsfeed/news` - Should show news articles inline in newsfeed

### 2. Individual Pages (Group Examples)
- [ ] `/groups/dhaka-tech-investors` - Should load "Dhaka Tech Investors" group
- [ ] `/groups/agro-growth-fund` - Should load "Agro Growth Fund" group
- [ ] `/groups/real-estate-circle` - Should load "Real Estate Circle" group

### 3. Individual Pages (Company Examples)
- [ ] `/companies/greenharvest-ltd` - Should load "GreenHarvest Ltd" company
- [ ] `/companies/softtech-solutions` - Should load "SoftTech Solutions" company
- [ ] `/companies/buildright-construction` - Should load "BuildRight Construction" company

### 4. Backward Compatibility (Legacy URLs)
- [ ] `/group/1` - Should still work (group by ID)
- [ ] `/group/2` - Should still work (group by ID)
- [ ] `/company/1` - Should still work (company by ID)
- [ ] `/company/2` - Should still work (company by ID)

### 5. Navigation Tests
- [ ] From Newsfeed feed section → Click "View All Groups" → `/newsfeed/groups`
- [ ] From Newsfeed groups section → Click group card → `/groups/:groupName`
- [ ] From Newsfeed companies section → Click company card → `/companies/:companyName`
- [ ] From Profile → Click group → `/groups/:groupName`
- [ ] From Profile → Click company → `/companies/:companyName`

### 6. Tab Navigation
- [ ] Newsfeed tabs should update URL when clicked
- [ ] URL should change based on selected tab
- [ ] Back button should work correctly

### 7. Search/Filter
- [ ] Groups search still works in inline view
- [ ] Companies search still works in inline view
- [ ] Clicking results navigates to correct URL

### 8. Edge Cases
- [ ] Invalid group slugs show "Group not found"
- [ ] Invalid company slugs show "Company not found"
- [ ] Slugs with special characters handle correctly
- [ ] Multiple-word names convert to hyphens correctly

## Browser Console Checks
- [ ] No console errors
- [ ] No undefined imports
- [ ] All React Router links resolve correctly
- [ ] No duplicate route warnings

## Performance Checks
- [ ] Tab switching is smooth
- [ ] No unnecessary re-renders
- [ ] Inline components load quickly
- [ ] Back/forward navigation works smoothly
