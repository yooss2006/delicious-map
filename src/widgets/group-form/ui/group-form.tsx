import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { Group } from '@/entities/group';

import { UploadedAvatar } from './uploaded-avatar';

type Props = {
  isLoading: boolean;
};

export function GroupForm({ isLoading }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<Group>();

  return (
    <Box px={4}>
      <FormControl isInvalid={!!errors.profileImage} mb={2}>
        <FormLabel htmlFor="profileImage" cursor="pointer" textAlign="center">
          <UploadedAvatar />
        </FormLabel>
        <Input
          type="file"
          id="profileImage"
          accept="image/*"
          display="none"
          {...register('profileImage', { required: '프로필 이미지를 업로드하세요.' })}
        />
        <FormErrorMessage>{errors.profileImage && errors.profileImage.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.name} mb={2}>
        <FormLabel>그룹 이름</FormLabel>
        <Input type="text" {...register('name', { required: '그룹 이름을 작성하세요.' })} />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.description}>
        <FormLabel>상세 설명</FormLabel>
        <Textarea rows={3} {...register('description', { required: '상세 설명을 작성하세요.' })} />
        <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" width="100%" mt={3} isLoading={isLoading}>
        추가
      </Button>
    </Box>
  );
}
