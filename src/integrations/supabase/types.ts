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
          config: Json | null
          created_at: string | null
          id: string
          is_leader: boolean | null
          name: string
          priority: Database["public"]["Enums"]["priority_level"]
          role: Database["public"]["Enums"]["agent_role"]
          updated_at: string | null
          version: string
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          id?: string
          is_leader?: boolean | null
          name: string
          priority?: Database["public"]["Enums"]["priority_level"]
          role: Database["public"]["Enums"]["agent_role"]
          updated_at?: string | null
          version?: string
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          id?: string
          is_leader?: boolean | null
          name?: string
          priority?: Database["public"]["Enums"]["priority_level"]
          role?: Database["public"]["Enums"]["agent_role"]
          updated_at?: string | null
          version?: string
        }
        Relationships: []
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_license_key: { Args: never; Returns: string }
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
      agent_status:
        | "idle"
        | "running"
        | "paused"
        | "error"
        | "recovering"
        | "terminated"
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
      ],
      agent_status: [
        "idle",
        "running",
        "paused",
        "error",
        "recovering",
        "terminated",
      ],
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
