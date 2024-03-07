export interface Place {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  place_url: string;
  distance: string;
  x: string;
  y: string;
}

export interface MerchantCardType {
  merchantId: string;
  lat: number;
  lng: number;
  name: string;
  address: string;
  code: string;
}
