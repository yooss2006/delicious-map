import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Group } from '@/entities/group';
import { queryClient, queryKey, supabase } from '@/shared/lib';
import { uploadImage } from '@/shared/lib/supabase/upload-image';

const createGroup = async ({
  userId,
  name,
  profileImage,
  description,
  userImageUrl,
}: Group & { userId: string; userImageUrl: string }) => {
  const uploadedImage = profileImage?.[0];
  if (!uploadedImage) return;
  const imageUrl = await uploadImage({ image: uploadedImage, storageName: 'group' });
  const groupId = await createGroupFn({
    name,
    description,
    imageUrl,
    leaderId: userId,
  });
  return await createMemberFn({ userId, groupId, userImageUrl });
};

const createGroupFn = async ({
  name,
  description,
  imageUrl,
  leaderId,
}: Omit<Group, 'profileImage'>) => {
  const { data, error } = await supabase
    .from('groups')
    .insert([{ name, description, image_url: imageUrl, leader_id: leaderId }])
    .select();
  if (error) {
    throw error;
  }
  return data[0]?.id;
};

const createMemberFn = async ({
  userId,
  groupId,
  userImageUrl,
}: {
  userId: string;
  groupId?: string;
  userImageUrl: string;
}) => {
  if (!(userId && groupId)) return;
  const { data, error } = await supabase
    .from('group_members')
    .insert({ user_id: userId, group_id: groupId, image_url: userImageUrl })
    .select();

  if (error) {
    throw error;
  }

  return data[0];
};

export const useCreateGroup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createGroup,
    onSuccess: (result) => {
      if (!result) return;
      queryClient.invalidateQueries({ queryKey: queryKey.groupList });
      navigate(`/group/${result.group_id}`);
    },
  });
};
