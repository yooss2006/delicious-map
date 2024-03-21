export interface Merchant {
  id: number;
  merchant_id: string;
  merchant_name: string;
  photo: Array<File>;
  rating: number;
  review: string;
  visit_date: string;
  lat: number;
  lng: number;
  created_at: string;
  menu: [];
}

export interface Menu {
  id: number;
  merchant_id: string;
  name: string;
  rating: number;
  price: number;
  photo: Array<File>;
  review: string;
}
