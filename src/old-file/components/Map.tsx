import { useKakaoMap } from '@/old-file/lib/kakao-map';

export default function Map() {
  const { MapComponent } = useKakaoMap();

  return <>{MapComponent}</>;
}
