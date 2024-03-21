import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  chakra,
} from '@chakra-ui/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Menu } from '@/entities/merchant';
import { ImageUpload, StarRatingForm } from '@/shared/ui';

type FormValues = Omit<Menu, 'id' | 'merchant_id'>;

export function MenuForm() {
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
          <FormControl isInvalid={!!errors.name} mb={2}>
            <FormLabel>메뉴 이름</FormLabel>
            <Input
              placeholder="ex) 삼계탕"
              {...register('name', { required: '메뉴 이름을 입력하세요.' })}
            />
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>
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
          <FormControl isInvalid={!!errors.price} mb={2}>
            <FormLabel>금액</FormLabel>
            <Input
              placeholder="ex) 1,000"
              type="number"
              {...register('price', { required: '금액을 입력하세요.' })}
            />
            <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>메뉴 사진 업로드</FormLabel>
            <ImageUpload isShowPreview fieldName="photo" />
          </FormControl>
          <Button type="submit" colorScheme="blue" w="100%">
            메뉴 추가
          </Button>
        </chakra.form>
      </FormProvider>
    </Box>
  );
}
