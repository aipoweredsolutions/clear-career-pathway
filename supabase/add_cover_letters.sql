-- Cover letters table
CREATE TABLE IF NOT EXISTS cover_letters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  recipient_name TEXT,
  recipient_title TEXT,
  company_name TEXT,
  company_address TEXT,
  job_title TEXT,
  job_description TEXT,
  tone TEXT DEFAULT 'formal',
  content TEXT,
  UNIQUE(document_id)
);

-- RLS for cover letters
ALTER TABLE cover_letters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own cover letters" ON cover_letters
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = cover_letters.document_id
      AND documents.user_id = auth.uid()
    )
  );

-- Create index
CREATE INDEX IF NOT EXISTS idx_cover_letters_document_id ON cover_letters(document_id);
