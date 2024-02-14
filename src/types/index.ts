export interface Place {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}
