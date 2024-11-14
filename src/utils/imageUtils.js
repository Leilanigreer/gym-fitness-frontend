// src/utils/imageUtils.js
export const getImageUrl = (imagePath) => {
  // If the path is already a full URL, return it as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Add /images to the path if it starts with /exercises
  const adjustedPath = imagePath.startsWith('/exercises') 
    ? `/images${imagePath}`
    : imagePath;
    
  return `${import.meta.env.VITE_API_URL}${adjustedPath}`;
};