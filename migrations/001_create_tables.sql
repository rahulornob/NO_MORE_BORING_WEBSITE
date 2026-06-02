-- Create websites table
CREATE TABLE IF NOT EXISTS websites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  category VARCHAR(100),
  description TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_websites_created_at ON websites(createdAt DESC);
CREATE INDEX IF NOT EXISTS idx_websites_category ON websites(category);

-- Enable RLS (Row Level Security) - optional but recommended
ALTER TABLE websites ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous read access
CREATE POLICY "Allow public read access" ON websites
  FOR SELECT USING (true);

-- Create policy to allow authenticated admin insert
CREATE POLICY "Allow authenticated insert" ON websites
  FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated admin update
CREATE POLICY "Allow authenticated update" ON websites
  FOR UPDATE USING (true);

-- Create policy to allow authenticated admin delete
CREATE POLICY "Allow authenticated delete" ON websites
  FOR DELETE USING (true);
