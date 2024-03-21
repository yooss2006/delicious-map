import dayjs from 'dayjs';

import { Group } from '@/entities/group';
import { supabase } from '@/shared/lib';

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

const uploadImageFn = async (image: File) => {
  const lastDotIndex = image?.name.lastIndexOf('.');
  const extension = image?.name.slice(lastDotIndex + 1);
  const { data, error } = await supabase.storage
    .from('group')
    .upload(`${dayjs().format('YYYY_MM_DD_HH_mm_ss')}.${extension}`, image, {
      cacheControl: '3600',
    });
  if (error) {
    throw error;
  }

  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/group/${data.path}`;
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
