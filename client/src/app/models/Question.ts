import { QuestionOption } from './QuestionOption';
import { Quiz } from './Quiz';

export interface QuizQuestion {
  id: number;
  quizId: number;
  quiz: Quiz;
  question: string;
  answer?: string;
  options: QuestionOption[];
  processing?: boolean;
}

export interface QuizQuestionActionRequest {
  quizId?: number;
  question?: string;
  answer?: string;
  options?: string[];
}

export interface QuestionAnswerActionRequest {
  answer?: string;
}
