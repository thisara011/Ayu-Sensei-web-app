// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project credentials
const supabaseUrl = 'https://okcmluhfhmytuwcnddvs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rY21sdWhmaG15dHV3Y25kZHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMzA2OTMsImV4cCI6MjA0OTgwNjY5M30.OQvhZ4tEKmMOuLoCuTPadui-opcnaqPhj5ICx0j1cLc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
