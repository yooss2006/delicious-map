import { Box, Input, Text, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { imageQueries } from '@/entities/image';
import { profileApi, profileSchemas, profileTypes, profileQueries } from '@/entities/profile';
import { getSession } from '@/entities/session/api/get-session';
import { pathKeys } from '@/shared/lib/react-router';
import { FormItem, SubmitButton, UploadedAvatar } from '@/shared/ui/form';

const useCreateProfile = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const createProfileMutation = profileQueries.useCreateProfileMutation();
  const uploadImageMutation = imageQueries.useUploadImageMutation();

  const isLoading = createProfileMutation.isPending || uploadImageMutation.isPending;

  const onSubmit: SubmitHandler<profileTypes.CreateProfileDto> = async (values) => {
    if (isLoading) return;
    const email = await profileApi.getProfileByEmail(values.email);
    if (email) {
      return toast({
        title: '이미 등록된 이메일입니다.',
        position: 'top',
        status: 'error',
      });
    }
    try {
      const user = await getSession();
      if (user) {
        const { id } = user;
        const { name, email } = values;
        let { image } = values;
        if (image) {
          image = await uploadImageMutation.mutateAsync({
            image: image[0],
            storageName: 'profile',
          });
        }

        createProfileMutation.mutate({ authId: id, name, image, email });
      }
    } catch (e) {
      toast({
        title: '프로필 생성에 실패했습니다. 다시 시도해주세요.',
        position: 'top',
        status: 'error',
      });
      navigate(pathKeys.root);
    }
  };

  return { onSubmit, isLoading };
};

export function CreateProfileForm() {
  const methods = useForm<profileTypes.CreateProfileDto>({
    resolver: zodResolver(profileSchemas.CreateProfileDtoSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const { onSubmit, isLoading } = useCreateProfile();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mx={{ base: 4, md: 0 }}>
          <FormItem
            labelContent={<UploadedAvatar name="image" />}
            labelProps={{
              htmlFor: 'image',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <Input type="file" id="image" accept="image/*" display="none" {...register('image')} />
          </FormItem>
          <Text textAlign="center" my={4}>
            👆를 클릭해 프로필 이미지를 추가해보세요.
          </Text>
          <FormItem labelContent="이메일" error={errors.email} mb={3}>
            <Input type="email" {...register('email')} />
          </FormItem>
          <FormItem labelContent="이름" error={errors.name} mb={3}>
            <Input {...register('name')} />
          </FormItem>
          <SubmitButton isLoading={isLoading}>프로필 생성</SubmitButton>
        </Box>
      </form>
    </FormProvider>
  );
}
