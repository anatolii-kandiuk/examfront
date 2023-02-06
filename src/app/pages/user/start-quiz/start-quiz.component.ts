import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  
  quizId = '';

  questions = [
    {
      questionId: '',
      content: '',
      image: '',
      optionOne: '',
      optionTwo: '',
      optionThree: '',
      optionFour: '',
      answer: '',
      quiz: {
        title: '',
      }
    },
  ];

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _questions: QuestionService,
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this._route.snapshot.params["quizId"];

    this.loadQuestions();
  }

  loadQuestions() {
    this._questions.getQuestionsOfQuizForTest(this.quizId).subscribe(
    (data:any) => {
      this.questions = data;
    },
    (error) => {
      console.log(error);
    });
  }

  preventBackButton() {
    history.pushState(null, location.href);

    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    });
  }

}
