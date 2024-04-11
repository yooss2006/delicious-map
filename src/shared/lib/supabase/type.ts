export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      group_members: {
        Row: {
          group_id: string;
          joined_at: string | null;
          member_id: number;
          user_id: string;
        };
        Insert: {
          group_id: string;
          joined_at?: string | null;
          member_id?: number;
          user_id: string;
        };
        Update: {
          group_id?: string;
          joined_at?: string | null;
          member_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_group_members_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
        ];
      };
      groups: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          image_url: string | null;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          name: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          name?: string;
        };
        Relationships: [];
      };
      review: {
        Row: {
          created_at: string | null;
          group_id: string;
          id: number;
          image: string[] | null;
          lat: number | null;
          lng: number | null;
          merchant_id: string;
          merchant_name: string;
          rating: number | null;
          review: string | null;
          type: Database['public']['Enums']['review_type'];
          visit_date: string | null;
        };
        Insert: {
          created_at?: string | null;
          group_id: string;
          id?: number;
          image?: string[] | null;
          lat?: number | null;
          lng?: number | null;
          merchant_id: string;
          merchant_name: string;
          rating?: number | null;
          review?: string | null;
          type: Database['public']['Enums']['review_type'];
          visit_date?: string | null;
        };
        Update: {
          created_at?: string | null;
          group_id?: string;
          id?: number;
          image?: string[] | null;
          lat?: number | null;
          lng?: number | null;
          merchant_id?: string;
          merchant_name?: string;
          rating?: number | null;
          review?: string | null;
          type?: Database['public']['Enums']['review_type'];
          visit_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_review_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
        ];
      };
      review_menu: {
        Row: {
          id: number;
          name: string;
          rating: number | null;
          review: string | null;
          review_id: number;
        };
        Insert: {
          id?: number;
          name: string;
          rating?: number | null;
          review?: string | null;
          review_id: number;
        };
        Update: {
          id?: number;
          name?: string;
          rating?: number | null;
          review?: string | null;
          review_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_merchants';
            columns: ['review_id'];
            isOneToOne: false;
            referencedRelation: 'review';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_review_menu_review_id_fkey';
            columns: ['review_id'];
            isOneToOne: false;
            referencedRelation: 'review';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      review_type: 'cafe' | 'restaurant';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
