import { Injectable } from '@angular/core';
import {
  QuestionOption,
  QuestionOptionActionRequest,
} from '../models/QuestionOption';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionOptionService {
  private API_URL = `${environment.apiURL}`;

  constructor(private http: HttpClient) {}

  addOption(questionId: number, request: QuestionOptionActionRequest) {
    return this.http.post<QuestionOption>(
      `${this.API_URL}/questions/${questionId}/options`,
      request,
      {
        withCredentials: true,
      }
    );
  }

  removeOption(questionId: number, id: number) {
    return this.http.delete<void>(
      `${this.API_URL}/questions/${questionId}/options/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
