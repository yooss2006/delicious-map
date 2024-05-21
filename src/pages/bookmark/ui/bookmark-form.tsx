import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { BookmarkDto } from '@/entities/bookmark';
import { BookmarkDtoSchema } from '@/entities/bookmark/model';
import { useBookmark } from '@/entities/bookmark/ui/bookmark-provider';
import { useMenu } from '@/entities/bookmark-menu';
import { ImageUpload } from '@/shared/ui/form';
import { Menulist, RatingForm } from '@/widgets/bookmark-form';

function BookmarkContent() {
  const methods = useFormContext<BookmarkDto>();

  const {
    formState: { errors },
    register,
  } = methods;

  return (
    <Box>
      <RatingForm />
      <FormControl isInvalid={!!errors.visitDate} mb={3}>
        <FormLabel>방문 날짜</FormLabel>
        <Input type="date" {...register('visitDate')} />
        <FormErrorMessage>{errors.visitDate && errors.visitDate.message}</FormErrorMessage>
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>사진 업로드</FormLabel>
        <ImageUpload isShowPreview fieldName="image" />
      </FormControl>
      <FormControl isInvalid={!!errors.review} mb={3}>
        <FormLabel>생각 남기기</FormLabel>
        <Textarea size="md" rows={5} {...register('review')} background="white" />
        <FormErrorMessage>{errors.review && errors.review.message}</FormErrorMessage>
      </FormControl>
      <Menulist />
    </Box>
  );
}

export function BookmarkForm() {
  const { data, onSubmit } = useBookmark();
  const methods = useForm<BookmarkDto>({
    resolver: zodResolver(BookmarkDtoSchema),
    defaultValues: data,
  });
  const { menus } = useMenu();
  const { handleSubmit } = methods;

  const handleFormFinish = (values: Record<string, any>) => {
    onSubmit({ ...data, ...values, menus });
  };

  return (
    <FormProvider {...methods}>
      <chakra.form
        onSubmit={handleSubmit(handleFormFinish)}
        h="90%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <BookmarkContent />
        <Button
          type="submit"
          width="90%"
          background="green.200"
          color="white"
          position="absolute"
          bottom={4}
          left="50%"
          transform="translateX(-50%)"
          _hover={{ background: 'green.400' }}
          isLoading={false}
        >
          추가
        </Button>
      </chakra.form>
    </FormProvider>
  );
}
