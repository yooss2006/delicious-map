import { useKakaoMap } from '@/lib/kakao-map';

export default function KakaoMap() {
  const { MapComponent } = useKakaoMap();

  return <>{MapComponent}</>;
}
