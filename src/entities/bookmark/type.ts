import { Database } from '@/shared/lib/supabase/type';

export type Bookmark = Database['public']['Tables']['bookmark']['Insert'];

// export interface BookmarkFormValues {
//   id: number;
//   merchantId: string;
//   merchantName: string;
//   groupId: string;
//   type: 'cafe' | 'restaurant';
//   image: Array<File>;
//   rating: number;
//   review: string;
//   visitDate: string;
//   lat: number;
//   lng: number;
//   createdAt?: string;
// }

export interface BookmarkFormValue {
  rating: number;
  visitDate: string;
  review: string;
  image: Array<File>;
}
