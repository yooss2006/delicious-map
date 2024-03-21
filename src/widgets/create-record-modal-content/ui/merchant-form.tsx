import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  chakra,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Merchant } from '@/entities/merchant';
import { ImageUpload, StarRatingForm } from '@/shared/ui';

type FormValues = Pick<Merchant, 'photo' | 'rating' | 'review' | 'visit_date'>;

type Props = {
  code: string;
};

export function MerchantForm({ code }: Props) {
  const methods = useForm<FormValues>();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values);
  };

  return (
    <Box px={6} width="50%">
      <FormProvider {...methods}>
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
          <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={2}>
            매장 정보
          </Text>
          <FormControl isInvalid={!!errors.rating} mb={2}>
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
          <FormControl isInvalid={!!errors.visit_date} mb={2}>
            <FormLabel>방문 날짜</FormLabel>
            <Input
              type="date"
              defaultValue={dayjs().format('YYYY-MM-DD')}
              {...register('visit_date', { required: '날짜를 입력하세요.' })}
            />
            <FormErrorMessage>{errors.visit_date && errors.visit_date.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>{`${code === 'FD6' ? '음식점' : '카페'} 사진 업로드`}</FormLabel>
            <ImageUpload isShowPreview fieldName="photo" />
          </FormControl>
          <FormControl>
            <FormLabel>생각 남기기</FormLabel>
            <Textarea size="md" rows={5} {...register('review')} />
          </FormControl>
        </chakra.form>
      </FormProvider>
    </Box>
  );
}
