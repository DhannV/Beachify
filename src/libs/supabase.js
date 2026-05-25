import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Ganti URL dan Anon Key di bawah ini dengan milik project Beachify Anda
// yang bisa diambil dari menu Project Settings > API di dashboard Supabase.
const supabaseUrl = "https://igpjqlgaextzrnaofxmk.supabase.co";
const supabaseAnonKey = "sb_publishable_BFTlKFO-CAY0QOF3NVrFtg_zV-HEvTG";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
