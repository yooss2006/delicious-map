import { useKakaoMap } from '../hooks';

export function Map() {
  const { MapComponent } = useKakaoMap();

  return <>{MapComponent}</>;
}
