import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { Group } from '@/entities/group';
import { queryClient, queryKey, supabase } from '@/shared/lib';
import { uploadImage } from '@/shared/lib/supabase/upload-image';

export const editGroup = async ({
  groupId,
  name,
  profileImage,
  imageUrl,
  description,
}: Group & { groupId: string }) => {
  const uploadedImage = profileImage.length > 0 && profileImage?.[0];
  let uploadImageUrl = imageUrl;
  if (uploadedImage) {
    uploadImageUrl = await uploadImage({ image: uploadedImage, storageName: 'group' });
  }
  return await updateGroupFn({ name, description, imageUrl: uploadImageUrl as string, groupId });
};

const updateGroupFn = async ({
  groupId,
  name,
  description,
  imageUrl,
}: {
  groupId: string;
  name: string;
  description: string;
  imageUrl: string;
}) => {
  const { data, error } = await supabase
    .from('groups')
    .update({ name, description, image_url: imageUrl })
    .eq('id', groupId)
    .select();
  if (error) {
    throw error;
  }
  return data[0];
};

export const useEditGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: editGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.groupDetail(id) });
      navigate(`/group/${id}`);
    },
  });
};
