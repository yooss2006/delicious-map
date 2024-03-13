import { Box } from '@chakra-ui/react';
import React from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

type Props = {
  children: React.ReactNode;
};

type MapContext = {
  MapComponent: React.ReactNode;
  move: (option: MapOption) => void;
} | null;

type MapOption = {
  center: {
    lat: number;
    lng: number;
  };
  level?: number;
};

const MAP_OPTIONS: MapOption = {
  center: {
    lat: 37.5665,
    lng: 126.978,
  },
  level: 2,
};

const KakaoMapContext = React.createContext<MapContext>(null);

export function KakaoMapProvider({ children }: Props) {
  const [map, setMap] = React.useState<any>(null);
  const curentMarker = React.useRef<any>(null);
  const mapRef = React.useRef(null);

  const move = React.useCallback(
    ({ center, level = 3 }: MapOption) => {
      if (map) {
        const moveLatLng = new window.kakao.maps.LatLng(center.lat, center.lng);
        const curLevel = map.getLevel();
        if (curLevel !== level) {
          map.setLevel(level);
        }
        if (curentMarker.current) {
          curentMarker.current.setMap(null);
        }

        const marker = new window.kakao.maps.Marker({
          position: moveLatLng,
        });
        curentMarker.current = marker;
        map.panTo(moveLatLng);
        marker.setMap(map);
      }
    },
    [map]
  );

  React.useEffect(() => {
    if (window.kakao && !map && mapRef.current) {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(MAP_OPTIONS.center.lat, MAP_OPTIONS.center.lng),
          level: MAP_OPTIONS.level,
        });
        setMap(map);
      });
    }
  }, [map]);

  const MapComponent = React.useMemo(() => {
    return <Box style={{ width: '100%', height: '100%' }} ref={mapRef}></Box>;
  }, [mapRef]);

  const value = React.useMemo(() => ({ MapComponent, move }), [MapComponent, move]);

  return <KakaoMapContext.Provider value={value}>{children}</KakaoMapContext.Provider>;
}

export function useKakaoMap() {
  const context = React.useContext(KakaoMapContext);
  if (!context) {
    throw new Error('KakaoMapProvider를 찾을 수 없습니다.');
  }
  return context;
}
