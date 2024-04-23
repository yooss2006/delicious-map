import { FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateProfileDto,
  CreateProfileDtoSchema,
  createProfile as createProfileFn,
} from '@/entities/profile';
import { getCurrentUser } from '@/entities/session';
import { queryClient, queryKey } from '@/shared/lib';
import { SubmitButton, UploadedAvatar } from '@/shared/ui/form';

export function CreateProfileForm() {
  const navigate = useNavigate();
  const methods = useForm<CreateProfileDto>({
    resolver: zodResolver(CreateProfileDtoSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const { mutate: createProfile, isPending: isCreateProfileLoading } = useMutation({
    mutationFn: createProfileFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.currentUser });
      navigate('/');
    },
  });

  const onSubmit: SubmitHandler<CreateProfileDto> = async (values) => {
    if (isLoading) return;
    const user = await getCurrentUser();
    if (user) {
      const { id } = user;
      const { name, profileImage, email } = values;
      createProfile({ authId: id, name, profileImage, email });
    }
  };

  const isLoading = isCreateProfileLoading;
  console.log(isLoading);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={2}>
          <FormLabel htmlFor="profileImage" cursor="pointer" textAlign="center">
            <UploadedAvatar name="profileImage" />
          </FormLabel>
          <Input
            type="file"
            id="profileImage"
            accept="image/*"
            display="none"
            {...register('profileImage')}
          />
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
