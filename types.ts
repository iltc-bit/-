
export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTI_CHOICE = 'MULTI_CHOICE',
  TEXT = 'TEXT',
  PROFILE = 'PROFILE'
}

export interface Option {
  id: string;
  label: string;
  icon?: string; // FontAwesome icon class
  fileId?: string;
  fileName?: string;
  fileLink?: string;
  x: number; // Difficulty (難度) 0-100
  y: number; // Importance (重要性) 0-100
  reason?: string;
  highlights?: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: Option[];
  placeholder?: string;
  category: 'physical' | 'living' | 'finance' | 'labor' | 'work' | 'stress' | 'profile';
  guide?: string;
}

export interface UserAnswers {
  [questionId: string]: string | string[];
}

export interface Recommendation {
  title: string;
  reason: string;
  highlights: string;
  link: string;
  score: number;
  triggerAnswer?: string;
}
