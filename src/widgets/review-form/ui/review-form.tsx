import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Review } from '@/entities/review';
import { ImageUpload, StarRatingForm } from '@/shared/ui/form';

type Props = {
  ratingAverage: number;
};

export function ReviewForm({ ratingAverage }: Props) {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<Review>();

  useEffect(() => {
    if (ratingAverage) {
      setValue('rating', ratingAverage);
    }
  }, [ratingAverage, setValue]);

  return (
    <Box>
      <FormControl isInvalid={!!errors.rating} mb={3}>
        <Flex alignItems="center" gap={2}>
          별점
          <StarRatingForm
            control={control}
            name="rating"
            rules={{ required: '별점을 선택하세요.' }}
            startProps={{ fontSize: '20px' }}
          />
        </Flex>
        <FormErrorMessage>{errors.rating && errors.rating.message}</FormErrorMessage>
      </FormControl>
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
