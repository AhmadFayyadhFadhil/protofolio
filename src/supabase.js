import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://tcmlplziwbnnbvgqftvv.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbWxwbHppd2JubmJ2Z3FmdHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MDI2MDMsImV4cCI6MjA5MTI3ODYwM30.w-HdKUzFVAkX-nZ6uY9VmdTBgFyK_CFLmMO5rZf0g0Q';

export const supabase = createClient(supabaseUrl, supabaseKey);
