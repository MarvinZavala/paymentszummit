-- Create leads table
CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  business_location text NOT NULL,
  processing_volume text NOT NULL,
  business_name text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read/write for authenticated users (for admin dashboard)
CREATE POLICY "Allow authenticated users full access" ON leads
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policy to allow insert for anyone (for the public form)
CREATE POLICY "Allow anonymous insert" ON leads
  FOR INSERT WITH CHECK (true);

-- Create policy to allow select for anyone (optional, remove if you don't want public read access)
CREATE POLICY "Allow anonymous select" ON leads
  FOR SELECT USING (true);

-- Create index for better performance
CREATE INDEX leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX leads_email_idx ON leads(email);