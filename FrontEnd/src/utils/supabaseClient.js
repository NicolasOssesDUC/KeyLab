import { createClient } from '@supabase/supabase-js';

// URL y Key de tu proyecto (Normalmente irían en .env, pero las hardcodeamos por rapidez)
const SUPABASE_URL = 'https://pwnajivbudcwfcordblx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3bmFqaXZidWRjd2Zjb3JkYmx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2OTg2NzQsImV4cCI6MjA3ODI3NDY3NH0.Ra2yfxmPiLDaLJHvriVNqxTMULAZ9DiJqjBr92CV170';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
