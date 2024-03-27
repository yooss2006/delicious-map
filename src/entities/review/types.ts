export interface Review {
  id: number;
  merchantId: string;
  merchantName: string;
  groupId: string;
  type: 'cafe' | 'restaurant';
  image: Array<File>;
  rating: number;
  review: string;
  visitDate: string;
  lat: number;
  lng: number;
  createdAt: string;
}
