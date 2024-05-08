import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGroupDetail } from '@/entities/group';
import { GroupDetailPageContent } from '@/widgets/group-detail';

export function GroupDetailPage() {
  const navigate = useNavigate();
  const { data: group, isLoading } = useGroupDetail();

  useEffect(() => {
    if (!group && !isLoading) {
      navigate('/group/create');
    }
  }, [group, navigate, isLoading]);

  return <GroupDetailPageContent />;
}
