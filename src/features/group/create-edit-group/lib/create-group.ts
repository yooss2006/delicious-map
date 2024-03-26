import { Group } from '@/entities/group';
import { supabase } from '@/shared/lib';

import { uploadImageFn } from './upload-image';

export const createGroup = async ({
  userId,
  name,
  profileImage,
  description,
}: Group & { userId?: string }) => {
  const uploadedImage = profileImage?.[0];
  if (!uploadedImage) return;
  const imageUrl = await uploadImageFn(uploadedImage);
  const groupId = await createGroupFn({ name, description, imageUrl });
  return await createMemberFn({ userId, groupId });
};

const createGroupFn = async ({
  name,
  description,
  imageUrl,
}: {
  name: string;
  description: string;
  imageUrl: string;
}) => {
  const { data, error } = await supabase
    .from('groups')
    .insert([{ name, description, image_url: imageUrl }])
    .select();
  if (error) {
    throw error;
  }
  return data[0]?.id;
};

const createMemberFn = async ({ userId, groupId }: { userId?: string; groupId?: string }) => {
  if (!(userId && groupId)) return;
  const { data, error } = await supabase
    .from('group_members')
    .insert({ user_id: userId, group_id: groupId })
    .select();

  if (error) {
    throw error;
  }

  return data[0];
};
