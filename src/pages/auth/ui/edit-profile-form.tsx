import { Box, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { profileSchemas, profileQueries, profileTypes } from '@/entities/profile';
import { useEditProfileMutation } from '@/entities/profile/queries';
import { uploadImage } from '@/shared/lib/supabase/upload-image';
import { FormItem, SubmitButton, UploadedAvatar } from '@/shared/ui/form';

const useEditProfile = () => {
  const profile = profileQueries.profileService.getCache();
  const { mutate: editProfile, isPending } = useEditProfileMutation();

  const onSubmit: SubmitHandler<profileTypes.EditProfileDto> = async (values) => {
    if (!profile || isPending) return;
    const isChangeProfileImage = values.image.length === 1;

    if (isChangeProfileImage) {
      values.image = await uploadImage({
        image: values.image[0],
        storageName: 'profile',
      });
    } else {
      values.image = profile.image;
    }
    editProfile([profile.email, values]);
  };

  return { onSubmit, isPending };
};

export function EditProfileForm() {
  const profile = profileQueries.profileService.getCache();
  const { onSubmit, isPending } = useEditProfile();

  const methods = useForm<profileTypes.EditProfileDto>({
    resolver: zodResolver(profileSchemas.EditProfileDtoSchema),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

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
        <Box mx={{ base: 4, md: 0 }}>
          <FormItem
            labelContent={<UploadedAvatar name="image" prevImage={profile?.image ?? ''} />}
            labelProps={{
              htmlFor: 'image',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <Input type="file" id="image" accept="image/*" display="none" {...register('image')} />
          </FormItem>
          <FormItem labelContent="이름" error={errors.name} mb={3}>
            <Input {...register('name')} />
          </FormItem>
          <SubmitButton isLoading={isPending}>프로필 수정</SubmitButton>
        </Box>
      </form>
    </FormProvider>
  );
}
