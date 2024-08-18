export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(png|gif|jpeg)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    callback(null, false);
  }
  callback(null, true);
};
