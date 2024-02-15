import { useKakaoMap } from '@/lib/kakao-map';

export default function Map() {
  const { MapComponent } = useKakaoMap();

  return <>{MapComponent}</>;
}
