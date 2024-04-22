import { Box, Button, Heading, Text, chakra } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import { BookmarkFormValue } from '@/entities/bookmark';
import { MerchantCardType } from '@/entities/merchant-card';
import { useCurrentUser } from '@/entities/user';
import { createBookmark } from '@/features/bookmark/create-bookmark';
import { BookmarkForm, Menulist } from '@/widgets/bookmark-form';

import { MenuToggleContainer } from './menu-toggle-container';

export function CreateMerchantPage() {
  const location = useLocation();
  // const navigate = useNavigate();
  const merchant: MerchantCardType | null = location.state;
  const { id: groupId } = useParams();
  const { data: user } = useCurrentUser();

  const methods = useForm<any>();
  const { handleSubmit } = methods;

  const onSubmit = async (values: BookmarkFormValue) => {
    if (!merchant || !user?.id || !groupId) return;
    const result = await createBookmark({
      ...values,
      ...merchant,
      groupId: groupId,
      managerId: user.id,
    });
    console.log(result);
    // await createReviewMenu([id!, menus]);
    // navigate(`/group/${groupId}`);
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
            <BookmarkForm />
            <Menulist />
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
