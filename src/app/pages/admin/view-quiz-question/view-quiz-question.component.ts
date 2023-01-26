import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {
  
  quizId = 0;
  quizTitle = 'Empty';
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
    },
  ];
  
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snak: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['quizId'];
    this.quizTitle = this._route.snapshot.params['quizTitle'];

    this._question.getQuestionsOfQuiz(this.quizId).subscribe(
      (data: any) => {
        this.questions = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteQuestion(questionId: any) {
    Swal.fire({
      icon: "info",
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
      title: 'Are you sure ?'
    }).then((result) =>  {
      if(result.isConfirmed) {
        this._question.deleteQuestion(questionId).subscribe(
          (data: any) => {
            this._snak.open('Question Deleted', '', {
              duration: 3000,
            });
            this.questions = this.questions.filter((q) => q.questionId != questionId);
          },
          (error) => {
            this._snak.open("Error", "", {
              duration: 3000,
            });
            console.log(error);
          });
      }
    });
  }
}
