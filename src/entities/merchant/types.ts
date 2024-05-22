export interface Merchant {
  merchantId: string;
  lat: number;
  lng: number;
  name: string;
  address: string;
  code: string;
}

export enum MerchantTypeEnum {
  Cafe = 'cafe',
  Restaurant = 'restaurant',
}
