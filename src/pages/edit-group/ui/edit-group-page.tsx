import { Box, Button, Flex, Heading, chakra } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Group } from '@/entities/group';
import { editGroup } from '@/features/group/create-edit-group';
import { getGroupByGroupId } from '@/features/group/get-group-by-group-id';
import { queryClient } from '@/shared/lib';
import { GroupForm } from '@/widgets/group-form';
import { MenuSidebar } from '@/widgets/menu';

export function EditGroupPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: groups } = useQuery({ queryKey: ['group', id], queryFn: getGroupByGroupId });
  const { mutate, isPending } = useMutation({
    mutationFn: editGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', id] });
      navigate(`/group/${id}`);
    },
  });

  const methods = useForm<Group>();
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<Group> = async (values) => {
    mutate({ ...values, groupId: id! });
  };

  useEffect(() => {
    if (groups && groups.length > 0) {
      reset({
        name: groups[0]?.name ?? '',
        description: groups[0]?.description ?? '',
        imageUrl: groups[0]?.image_url ?? '',
      });
    }
  }, [groups, reset]);

  return (
    <Flex w="440px" h="100%">
      <MenuSidebar />
      <Box w="440px" h="100%" background="gray.50">
        <Heading py={4} lineHeight={2} as="h2" fontSize="lg" textAlign="center">
          그룹 수정
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
                수정
              </Button>
            </Box>
          </chakra.form>
        </FormProvider>
      </Box>
    </Flex>
  );
}
