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

-- Create contact_messages table
CREATE TABLE contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  website text,
  contact_reason text NOT NULL,
  monthly_volume text,
  current_processor text,
  message text
);

-- Enable Row Level Security (RLS) for contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_messages
CREATE POLICY "Allow authenticated users full access" ON contact_messages
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow anonymous insert" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous select" ON contact_messages
  FOR SELECT USING (true);

-- Create indexes for contact_messages
CREATE INDEX contact_messages_created_at_idx ON contact_messages(created_at DESC);
CREATE INDEX contact_messages_email_idx ON contact_messages(email);