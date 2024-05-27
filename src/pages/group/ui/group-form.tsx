import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { groupTypes } from '@/entities/group';
import { UploadedAvatar } from '@/shared/ui/form';

export function GroupForm() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<groupTypes.Group>();

  const imageUrl = getValues('image') ?? '';

  return (
    <>
      <FormControl isInvalid={!!errors.image} mb={2}>
        <FormLabel htmlFor="image" cursor="pointer" textAlign="center">
          <UploadedAvatar name="image" prevImage={imageUrl} />
        </FormLabel>
        <Input
          type="file"
          id="image"
          accept="image/*"
          display="none"
          {...register('image', {
            required: getValues('image') ? false : '프로필 이미지를 업로드하세요.',
          })}
        />
        <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
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
    </>
  );
}
