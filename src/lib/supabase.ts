import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Lead = {
  id?: string
  created_at?: string
  business_location: string
  processing_volume: string
  business_name: string
  first_name: string
  last_name: string
  phone: string
  email: string
}

export type ContactMessage = {
  id?: string
  created_at?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  company?: string
  website?: string
  contact_reason: string
  monthly_volume?: string
  current_processor?: string
  message?: string
}