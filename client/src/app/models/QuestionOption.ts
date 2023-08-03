export interface QuestionOption {
  id?: number;
  questionId?: number;
  option: string;
  processing?: boolean;
}

export interface QuestionOptionActionRequest {
  questionId: number;
  option: string;
}
