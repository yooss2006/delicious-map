import { Box, Button, chakra } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { GroupDto } from '@/entities/group/api/type';
import { GroupDtoSchema } from '@/entities/group/model';
import { GroupService, useCreateGroupMutation } from '@/entities/group/queries';
import { useCreateGroupMemberMutation } from '@/entities/group-member/queries';
import { useUploadImageMutation } from '@/entities/image';
import { useProfile } from '@/entities/profile';

import { GroupForm } from './group-form';

export function CreateGroupForm() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const id = profile?.id;

  const createGroupMutation = useCreateGroupMutation();
  const createMemberMutation = useCreateGroupMemberMutation();
  const uploadImageMutation = useUploadImageMutation();

  const methods = useForm<GroupDto>({
    resolver: zodResolver(GroupDtoSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<GroupDto> = async ({ profileImage, ...rest }) => {
    if (!id) return;
    const uploadedImage = profileImage?.[0];
    const image = await uploadImageMutation.mutateAsync({
      image: uploadedImage,
      storageName: 'group',
    });
    const group = await createGroupMutation.mutateAsync({
      ...rest,
      image,
      creatorId: id,
    });
    if (!group) return;

    const groupMember = await createMemberMutation.mutateAsync({
      groupId: group.id,
      profileId: id,
      name: rest.name,
    });
    console.log(groupMember);

    if (groupMember) {
      GroupService.refreshGroupList();
      navigate(`/group/${group.id}`);
    }
  };

  const isLoading = createGroupMutation.isPending || createMemberMutation.isPending;

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
            isLoading={isLoading}
          >
            추가
          </Button>
        </Box>
      </chakra.form>
    </FormProvider>
  );
}
