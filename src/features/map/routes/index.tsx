import GoogleMap from '@/features/map/components/GoogleMap';

export function MapPage() {
  return (
    <div>
      <h1>지도</h1>
      <GoogleMap style={{ width: '100%', height: '400px' }} />
    </div>
  );
}
