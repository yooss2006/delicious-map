import { Flex, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { BookmarkDto } from '@/entities/bookmark';
import { useMenu } from '@/entities/bookmark-menu';
import { StarRatingForm } from '@/shared/ui/form';

export function RatingForm() {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<BookmarkDto>();

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
        <StarRatingForm control={control} name="rating" startProps={{ fontSize: '20px' }} />
      </Flex>
      <FormErrorMessage>{errors.rating && '별점을 입력하세요.'}</FormErrorMessage>
    </FormControl>
  );
}
