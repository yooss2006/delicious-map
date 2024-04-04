import { useMutation } from '@tanstack/react-query';

import { uploadImage } from '@/shared/lib/supabase/upload-image';

export const useProfileImageUpload = () => {
  return useMutation({
    mutationFn: uploadImage,
  });
};
