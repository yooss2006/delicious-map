import { useContext } from 'react';

import { KakaoMapContext } from '../ui';

export function useKakaoMap() {
  const context = useContext(KakaoMapContext);
  if (!context) {
    throw new Error('KakaoMapProvider를 찾을 수 없습니다.');
  }
  return context;
}
