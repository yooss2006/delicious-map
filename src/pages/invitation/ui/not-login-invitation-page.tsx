import { Navigate } from 'react-router-dom';

import { useParsedLocation } from '@/shared/hooks';

export function NotLoginInvitationPage() {
  const { pathname } = useParsedLocation();
  return (
    <Navigate to={`/auth/login?nexturl=${import.meta.env.VITE_BASE_URL}${pathname}`} replace />
  );
}
