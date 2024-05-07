import { useMutation } from '@tanstack/react-query';

import { uploadImage, uploadImageArray } from './api/upload-image';

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: uploadImage,
  });
};

export const useUploadImageArrayMutation = () => {
  return useMutation({
    mutationFn: uploadImageArray,
  });
};
