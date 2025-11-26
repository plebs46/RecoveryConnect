import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

export const supaUrl = Constants.expoConfig.extra.SUPABASE_URL;
export const anonKey = Constants.expoConfig.extra.SUPABASE_ANON_KEY;
export const googleKey = Constants.expoConfig.extra.GOOGLE_MAPS_KEY;

// Cliente Supabase
export const supabase = createClient(supaUrl, anonKey);
