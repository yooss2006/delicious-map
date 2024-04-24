import { useQuery } from '@tanstack/react-query';

import { queryKey, supabase } from '@/shared/lib';
import { uploadImage } from '@/shared/lib/supabase/upload-image';

import { CreateProfileDto, EditProfileDto } from './type';

export const createProfile = async ({ profileImage, authId, ...rest }: CreateProfileDto) => {
  let imageUrl = null;
  if (profileImage?.length) {
    imageUrl = await uploadImage({ image: profileImage[0], storageName: 'profile' });
  }
  const { data, error } = await supabase
    .from('profile')
    .insert([
      {
        ...rest,
        auth_id: authId,
        profile_image: imageUrl,
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
  if (!user) return;

  if (userError) throw userError;

  if (user) {
    const { data } = await supabase.from('profile').select('*').eq('auth_id', user.id).single();

    return data;
  }
};

export const useProfile = () => {
  return useQuery({
    queryKey: queryKey.currentUser,
    queryFn: getProfile,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const getProfileByEmail = async (email: string) => {
  const { data } = await supabase.from('profile').select('*').eq('email', email).single();

  return data;
};

export const editProfileByEmail = async ([email, values]: [
  email: string,
  values: EditProfileDto,
]) => {
  const { data, error } = await supabase
    .from('profile')
    .update({ profile_image: values.profileImage, name: values.name })
    .eq('email', email)
    .select('*');

  if (error) throw error;

  return data;
};
