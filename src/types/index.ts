export type RoleType = 'student' | 'psychologist' | 'admin';

export interface UserProfileData {
  displayName?: string;
  comfortableWhen?: string;
  smallHappiness?: string;
  wantToLearn?: string;
  wantToChange?: string;
  wantToMaintain?: string;
  futureLetter?: string;
  updatedAt?: string;
}

export interface MoodEntry {
  id: string;
  studentId: string;
  mood: string; // e.g. 'Bahagia', 'Tenang', 'Bersyukur', 'Sedih', 'Cemas', 'Marah', 'Biasa saja', 'Campur aduk'
  timestamp: string;
}

export interface User {
  id: string;
  role: RoleType;
  displayName: string;
  age?: number;
  className?: string;
  pinHash?: string;
  createdAt: string;
  profileData?: UserProfileData;
  moodEntries?: MoodEntry[];
  favorites?: string[]; // Array of question IDs marked as favorite
}

export type QuestionType =
  | 'single_choice'
  | 'multiple_choice'
  | 'likert_scale'
  | 'emoji_selector'
  | 'short_text'
  | 'long_text'
  | 'rating'
  | 'yes_no';

export type QuestionThemeStyle =
  | 'default'
  | 'pencil_sketch'
  | 'bullying_ink'
  | 'mood_pastel'
  | 'school_notebook'
  | 'social_media';

export interface QuestionOption {
  id: string;
  questionId: string;
  label: string;
  value: string;
  icon?: string;
  orderIndex: number;
}

export interface Question {
  id: string;
  sectionId: string;
  type: QuestionType;
  questionText: string;
  helperText?: string;
  imageUrl?: string;
  themeStyle?: QuestionThemeStyle;
  required: boolean;
  orderIndex: number;
  options?: QuestionOption[];
}

export interface Section {
  id: string;
  workbookId: string;
  title: string;
  description: string;
  icon?: string;
  orderIndex: number;
  questions: Question[];
}

export interface Workbook {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  coverImageUrl?: string;
  status: 'draft' | 'published' | 'archived';
  version: string;
  createdBy: string;
  createdAt: string;
  sections: Section[];
}

export interface ResponseItem {
  id: string;
  sessionId: string;
  studentId: string;
  questionId: string;
  answerText?: string;
  answerJson?: any;
  createdAt: string;
}

export interface SessionProgress {
  sessionId: string;
  currentSectionId: string;
  currentQuestionId: string;
  completedQuestions: number;
  totalQuestions: number;
  percentage: number;
  updatedAt: string;
}

export interface Session {
  id: string;
  studentId: string;
  workbookId: string;
  startedAt: string;
  lastActivityAt: string;
  completedAt?: string;
  status: 'in_progress' | 'completed';
}

export interface StudentSummaryData {
  sessionId: string;
  studentName: string;
  completedAt: string;
  frequentEmotions: string[];
  keyReflections: { question: string; answer: string }[];
  totalAnswered: number;
  insightNote: string;
}

export type ViewType = 'landing' | 'session' | 'summary' | 'progress' | 'profile' | 'about' | 'favorites' | 'admin';
