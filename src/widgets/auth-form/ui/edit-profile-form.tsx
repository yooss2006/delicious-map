import { FormControl, useToast, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  EditProfileDto,
  EditProfileDtoSchema,
  editProfileByEmail,
  useProfile,
} from '@/entities/profile';
import { queryClient, queryKey } from '@/shared/lib';
import { uploadImage } from '@/shared/lib/supabase/upload-image';
import { SubmitButton, UploadedAvatar } from '@/shared/ui/form';

export function EditProfileForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const { data: profile } = useProfile();

  const methods = useForm<EditProfileDto>({
    resolver: zodResolver(EditProfileDtoSchema),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

  const { mutate: editProfile, isPending: isEditProfileLoading } = useMutation({
    mutationFn: editProfileByEmail,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKey.currentUser });
      toast({ title: '프로필 변경이 완료되었습니다.', position: 'top', status: 'success' });
      navigate('/');
    },
  });

  const onSubmit: SubmitHandler<EditProfileDto> = async (values) => {
    if (!profile || isEditProfileLoading) return;
    const isChangeProfileImage = values.profileImage.length === 1;

    if (isChangeProfileImage) {
      values.profileImage = await uploadImage({
        image: values.profileImage[0],
        storageName: 'profile',
      });
    } else {
      values.profileImage = profile.profile_image;
    }
    editProfile([profile.email, values]);
  };

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name ?? '',
      });
    }
  }, [profile, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={2}>
          <FormLabel htmlFor="profileImage" cursor="pointer" textAlign="center">
            <UploadedAvatar name="profileImage" prevImage={profile?.profile_image ?? ''} />
          </FormLabel>
          <Input
            type="file"
            id="profileImage"
            accept="image/*"
            display="none"
            {...register('profileImage')}
          />
          <Text textAlign="center">👆를 클릭해 프로필 이미지를 추가/수정해보세요.</Text>
        </FormControl>
        <FormControl isInvalid={!!errors.name} mb={2}>
          <FormLabel>이름</FormLabel>
          <Input {...register('name')} />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <SubmitButton isLoading={isEditProfileLoading}>프로필 생성</SubmitButton>
      </form>
    </FormProvider>
  );
}
