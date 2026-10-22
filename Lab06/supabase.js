import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://ylkzvmidhlvhsslyxluu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsa3p2bWlkaGx2aHNzbHl4bHV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2Mjk4MjksImV4cCI6MjEwODIwNTgyOX0.b8AqXDewVYEZNt1qR0mce4L9Lt59G-s9VqW6Zg8z8t0";

export const supabase = createClient(supabaseUrl, supabaseKey);