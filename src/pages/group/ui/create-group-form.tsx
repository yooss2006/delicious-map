import { Box, Button, chakra } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { groupQueries, groupSchemas, groupTypes } from '@/entities/group';
import { MemberQueries } from '@/entities/group-member';
import { imageQueries } from '@/entities/image';
import { profileQueries } from '@/entities/profile';
import { pathKeys } from '@/shared/lib/react-router';

import { GroupForm } from './group-form';

const useCreateGroup = () => {
  const navigate = useNavigate();
  const profile = profileQueries.profileService.getCache();

  const createGroupMutation = groupQueries.useCreateGroupMutation();
  const createMemberMutation = MemberQueries.useCreateGroupMemberMutation();
  const uploadImageMutation = imageQueries.useUploadImageMutation();

  const isPending =
    createGroupMutation.isPending ||
    uploadImageMutation.isPending ||
    createMemberMutation.isPending;

  const onSubmit: SubmitHandler<groupTypes.GroupDto> = async ({ image, ...rest }) => {
    let uploadedImage = '';
    if (image) {
      uploadedImage = await uploadImageMutation.mutateAsync({
        image: image[0],
        storageName: 'group',
      });
    }
    const group = await createGroupMutation.mutateAsync({
      ...rest,
      image: uploadedImage,
      creatorId: profile?.id,
    });
    if (!group) return;

    const groupMember = await createMemberMutation.mutateAsync({
      groupId: group.id,
      profileId: profile?.id,
      name: profile?.name ?? '',
    });

    if (groupMember) {
      groupQueries.GroupService.invalidateQueries();
      navigate(pathKeys.group.detail(group.id));
    }
  };

  return { onSubmit, isPending };
};

export function CreateGroupForm() {
  const methods = useForm<groupTypes.GroupDto>({
    resolver: zodResolver(groupSchemas.GroupDtoSchema),
  });
  const { handleSubmit } = methods;

  const { onSubmit, isPending } = useCreateGroup();

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
            생성
          </Button>
        </Box>
      </chakra.form>
    </FormProvider>
  );
}
