import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = 'https://zhxsdecggoixrovtdfje.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoeHNkZWNnZ29peHJvdnRkZmplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NDEyNDgsImV4cCI6MjA0OTUxNzI0OH0.ixTd3iBu3o9CwBSD7_sAGKPSTJU_Zj99RBy9HjJ5i1I';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);