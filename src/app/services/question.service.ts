import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  public getQuestionsOfQuiz(quizId: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${quizId}`);
  }

  public getQuestionsOfQuizForTest(quizId: any) {
    return this._http.get(`${baseUrl}/question/quiz/${quizId}`);
  }

  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }
}
