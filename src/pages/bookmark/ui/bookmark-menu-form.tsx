import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  chakra,
} from '@chakra-ui/react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { BookmarkMenuDto, useMenu } from '@/entities/bookmark-menu';
import { StarRatingForm } from '@/shared/ui/form';

function BookmarkMenuContent() {
  const methods = useFormContext<BookmarkMenuDto>();

  const {
    control,
    register,
    formState: { errors },
  } = methods;

  return (
    <>
      <FormControl isInvalid={!!errors.name} mb={3}>
        <FormLabel>메뉴 이름</FormLabel>
        <Input
          placeholder="ex) 삼계탕"
          {...register('name', { required: '메뉴 이름을 입력하세요.' })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
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
      <Button
        type="submit"
        width="100%"
        background="green.200"
        color="white"
        _hover={{ background: 'green.400' }}
        isLoading={false}
      >
        메뉴 추가
      </Button>
    </>
  );
}

export function BookmarkMenuForm() {
  const methods = useForm<BookmarkMenuDto>();
  const { addMenu } = useMenu();

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: BookmarkMenuDto) => {
    addMenu(values);
    reset();
  };

  return (
    <Box px={4}>
      <FormProvider {...methods}>
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
          <BookmarkMenuContent />
        </chakra.form>
      </FormProvider>
    </Box>
  );
}
