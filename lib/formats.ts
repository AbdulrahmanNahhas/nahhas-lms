export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TRY",
  }).format(price)
}

export const getPublicIdFromCloudinaryURL = (url: string) => {
  // Split the URL using '/' as the delimiter
  const parts = url.split('/');

  // Find the index of 'upload' in the array
  const uploadIndex = parts.indexOf('courses_images');

  // The public ID is the next part after 'upload'
  const publicId = "courses_images/" + parts[uploadIndex + 1];

  return publicId;
}