import { Avatar, AvatarProps } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = AvatarProps & {
  name: string;
  prevImage?: string;
};

export function UploadedAvatar({ name, prevImage = '', ...props }: Props) {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const files = watch(name);
  const uploadedImage = files?.[0];
  const preview = useMemo(
    () => (uploadedImage instanceof File ? URL.createObjectURL(uploadedImage) : prevImage),
    [uploadedImage, prevImage]
  );

  return (
    <Avatar
      size="xl"
      {...props}
      borderWidth="2px"
      borderColor={errors[name] ? '#FC8181' : 'none'}
      src={preview}
    />
  );
}
