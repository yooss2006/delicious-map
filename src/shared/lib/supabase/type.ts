export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      bookmark: {
        Row: {
          created_at: string | null;
          group_id: string;
          id: number;
          image: string[] | null;
          lat: number | null;
          lng: number | null;
          manager_id: string;
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
          manager_id: string;
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
          manager_id?: string;
          merchant_id?: string;
          merchant_name?: string;
          rating?: number | null;
          review?: string | null;
          type?: Database['public']['Enums']['review_type'];
          visit_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_bookmark_manager_id_fkey';
            columns: ['manager_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_review_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'group';
            referencedColumns: ['id'];
          },
        ];
      };
      bookmark_menu: {
        Row: {
          bookmark_id: number;
          id: number;
          name: string;
          rating: number | null;
          review: string | null;
        };
        Insert: {
          bookmark_id: number;
          id?: number;
          name: string;
          rating?: number | null;
          review?: string | null;
        };
        Update: {
          bookmark_id?: number;
          id?: number;
          name?: string;
          rating?: number | null;
          review?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_bookmark_menu_bookmark_id_fkey';
            columns: ['bookmark_id'];
            isOneToOne: false;
            referencedRelation: 'bookmark';
            referencedColumns: ['id'];
          },
        ];
      };
      group: {
        Row: {
          created_at: string | null;
          creator_id: number;
          description: string | null;
          id: string;
          image: string | null;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          creator_id: number;
          description?: string | null;
          id?: string;
          image?: string | null;
          name: string;
        };
        Update: {
          created_at?: string | null;
          creator_id?: number;
          description?: string | null;
          id?: string;
          image?: string | null;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'groups_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['id'];
          },
        ];
      };
      group_invitation: {
        Row: {
          created_at: string;
          group_id: string;
          id: number;
          link: string;
        };
        Insert: {
          created_at?: string;
          group_id: string;
          id?: number;
          link?: string;
        };
        Update: {
          created_at?: string;
          group_id?: string;
          id?: number;
          link?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_group_invitation_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'group';
            referencedColumns: ['id'];
          },
        ];
      };
      group_member: {
        Row: {
          '\bcreated_at': string | null;
          'group_id': string;
          'id': number;
          'name': string;
          'profile_id': number;
        };
        Insert: {
          '\bcreated_at'?: string | null;
          'group_id': string;
          'id'?: number;
          'name': string;
          'profile_id': number;
        };
        Update: {
          '\bcreated_at'?: string | null;
          'group_id'?: string;
          'id'?: number;
          'name'?: string;
          'profile_id'?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'group_member_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'group';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'group_member_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['id'];
          },
        ];
      };
      profile: {
        Row: {
          auth_id: string | null;
          email: string;
          id: number;
          image: string | null;
          name: string;
        };
        Insert: {
          auth_id?: string | null;
          email: string;
          id?: number;
          image?: string | null;
          name: string;
        };
        Update: {
          auth_id?: string | null;
          email?: string;
          id?: number;
          image?: string | null;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profile_auth_id_fkey';
            columns: ['auth_id'];
            isOneToOne: false;
            referencedRelation: 'users';
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
