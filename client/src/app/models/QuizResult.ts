import { Quiz } from './Quiz';
import { Student } from './Student';

export interface QuizResult {
  id: number;
  student: Student;
  score: number;
  questionCount: number;
}

export interface StudentQuizResult {
  id: number;
  quiz: Quiz;
  score: number;
  questionCount: number;
}
