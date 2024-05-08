import { FormControl, FormErrorMessage, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useUploadImageMutation } from '@/entities/image';
import {
  CreateProfileDto,
  CreateProfileDtoSchema,
  createProfile as createProfileFn,
  getProfileByEmail,
} from '@/entities/profile';
import { getCurrentUser } from '@/entities/session';
import { queryClient, queryKey } from '@/shared/lib';
import { SubmitButton, UploadedAvatar } from '@/shared/ui/form';

export function CreateProfileForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const methods = useForm<CreateProfileDto>({
    resolver: zodResolver(CreateProfileDtoSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const createProfileMutation = useMutation({
    mutationFn: createProfileFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKey.currentUser });
      navigate('/');
    },
  });
  const uploadImageMutation = useUploadImageMutation();

  const onSubmit: SubmitHandler<CreateProfileDto> = async (values) => {
    if (isLoading) return;
    const email = await getProfileByEmail(values.email);
    if (email) {
      return toast({
        title: '이미 등록된 이메일입니다.',
        position: 'top',
        status: 'error',
      });
    }
    const user = await getCurrentUser();
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
  };

  const isLoading = createProfileMutation.isPending || uploadImageMutation.isPending;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={2}>
          <FormLabel htmlFor="image" cursor="pointer" textAlign="center">
            <UploadedAvatar name="image" />
          </FormLabel>
          <Input type="file" id="image" accept="image/*" display="none" {...register('image')} />
          <Text textAlign="center">👆를 클릭해 프로필 이미지를 추가해보세요.</Text>
        </FormControl>
        <FormControl isInvalid={!!errors.email} mb={2}>
          <FormLabel>이메일</FormLabel>
          <Input type="email" {...register('email')} />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.name} mb={2}>
          <FormLabel>이름</FormLabel>
          <Input {...register('name')} />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <SubmitButton isLoading={isLoading}>프로필 생성</SubmitButton>
      </form>
    </FormProvider>
  );
}
