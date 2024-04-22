import { Box, Button, Heading, chakra } from '@chakra-ui/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Group } from '@/entities/group';
import { useCurrentUser } from '@/entities/user';
import { useCreateGroup } from '@/features/group/create-group';
import { GroupForm } from '@/widgets/group-form';

export function CreateGroupPage() {
  const { data: user } = useCurrentUser();
  const userId = user?.id;

  const { mutate, isPending } = useCreateGroup();

  const methods = useForm<Group>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<Group> = async (values) => {
    if (!userId) return;
    mutate({
      ...values,
      userId,
      userImageUrl: user?.user_metadata?.avatar_url,
      nickName: user?.user_metadata?.name,
    });
  };

  return (
    <Box w="440px" h="100%" background="gray.50" _dark={{ background: 'gray.700' }}>
      <Heading
        py={4}
        lineHeight={2}
        as="h2"
        fontSize="xl"
        textAlign="center"
        _dark={{ color: 'gray.200' }}
      >
        그룹 생성
      </Heading>
      <FormProvider {...methods}>
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
          <Box px={4}>
            <GroupForm />
            <Button
              type="submit"
              width="100%"
              mt={3}
              background="green.300"
              color="white"
              _hover={{ background: 'green.500' }}
              _dark={{
                bg: 'green.600',
                color: 'gray.300',
                _hover: { bg: 'green.700', color: 'gray.100' },
              }}
              isLoading={isPending}
            >
              추가
            </Button>
          </Box>
        </chakra.form>
      </FormProvider>
    </Box>
  );
}
