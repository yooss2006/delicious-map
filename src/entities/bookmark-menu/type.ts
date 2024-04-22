import { Database } from '@/shared/lib/supabase/type';

export type BookmarkMenu = Database['public']['Tables']['bookmark_menu']['Row'];

export interface BookmarkMenuFormValue {
  name: string;
  rating: number;
  review: string;
}
