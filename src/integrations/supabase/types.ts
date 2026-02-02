export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      agent_executions: {
        Row: {
          agent_id: string
          completed_at: string | null
          cost: number | null
          created_at: string | null
          error: string | null
          id: string
          input: Json | null
          latency_ms: number | null
          output: Json | null
          retry_count: number | null
          started_at: string | null
          status: string
          task_type: string
        }
        Insert: {
          agent_id: string
          completed_at?: string | null
          cost?: number | null
          created_at?: string | null
          error?: string | null
          id?: string
          input?: Json | null
          latency_ms?: number | null
          output?: Json | null
          retry_count?: number | null
          started_at?: string | null
          status?: string
          task_type: string
        }
        Update: {
          agent_id?: string
          completed_at?: string | null
          cost?: number | null
          created_at?: string | null
          error?: string | null
          id?: string
          input?: Json | null
          latency_ms?: number | null
          output?: Json | null
          retry_count?: number | null
          started_at?: string | null
          status?: string
          task_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_executions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_memory: {
        Row: {
          agent_id: string
          created_at: string
          embedding_json: Json | null
          expires_at: string | null
          id: string
          key: string | null
          memory_type: string
          payload: Json
          ttl_seconds: number | null
          updated_at: string
        }
        Insert: {
          agent_id: string
          created_at?: string
          embedding_json?: Json | null
          expires_at?: string | null
          id?: string
          key?: string | null
          memory_type: string
          payload?: Json
          ttl_seconds?: number | null
          updated_at?: string
        }
        Update: {
          agent_id?: string
          created_at?: string
          embedding_json?: Json | null
          expires_at?: string | null
          id?: string
          key?: string | null
          memory_type?: string
          payload?: Json
          ttl_seconds?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_memory_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_publications: {
        Row: {
          agent_id: string
          channel: string
          content: Json
          created_at: string
          id: string
          published_at: string | null
          status: string
        }
        Insert: {
          agent_id: string
          channel: string
          content?: Json
          created_at?: string
          id?: string
          published_at?: string | null
          status?: string
        }
        Update: {
          agent_id?: string
          channel?: string
          content?: Json
          created_at?: string
          id?: string
          published_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_publications_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_states: {
        Row: {
          agent_id: string
          created_at: string | null
          current_task: string | null
          error_message: string | null
          id: string
          last_heartbeat: string | null
          memory: Json | null
          metrics: Json | null
          status: Database["public"]["Enums"]["agent_status"]
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          current_task?: string | null
          error_message?: string | null
          id?: string
          last_heartbeat?: string | null
          memory?: Json | null
          metrics?: Json | null
          status?: Database["public"]["Enums"]["agent_status"]
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          current_task?: string | null
          error_message?: string | null
          id?: string
          last_heartbeat?: string | null
          memory?: Json | null
          metrics?: Json | null
          status?: Database["public"]["Enums"]["agent_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_states_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          confidence_score: number | null
          config: Json | null
          created_at: string | null
          id: string
          is_leader: boolean | null
          max_parallel: number | null
          name: string
          priority: Database["public"]["Enums"]["priority_level"]
          rate_limit: number | null
          replicated_from: string | null
          replication_count: number | null
          role: Database["public"]["Enums"]["agent_role"]
          tenant_id: string | null
          trust_score: number | null
          updated_at: string | null
          version: string
        }
        Insert: {
          confidence_score?: number | null
          config?: Json | null
          created_at?: string | null
          id?: string
          is_leader?: boolean | null
          max_parallel?: number | null
          name: string
          priority?: Database["public"]["Enums"]["priority_level"]
          rate_limit?: number | null
          replicated_from?: string | null
          replication_count?: number | null
          role: Database["public"]["Enums"]["agent_role"]
          tenant_id?: string | null
          trust_score?: number | null
          updated_at?: string | null
          version?: string
        }
        Update: {
          confidence_score?: number | null
          config?: Json | null
          created_at?: string | null
          id?: string
          is_leader?: boolean | null
          max_parallel?: number | null
          name?: string
          priority?: Database["public"]["Enums"]["priority_level"]
          rate_limit?: number | null
          replicated_from?: string | null
          replication_count?: number | null
          role?: Database["public"]["Enums"]["agent_role"]
          tenant_id?: string | null
          trust_score?: number | null
          updated_at?: string | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "agents_replicated_from_fkey"
            columns: ["replicated_from"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          rate_limit: number | null
          revoked_at: string | null
          scopes: string[] | null
          tenant_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          rate_limit?: number | null
          revoked_at?: string | null
          scopes?: string[] | null
          tenant_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          rate_limit?: number | null
          revoked_at?: string | null
          scopes?: string[] | null
          tenant_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          actor_type: string | null
          created_at: string | null
          id: string
          ip_address: unknown
          new_values: Json | null
          old_values: Json | null
          resource_id: string | null
          resource_type: string
          tenant_id: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_type?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type: string
          tenant_id?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_type?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type?: string
          tenant_id?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_accounts: {
        Row: {
          balance_credits: number | null
          billing_email: string | null
          created_at: string | null
          id: string
          period_end: string | null
          period_start: string | null
          plan: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tenant_id: string | null
          updated_at: string | null
          usage_this_period: Json | null
        }
        Insert: {
          balance_credits?: number | null
          billing_email?: string | null
          created_at?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          plan?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          usage_this_period?: Json | null
        }
        Update: {
          balance_credits?: number | null
          billing_email?: string | null
          created_at?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          plan?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          usage_this_period?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_accounts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      content: {
        Row: {
          active: boolean | null
          body: string | null
          click_count: number | null
          created_at: string | null
          cta_url: string | null
          id: string
          name: string
          open_count: number | null
          send_count: number | null
          subject: string | null
          target_segment: string[] | null
          target_stage: string[] | null
          tenant_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          body?: string | null
          click_count?: number | null
          created_at?: string | null
          cta_url?: string | null
          id?: string
          name: string
          open_count?: number | null
          send_count?: number | null
          subject?: string | null
          target_segment?: string[] | null
          target_stage?: string[] | null
          tenant_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          body?: string | null
          click_count?: number | null
          created_at?: string | null
          cta_url?: string | null
          id?: string
          name?: string
          open_count?: number | null
          send_count?: number | null
          subject?: string | null
          target_segment?: string[] | null
          target_stage?: string[] | null
          tenant_id?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          created_at: string | null
          email: string
          id: string
          status: string | null
          stripe_customer_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          status?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          status?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      decisions: {
        Row: {
          agent_id: string
          confidence_score: number | null
          context: Json | null
          created_at: string | null
          decision_type: string
          executed_at: string | null
          id: string
          options: Json | null
          reasoning: string | null
          selected_option: string | null
          status: Database["public"]["Enums"]["decision_status"]
        }
        Insert: {
          agent_id: string
          confidence_score?: number | null
          context?: Json | null
          created_at?: string | null
          decision_type: string
          executed_at?: string | null
          id?: string
          options?: Json | null
          reasoning?: string | null
          selected_option?: string | null
          status?: Database["public"]["Enums"]["decision_status"]
        }
        Update: {
          agent_id?: string
          confidence_score?: number | null
          context?: Json | null
          created_at?: string | null
          decision_type?: string
          executed_at?: string | null
          id?: string
          options?: Json | null
          reasoning?: string | null
          selected_option?: string | null
          status?: Database["public"]["Enums"]["decision_status"]
        }
        Relationships: [
          {
            foreignKeyName: "decisions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          event_id: string
          event_type: string
          id: string
          payload: Json
          priority: Database["public"]["Enums"]["priority_level"] | null
          processed: boolean | null
          processed_at: string | null
          result: Json | null
          retry_count: number | null
          source: string
          source_agent_id: string | null
          target_agent_id: string | null
          tenant_id: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          event_type: string
          id?: string
          payload?: Json
          priority?: Database["public"]["Enums"]["priority_level"] | null
          processed?: boolean | null
          processed_at?: string | null
          result?: Json | null
          retry_count?: number | null
          source: string
          source_agent_id?: string | null
          target_agent_id?: string | null
          tenant_id?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          event_type?: string
          id?: string
          payload?: Json
          priority?: Database["public"]["Enums"]["priority_level"] | null
          processed?: boolean | null
          processed_at?: string | null
          result?: Json | null
          retry_count?: number | null
          source?: string
          source_agent_id?: string | null
          target_agent_id?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_source_agent_id_fkey"
            columns: ["source_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_target_agent_id_fkey"
            columns: ["target_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_events: {
        Row: {
          created_at: string | null
          event_category: string | null
          event_name: string
          id: string
          lead_id: string | null
          page_url: string | null
          properties: Json | null
          session_id: string | null
          tenant_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_category?: string | null
          event_name: string
          id?: string
          lead_id?: string | null
          page_url?: string | null
          properties?: Json | null
          session_id?: string | null
          tenant_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_category?: string | null
          event_name?: string
          id?: string
          lead_id?: string | null
          page_url?: string | null
          properties?: Json | null
          session_id?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funnel_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funnel_events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          converted_at: string | null
          created_at: string | null
          email: string
          engagement_score: number | null
          first_seen_at: string | null
          id: string
          intent_score: number | null
          last_activity_at: string | null
          metadata: Json | null
          name: string | null
          objection_tags: string[] | null
          phone: string | null
          readiness_score: number | null
          segment: string | null
          source: string | null
          status: string | null
          tenant_id: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          converted_at?: string | null
          created_at?: string | null
          email: string
          engagement_score?: number | null
          first_seen_at?: string | null
          id?: string
          intent_score?: number | null
          last_activity_at?: string | null
          metadata?: Json | null
          name?: string | null
          objection_tags?: string[] | null
          phone?: string | null
          readiness_score?: number | null
          segment?: string | null
          source?: string | null
          status?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          converted_at?: string | null
          created_at?: string | null
          email?: string
          engagement_score?: number | null
          first_seen_at?: string | null
          id?: string
          intent_score?: number | null
          last_activity_at?: string | null
          metadata?: Json | null
          name?: string | null
          objection_tags?: string[] | null
          phone?: string | null
          readiness_score?: number | null
          segment?: string | null
          source?: string | null
          status?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      licenses: {
        Row: {
          created_at: string | null
          customer_id: string | null
          expires_at: string | null
          id: string
          license_key: string
          product_id: string | null
          status: string | null
          updated_at: string | null
          usage_count: number | null
          usage_limit: number | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          expires_at?: string | null
          id?: string
          license_key: string
          product_id?: string | null
          status?: string | null
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          expires_at?: string | null
          id?: string
          license_key?: string
          product_id?: string | null
          status?: string | null
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "licenses_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          active: boolean | null
          conditions: Json | null
          created_at: string | null
          cta_text: string | null
          description: string | null
          discount_percent: number | null
          headline: string | null
          id: string
          name: string
          priority: number | null
          product_id: string | null
          tenant_id: string | null
          trial_days: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          conditions?: Json | null
          created_at?: string | null
          cta_text?: string | null
          description?: string | null
          discount_percent?: number | null
          headline?: string | null
          id?: string
          name: string
          priority?: number | null
          product_id?: string | null
          tenant_id?: string | null
          trial_days?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          conditions?: Json | null
          created_at?: string | null
          cta_text?: string | null
          description?: string | null
          discount_percent?: number | null
          headline?: string | null
          id?: string
          name?: string
          priority?: number | null
          product_id?: string | null
          tenant_id?: string | null
          trial_days?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          currency: string | null
          customer_id: string | null
          discount: number | null
          fulfilled_at: string | null
          id: string
          lead_id: string | null
          metadata: Json | null
          offer_id: string | null
          order_number: string
          paid_at: string | null
          payment_method: string | null
          product_id: string | null
          status: string | null
          stripe_payment_id: string | null
          subtotal: number
          tenant_id: string | null
          total: number
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          discount?: number | null
          fulfilled_at?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          offer_id?: string | null
          order_number: string
          paid_at?: string | null
          payment_method?: string | null
          product_id?: string | null
          status?: string | null
          stripe_payment_id?: string | null
          subtotal?: number
          tenant_id?: string | null
          total?: number
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          discount?: number | null
          fulfilled_at?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          offer_id?: string | null
          order_number?: string
          paid_at?: string | null
          payment_method?: string | null
          product_id?: string | null
          status?: string | null
          stripe_payment_id?: string | null
          subtotal?: number
          tenant_id?: string | null
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          agent_name: string
          billing_type: string
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          name: string
          price: number
          product_id: string
          stripe_price_id: string | null
          stripe_product_id: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          agent_name: string
          billing_type: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          name: string
          price: number
          product_id: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          agent_name?: string
          billing_type?: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number
          product_id?: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          tenant_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          tenant_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          tenant_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          browser: string | null
          country: string | null
          device_type: string | null
          duration_seconds: number | null
          ended_at: string | null
          id: string
          landing_page: string | null
          lead_id: string | null
          page_views: number | null
          referrer: string | null
          session_id: string
          started_at: string | null
          tenant_id: string | null
        }
        Insert: {
          browser?: string | null
          country?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          landing_page?: string | null
          lead_id?: string | null
          page_views?: number | null
          referrer?: string | null
          session_id: string
          started_at?: string | null
          tenant_id?: string | null
        }
        Update: {
          browser?: string | null
          country?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          landing_page?: string | null
          lead_id?: string | null
          page_views?: number | null
          referrer?: string | null
          session_id?: string
          started_at?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_reason: string | null
          cancelled_at: string | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          customer_id: string | null
          id: string
          ltv: number | null
          mrr: number | null
          plan: string
          product_id: string | null
          status: string | null
          stripe_subscription_id: string | null
          tenant_id: string | null
          trial_ends_at: string | null
          updated_at: string | null
        }
        Insert: {
          cancel_reason?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: string | null
          id?: string
          ltv?: number | null
          mrr?: number | null
          plan: string
          product_id?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          tenant_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Update: {
          cancel_reason?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: string | null
          id?: string
          ltv?: number | null
          mrr?: number | null
          plan?: string
          product_id?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          tenant_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      swarm_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          payload: Json | null
          priority: Database["public"]["Enums"]["priority_level"] | null
          processed: boolean | null
          processed_at: string | null
          source_agent_id: string | null
          target_agent_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          payload?: Json | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          processed?: boolean | null
          processed_at?: string | null
          source_agent_id?: string | null
          target_agent_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          payload?: Json | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          processed?: boolean | null
          processed_at?: string | null
          source_agent_id?: string | null
          target_agent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "swarm_events_source_agent_id_fkey"
            columns: ["source_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swarm_events_target_agent_id_fkey"
            columns: ["target_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      swarm_logs: {
        Row: {
          agent_id: string | null
          created_at: string
          event_type: string
          id: string
          log_id: string
          message: string
          payload: Json | null
          severity: string
          task_id: string | null
        }
        Insert: {
          agent_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          log_id: string
          message: string
          payload?: Json | null
          severity?: string
          task_id?: string | null
        }
        Update: {
          agent_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          log_id?: string
          message?: string
          payload?: Json | null
          severity?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "swarm_logs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swarm_logs_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      swarm_metrics: {
        Row: {
          agent_id: string | null
          id: string
          metric_type: string
          recorded_at: string | null
          tags: Json | null
          unit: string | null
          value: number
        }
        Insert: {
          agent_id?: string | null
          id?: string
          metric_type: string
          recorded_at?: string | null
          tags?: Json | null
          unit?: string | null
          value: number
        }
        Update: {
          agent_id?: string | null
          id?: string
          metric_type?: string
          recorded_at?: string | null
          tags?: Json | null
          unit?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "swarm_metrics_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          agent_id: string | null
          completed_at: string | null
          confidence_score: number | null
          created_at: string
          description: string | null
          error: string | null
          id: string
          input: Json | null
          output: Json | null
          parent_task_id: string | null
          priority: Database["public"]["Enums"]["priority_level"]
          started_at: string | null
          state: string
          task_id: string
          task_type: string
          updated_at: string
        }
        Insert: {
          agent_id?: string | null
          completed_at?: string | null
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          error?: string | null
          id?: string
          input?: Json | null
          output?: Json | null
          parent_task_id?: string | null
          priority?: Database["public"]["Enums"]["priority_level"]
          started_at?: string | null
          state?: string
          task_id: string
          task_type: string
          updated_at?: string
        }
        Update: {
          agent_id?: string | null
          completed_at?: string | null
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          error?: string | null
          id?: string
          input?: Json | null
          output?: Json | null
          parent_task_id?: string | null
          priority?: Database["public"]["Enums"]["priority_level"]
          started_at?: string | null
          state?: string
          task_id?: string
          task_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string | null
          id: string
          max_agents: number | null
          max_executions_per_day: number | null
          name: string
          plan: string
          settings: Json | null
          slug: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          max_agents?: number | null
          max_executions_per_day?: number | null
          name: string
          plan?: string
          settings?: Json | null
          slug: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          max_agents?: number | null
          max_executions_per_day?: number | null
          name?: string
          plan?: string
          settings?: Json | null
          slug?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      touchpoints: {
        Row: {
          channel: string
          content_id: string | null
          created_at: string | null
          event_type: string
          id: string
          lead_id: string | null
          metadata: Json | null
          offer_id: string | null
          tenant_id: string | null
        }
        Insert: {
          channel: string
          content_id?: string | null
          created_at?: string | null
          event_type: string
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          offer_id?: string | null
          tenant_id?: string | null
        }
        Update: {
          channel?: string
          content_id?: string | null
          created_at?: string | null
          event_type?: string
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          offer_id?: string | null
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "touchpoints_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "touchpoints_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          customer_id: string | null
          id: string
          license_id: string | null
          metadata: Json | null
          product_id: string | null
          status: string | null
          stripe_payment_intent_id: string | null
          stripe_subscription_id: string | null
          tx_id: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          id?: string
          license_id?: string | null
          metadata?: Json | null
          product_id?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_subscription_id?: string | null
          tx_id: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          id?: string
          license_id?: string | null
          metadata?: Json | null
          product_id?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_subscription_id?: string | null
          tx_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      usage: {
        Row: {
          created_at: string | null
          endpoint: string | null
          id: string
          license_id: string | null
          requests: number | null
          response_time_ms: number | null
        }
        Insert: {
          created_at?: string | null
          endpoint?: string | null
          id?: string
          license_id?: string | null
          requests?: number | null
          response_time_ms?: number | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string | null
          id?: string
          license_id?: string | null
          requests?: number | null
          response_time_ms?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_records: {
        Row: {
          agent_id: string | null
          execution_id: string | null
          id: string
          metadata: Json | null
          metric_type: string
          quantity: number
          recorded_at: string | null
          tenant_id: string | null
          unit_cost: number | null
        }
        Insert: {
          agent_id?: string | null
          execution_id?: string | null
          id?: string
          metadata?: Json | null
          metric_type: string
          quantity?: number
          recorded_at?: string | null
          tenant_id?: string | null
          unit_cost?: number | null
        }
        Update: {
          agent_id?: string | null
          execution_id?: string | null
          id?: string
          metadata?: Json | null
          metric_type?: string
          quantity?: number
          recorded_at?: string | null
          tenant_id?: string | null
          unit_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_records_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_records_execution_id_fkey"
            columns: ["execution_id"]
            isOneToOne: false
            referencedRelation: "agent_executions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_records_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          granted_at: string
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_license_key: { Args: never; Returns: string }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      agent_role:
        | "orchestrator"
        | "event_router"
        | "decision_engine"
        | "policy_guard"
        | "retry_recovery"
        | "scheduler"
        | "insights_generator"
        | "performance_optimizer"
        | "anomaly_detector"
        | "resource_allocator"
        | "planner"
        | "executor"
        | "validator"
        | "optimizer"
        | "watchdog"
        | "publisher"
        | "observer"
        | "sentinel"
        | "replicator"
        | "attractor"
        | "qualifier"
        | "nurturer"
        | "closer"
        | "retention"
      agent_status:
        | "idle"
        | "running"
        | "paused"
        | "error"
        | "recovering"
        | "terminated"
        | "thinking"
        | "learning"
        | "replicating"
      app_role: "admin" | "operator" | "client" | "viewer"
      decision_status:
        | "pending"
        | "approved"
        | "rejected"
        | "executed"
        | "failed"
      priority_level: "low" | "medium" | "high" | "critical"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agent_role: [
        "orchestrator",
        "event_router",
        "decision_engine",
        "policy_guard",
        "retry_recovery",
        "scheduler",
        "insights_generator",
        "performance_optimizer",
        "anomaly_detector",
        "resource_allocator",
        "planner",
        "executor",
        "validator",
        "optimizer",
        "watchdog",
        "publisher",
        "observer",
        "sentinel",
        "replicator",
        "attractor",
        "qualifier",
        "nurturer",
        "closer",
        "retention",
      ],
      agent_status: [
        "idle",
        "running",
        "paused",
        "error",
        "recovering",
        "terminated",
        "thinking",
        "learning",
        "replicating",
      ],
      app_role: ["admin", "operator", "client", "viewer"],
      decision_status: [
        "pending",
        "approved",
        "rejected",
        "executed",
        "failed",
      ],
      priority_level: ["low", "medium", "high", "critical"],
    },
  },
} as const
