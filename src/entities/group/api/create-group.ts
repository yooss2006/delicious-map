import { supabase } from '@/shared/lib';

import { GroupDto } from '../types';

export const createGroup = async ({
  name,
  description,
  image,
  creatorId,
}: Omit<GroupDto, 'profileImage'> & { image: string }) => {
  const { data, error } = await supabase
    .from('group')
    .insert([{ name, description, image, creator_id: creatorId }])
    .select();
  if (error) {
    throw error;
  }
  return data[0];
};
