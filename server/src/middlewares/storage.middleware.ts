import multer from 'multer';

export const storageMiddleware = () => {
  const storage = multer.memoryStorage();
  return multer({ storage }).single('picture');
};
