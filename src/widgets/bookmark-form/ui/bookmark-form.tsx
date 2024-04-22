import { Box, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';

import { BookmarkFormValue } from '@/entities/bookmark';
import { ImageUpload } from '@/shared/ui/form';

import { RatingForm } from './rating-form';

export function BookmarkForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookmarkFormValue>();

  return (
    <Box>
      <RatingForm />
      <FormControl isInvalid={!!errors.visitDate} mb={3}>
        <FormLabel>방문 날짜</FormLabel>
        <Input
          type="date"
          defaultValue={dayjs().format('YYYY-MM-DD')}
          {...register('visitDate', { required: '날짜를 입력하세요.' })}
        />
        <FormErrorMessage>{errors.visitDate && errors.visitDate.message}</FormErrorMessage>
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>사진 업로드</FormLabel>
        <ImageUpload isShowPreview fieldName="image" />
      </FormControl>
      <FormControl isInvalid={!!errors.review} mb={3}>
        <FormLabel>생각 남기기</FormLabel>
        <Textarea
          size="md"
          rows={5}
          {...register('review', { required: '생각을 작성해주세요.' })}
          background="white"
        />
        <FormErrorMessage>{errors.review && errors.review.message}</FormErrorMessage>
      </FormControl>
    </Box>
  );
}
