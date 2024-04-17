import { Box, Button, Flex, Heading, chakra } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Group } from '@/entities/group';
import { useGroupDetail } from '@/entities/group/api/get-group-by-group-id';
import { useEditGroup } from '@/features/group/edit-group';
import { GroupForm } from '@/widgets/group-form';

export function EditGroupPage() {
  const { id } = useParams();

  const { data: group } = useGroupDetail();
  const { mutate, isPending } = useEditGroup();

  const methods = useForm<Group>();
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<Group> = async (values) => {
    mutate({ ...values, groupId: id! });
  };

  useEffect(() => {
    if (group) {
      reset({
        name: group.name ?? '',
        description: group.description ?? '',
        imageUrl: group.image_url ?? '',
      });
    }
  }, [group, reset]);

  return (
    <Flex w="440px" h="100%">
      <Box w="100%" h="100%" background="gray.50" _dark={{ background: 'gray.700' }}>
        <Heading
          py={4}
          lineHeight={2}
          as="h2"
          fontSize="xl"
          textAlign="center"
          _dark={{ color: 'gray.200' }}
        >
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
                _dark={{
                  bg: 'green.600',
                  color: 'gray.300',
                  _hover: { bg: 'green.700', color: 'gray.100' },
                }}
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
