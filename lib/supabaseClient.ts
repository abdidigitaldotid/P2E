// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Ambil environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Lakukan pengecekan untuk memastikan variabel tidak kosong
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be defined in .env.local")
}

// Inisialisasi dan ekspor client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
