import { Injectable } from '@angular/core';
import { QuizQuestion, QuizQuestionActionRequest } from '../models/Question';
import { Pagination } from '../models/Pagination';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizQuestionService {
  private API_URL = `${environment.apiURL}`;

  constructor(private http: HttpClient) {}

  createQuestion(quizId: number, request: QuizQuestionActionRequest) {
    return this.http.post<QuizQuestion>(
      `${this.API_URL}/quizzes/${quizId}/questions`,
      request,
      {
        withCredentials: true,
      }
    );
  }

  getQuestions(quizId: number, page = 1, search = '') {
    return this.http.get<Pagination<QuizQuestion>>(
      `${this.API_URL}/quizzes/${quizId}/questions?page=${page}&search=${search}`,
      { withCredentials: true }
    );
  }

  updateQuestion(
    quizId: number,
    id: number,
    request: QuizQuestionActionRequest
  ) {
    return this.http.put<QuizQuestion>(
      `${this.API_URL}/quizzes/${quizId}/questions/${id}`,
      request,
      {
        withCredentials: true,
      }
    );
  }

  deleteQuestion(quizId: number, id: number) {
    return this.http.delete<void>(
      `${this.API_URL}/quizzes/${quizId}/questions/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
