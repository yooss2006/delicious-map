import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Textarea,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { getUser } from '@/features/auth/user';
import { createGroup as createGroupFn } from '@/features/group/create-group';
import { createMember as createMemberFn } from '@/features/group/create-member';
import { uploadImage } from '@/features/image/upload-image';
import { queryClient } from '@/shared/lib';
import { useModal } from '@/shared/lib/modal';

type Props = {
  data: any;
};

type FormValues = {
  name: string;
  description: string;
  profileImage: Array<File>;
};

export function GroupModalContent({ data }: Props) {
  const { closeModal } = useModal();
  const { mutateAsync: upload, isPending: isUploadPending } = useMutation({
    mutationFn: uploadImage,
  });
  const { mutateAsync: createGroup, isPending: isCreateGroupPending } = useMutation({
    mutationFn: createGroupFn,
  });
  const { mutateAsync: createMember, isPending: isCreateMemberPending } = useMutation({
    mutationFn: createMemberFn,
  });
  const { data: user } = useQuery({
    queryKey: ['current_user'],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const navigate = useNavigate();
  const user_id = user?.id;

  const methods = useForm<FormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const isLoading = isUploadPending || isCreateGroupPending || isCreateMemberPending;

  const onSubmit: SubmitHandler<FormValues> = async ({ name, description, profileImage }) => {
    const uploadedImage = profileImage?.[0];
    if (!uploadedImage || isLoading) return;
    const { path } = await upload(uploadedImage);
    const imageUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/group/${path}`;
    const group = await createGroup({ name, description, image_url: imageUrl });
    const group_id = group?.id;
    const result = await createMember({ user_id, group_id });
    if (result) {
      queryClient.invalidateQueries({ queryKey: ['group_list'] });
      navigate(`/group/${group_id}`);
      closeModal();
    }
  };

  return (
    <Box>
      <ModalHeader>
        <Heading as="h2" fontSize="lg" textAlign="center">
          그룹 {data ? '수정' : '추가'}
        </Heading>
      </ModalHeader>
      <ModalBody>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.profileImage} mb={2}>
              <FormLabel htmlFor="profileImage" cursor="pointer" textAlign="center">
                <UploadAvatar />
              </FormLabel>
              <Input
                type="file"
                id="profileImage"
                accept="image/*"
                display="none"
                {...register('profileImage', { required: '프로필 이미지를 업로드하세요.' })}
              />
              <FormErrorMessage>
                {errors.profileImage && errors.profileImage.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.name} mb={2}>
              <FormLabel>그룹 이름</FormLabel>
              <Input type="text" {...register('name', { required: '그룹 이름을 작성하세요.' })} />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.description}>
              <FormLabel>상세 설명</FormLabel>
              <Textarea
                rows={3}
                {...register('description', { required: '상세 설명을 작성하세요.' })}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="blue" width="100%" mt={3} isLoading={isLoading}>
              추가
            </Button>
          </form>
        </FormProvider>
      </ModalBody>
      <ModalCloseButton />
    </Box>
  );
}

function UploadAvatar() {
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
