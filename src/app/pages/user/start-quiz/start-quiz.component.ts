import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

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
      givenAnswer: '',
      quiz: {
        title: '',
        maxMarks: 0,
      }
    },
  ];

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

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
    (data: any) => {
      this.questions = data;

      this.questions.forEach((q) => {
        q["givenAnswer"] = ''; 
      });
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

  submitQuiz() {
    Swal.fire({
      title: "Do you want to finish ?",
      showCancelButton: true,
      confirmButtonText: "Submit",
      icon: "info",

    }).then((e) => {

      if(e.isConfirmed) {
        // calculate answers
        this.isSubmit = true;

        this.questions.forEach((q) => {
          if(q.givenAnswer==q.answer) {
            this.correctAnswers++;
            let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length
            this.marksGot += marksSingle;
          }

          if(q.givenAnswer.trim() != '') {
            this.attempted++;
          }
        });

        console.log("Correct answers: " + this.correctAnswers);
        console.log("Marks Got: "+ this.marksGot);
        console.log("Attemted: " + this.attempted);
      
      }
    });
  }

}
