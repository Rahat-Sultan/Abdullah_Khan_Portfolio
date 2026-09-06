/**
 * Hand-written types matching the SQL schema in supabase/migrations/001_initial.sql
 * Replace with generated types once you run: npx supabase gen types typescript
 */

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          title: string;
          location: string | null;
          email: string | null;
          phone: string | null;
          greeting: string | null;
          intro: string | null;
          about: string[] | null;
          social_email: string | null;
          social_linkedin: string | null;
          social_instagram: string | null;
          resume_path: string | null;
          avatar_path: string | null;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "id" | "updated_at"> & {
          id?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };

      experience: {
        Row: {
          id: string;
          company: string;
          title: string;
          start_date: string;
          end_date: string | null;
          current: boolean;
          summary: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["experience"]["Row"],
          "id" | "created_at" | "updated_at"
        > & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database["public"]["Tables"]["experience"]["Insert"]>;
      };

      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string | null;
          summary: string | null;
          highlights: string[] | null;
          cta_label: string | null;
          /** Never returned in public queries — fetched only via server redirect route */
          destination_url: string | null;
          featured: boolean;
          published: boolean;
          sort_order: number;
          updated_at: string;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["projects"]["Row"],
          "id" | "created_at" | "updated_at"
        > & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };

      project_images: {
        Row: {
          id: string;
          project_id: string;
          storage_path: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["project_images"]["Row"], "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["project_images"]["Insert"]>;
      };

      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          message: string | null;
          read: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["contact_messages"]["Row"],
          "id" | "read" | "created_at"
        > & { id?: string; read?: boolean; created_at?: string };
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Insert"]>;
      };

      site_settings: {
        Row: {
          key: string;
          value: string;
          updated_at: string;
        };
        Insert: { key: string; value: string; updated_at?: string };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
      };
    };
  };
}

/** Public-safe project shape (destination_url intentionally omitted) */
export type PublicProject = Omit<
  Database["public"]["Tables"]["projects"]["Row"],
  "destination_url"
> & {
  images: string[]; // resolved public storage URLs
};

export type ExperienceRow = Database["public"]["Tables"]["experience"]["Row"];
export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"];
export type ProjectImage = Database["public"]["Tables"]["project_images"]["Row"];
