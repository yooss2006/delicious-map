import { useQuery } from '@tanstack/react-query';

import { queryKey, supabase } from '@/shared/lib';
import { uploadImage } from '@/shared/lib/supabase/upload-image';

import { CreateProfileDto } from './type';

export const createProfile = async ({ profileImage, ...rest }: CreateProfileDto) => {
  let imageUrl = null;
  if (profileImage?.length) {
    imageUrl = await uploadImage({ image: profileImage[0], storageName: 'profile' });
  }
  const { data, error } = await supabase
    .from('profile')
    .insert([
      {
        ...rest,
        profileImage: imageUrl,
      },
    ])
    .select('*')
    .single();
  if (error) {
    throw error;
  }

  return data;
};

const getProfile = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const { data } = await supabase.from('profile').select('*').eq('authId', user?.id).single();

  const error = userError;
  if (error) throw error;

  return data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: queryKey.currentUser,
    queryFn: getProfile,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
