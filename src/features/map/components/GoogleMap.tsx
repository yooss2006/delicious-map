import React from 'react';

type Props = google.maps.MapOptions & {
  style: Record<string, string>;
};

const initalCenter = { lat: 37.5665, lng: 126.978 }; //서울
const initialZoom = 10; //초기 줌 레벨

export default function GoogleMap({ style, center = initalCenter, zoom = initialZoom }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
        })
      );
    }
  }, [ref, map]);

  return <div id="map" ref={ref} style={style} />;
}
