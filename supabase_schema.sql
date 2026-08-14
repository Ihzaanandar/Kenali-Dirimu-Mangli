-- SQL Schema for Kenali Dirimu Psychological Workbook
-- Jalankan query ini di Supabase SQL Editor Anda untuk membuat tabel otomatis.

-- 1. Tabel Users
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'student',
  display_name TEXT NOT NULL,
  age INT,
  pin_hash TEXT,
  class_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel Workbooks
CREATE TABLE IF NOT EXISTS public.workbooks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  status TEXT DEFAULT 'published',
  version TEXT DEFAULT '1.0',
  created_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabel Sections
CREATE TABLE IF NOT EXISTS public.sections (
  id TEXT PRIMARY KEY,
  workbook_id TEXT REFERENCES public.workbooks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INT NOT NULL DEFAULT 1
);

-- 4. Tabel Questions
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  section_id TEXT REFERENCES public.sections(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  question_text TEXT NOT NULL,
  helper_text TEXT,
  required BOOLEAN DEFAULT true,
  order_index INT NOT NULL DEFAULT 1
);

-- 5. Tabel Sessions
CREATE TABLE IF NOT EXISTS public.sessions (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  workbook_id TEXT REFERENCES public.workbooks(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'in_progress'
);

-- 6. Tabel Responses
CREATE TABLE IF NOT EXISTS public.responses (
  id TEXT PRIMARY KEY,
  session_id TEXT REFERENCES public.sessions(id) ON DELETE CASCADE,
  student_id TEXT REFERENCES public.users(id) ON DELETE CASCADE,
  question_id TEXT REFERENCES public.questions(id) ON DELETE CASCADE,
  answer_text TEXT,
  answer_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
