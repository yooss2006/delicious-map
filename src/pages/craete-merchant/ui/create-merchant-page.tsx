import { Box, Button, Heading, Text, chakra } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useMenu } from '@/entities/menu';
import { MerchantCardType } from '@/entities/merchant-card';
import { Review } from '@/entities/review';
import { createReview } from '@/features/review/create-review';
import { createReviewMenu } from '@/features/review/create-review/api/create-review-menu';
import { Menulist, ReviewForm } from '@/widgets/review-form';

import { MenuToggleContainer } from './menu-toggle-container';

export function CreateMerchantPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const merchant: MerchantCardType | null = location.state;
  const { id: groupId } = useParams();
  const { menus, resetMenu } = useMenu();
  const ratingAverage =
    Math.floor(menus.reduce((acc, cur) => acc + cur.rating, 0) / menus.length) ?? 0;

  const methods = useForm<Review>();
  const { handleSubmit } = methods;

  const onSubmit = async (values: Review) => {
    if (!merchant) return;
    const payload: Review = {
      ...values,
      merchantId: merchant.merchantId,
      merchantName: merchant.name,
      type: merchant.code === 'FD6' ? 'restaurant' : 'cafe',
      groupId: groupId!,
      lat: Number(merchant.lat),
      lng: Number(merchant.lng),
    };
    const id = await createReview(payload);
    await createReviewMenu([id!, menus]);
    navigate(`/group/${groupId}`);
    resetMenu();
  };

  if (!merchant) return null;

  return (
    <MenuToggleContainer>
      <chakra.header mb={5}>
        <Heading as="h2" fontSize="lg" textAlign="center">
          {merchant.name}
        </Heading>
        <Text fontSize="small" color="gray.500" textAlign="center">
          {merchant.address}
        </Text>
      </chakra.header>
      <FormProvider {...methods}>
        <chakra.form
          onSubmit={handleSubmit(onSubmit)}
          h="90%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <ReviewForm ratingAverage={ratingAverage} />
            {menus.length > 0 && <Menulist menus={menus} />}
          </Box>
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
    </MenuToggleContainer>
  );
}
