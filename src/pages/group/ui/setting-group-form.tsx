import { Box, Button, chakra } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { groupQueries, groupSchemas, groupTypes } from '@/entities/group';
import { useEditGroup } from '@/features/group/edit-group';

import { GroupForm } from '../ui/group-form';

export function SettingGroupForm() {
  const { id } = useParams();

  const { data: group } = groupQueries.useGroupDetailBySlug();
  const { mutate, isPending } = useEditGroup();

  const methods = useForm<groupTypes.GroupDto>({
    resolver: zodResolver(groupSchemas.GroupDtoSchema),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<groupTypes.GroupDto> = async (values) => {
    mutate({ ...values, groupId: id! });
  };

  useEffect(() => {
    if (group) {
      reset({
        name: group.name ?? '',
        description: group.description ?? '',
        image: group.image ?? '',
      });
    }
  }, [group, reset]);

  return (
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
  );
}
