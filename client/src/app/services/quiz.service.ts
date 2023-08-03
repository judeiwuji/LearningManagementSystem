import { Injectable } from '@angular/core';
import { Pagination } from '../models/Pagination';
import { Quiz, QuizActionRequest } from '../models/Quiz';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QuizResult } from '../models/QuizResult';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private API_URL = `${environment.apiURL}`;

  constructor(private http: HttpClient) {}

  createQuiz(classRoomId: number, request: QuizActionRequest) {
    return this.http.post<Quiz>(
      `${this.API_URL}/classrooms/${classRoomId}/quizzes`,
      request,
      {
        withCredentials: true,
      }
    );
  }

  getQuizzes(classRoomId: number, page = 1, search = '') {
    return this.http.get<Pagination<Quiz>>(
      `${this.API_URL}/classrooms/${classRoomId}/quizzes?page=${page}&search=${search}`,
      { withCredentials: true }
    );
  }

  getQuiz(classRoomId: number, id: number) {
    return this.http.get<Quiz>(
      `${this.API_URL}/classrooms/${classRoomId}/quizzes/${id}`,
      { withCredentials: true }
    );
  }

  getQuizResults(id: number, page = 1, search = '') {
    return this.http.get<Pagination<QuizResult>>(
      `${this.API_URL}/quizzes/${id}/results?page=${page}&search=${search}`,
      {
        withCredentials: true,
      }
    );
  }

  updateQuiz(classRoomId: number, id: number, request: QuizActionRequest) {
    return this.http.put<Quiz>(
      `${this.API_URL}/classrooms/${classRoomId}/quizzes/${id}`,
      request,
      {
        withCredentials: true,
      }
    );
  }

  deleteQuiz(classRoomId: number, id: number) {
    return this.http.delete<void>(
      `${this.API_URL}/classrooms/${classRoomId}/quizzes/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
