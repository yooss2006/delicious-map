import { Box, Heading, chakra } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Group } from '@/entities/group';
import { getUser } from '@/features/auth/user';
import { createGroup } from '@/features/group/create-group';
import { queryClient } from '@/shared/lib';
import { GroupForm } from '@/widgets/group-form';

export function CreateGroupPage() {
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ['current_user'],
    queryFn: getUser,
    refetchOnWindowFocus: false,
  });
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
    <Box w="400px" h="100%">
      <Heading py={4} lineHeight={2} as="h2" fontSize="lg" textAlign="center">
        그룹 생성
      </Heading>
      <FormProvider {...methods}>
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
          <GroupForm isLoading={isPending} />
        </chakra.form>
      </FormProvider>
    </Box>
  );
}
