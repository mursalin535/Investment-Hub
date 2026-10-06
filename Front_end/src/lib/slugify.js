// Convert name to URL-friendly slug
export const slugify = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Convert slug back to a more readable format (for searching)
export const deslugify = (slug) => {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Create slug from object
export const createSlug = (name) => slugify(name);

// Get slug from route params
export const getSlugFromParams = (param) => param;
