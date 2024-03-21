import { Avatar } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export function UploadedAvatar() {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const files = watch('profileImage');
  const uploadedImage = files?.[0];
  const preview = useMemo(
    () => (uploadedImage ? URL.createObjectURL(uploadedImage) : undefined),
    [uploadedImage]
  );
  return (
    <Avatar size="xl" src={preview} border={errors.profileImage ? '2px solid #FC8181' : 'none'} />
  );
}
