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
  
  quizId: any;

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

  marksGot: any;
  correctAnswers: any;
  attempted: any;

  isSubmit = false;

  timer: any;

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

      this.timer = this.questions.length*2*60;

      this.startTimer();
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
        this.evalQuiz();
      }
    });
  }
  startTimer() {
    let t: any = window.setInterval(() => {
      if(this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormatTime() {
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm * 60;

    return `${mm}:${ss}`;
  }

  evalQuiz() {

    this._questions.evalQuiz(this.questions).subscribe(
      (data: any) => {
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      },
      (error) => {
        console.log(error);
      }
    );
    // this.isSubmit = true; 

    // this.questions.forEach((q) => {
    //   if(q.givenAnswer==q.answer) {
    //     this.correctAnswers++;
    //     let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length
    //     this.marksGot += marksSingle;
    //   }

    //   if(q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });

    // console.log("Correct answers: " + this.correctAnswers);
    // console.log("Marks Got: "+ this.marksGot);
    // console.log("Attemted: " + this.attempted);  
  }
}
