import { Box, Button, Heading, chakra } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Group } from '@/entities/group';
import { useCurrentUser } from '@/entities/user';
import { createGroup } from '@/features/group/create-edit-group';
import { queryClient } from '@/shared/lib';
import { GroupForm } from '@/widgets/group-form';

export function CreateGroupPage() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const userId = user?.id;

  const { mutate, isPending } = useMutation({
    mutationFn: createGroup,
    onSuccess: (result) => {
      if (!result) return;
      queryClient.invalidateQueries({ queryKey: ['group_list'] });
      navigate(`/group/${result.group_id}`);
    },
  });

  const methods = useForm<Group>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<Group> = async (values) => {
    mutate({ ...values, userId });
  };

  return (
    <Box w="440px" h="100%" background="gray.50">
      <Heading py={4} lineHeight={2} as="h2" fontSize="lg" textAlign="center">
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
