const {createClient} = require('@supabase/supabase-js')
const supabase = createClient(
    'https://vtoqlmnycrmhvyvjvovo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0b3FsbW55Y3JtaHZ5dmp2b3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MjEyMjIsImV4cCI6MjA3NjA5NzIyMn0.HSwRYvHgRdxVDU36o29yrLrtoZ-dv7TpgbzkVVV9Rh4'
)

module.exports = {supabase};