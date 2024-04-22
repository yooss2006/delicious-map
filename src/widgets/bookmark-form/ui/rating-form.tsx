import { Flex, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { BookmarkFormValue } from '@/entities/bookmark';
import { useMenu } from '@/entities/bookmark-menu';
import { StarRatingForm } from '@/shared/ui/form';

export function RatingForm() {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<BookmarkFormValue>();

  const { menus } = useMenu();

  const ratingAverage =
    Math.floor(menus.reduce((acc, cur) => acc + cur.rating, 0) / menus.length) ?? 0;

  useEffect(() => {
    if (ratingAverage) {
      setValue('rating', ratingAverage);
    }
  }, [ratingAverage, setValue]);

  return (
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
  );
}
