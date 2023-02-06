import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  quizId = ''; 
  
  quiz = {
    quizId: '',
    title: '',
    description: '',
    maxMarks: 1,
    numberOfQuestion: 1,
    category: {
      title: ''
    }
  }

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router,
    ) { }

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params["quizId"];

    this._quiz.getQuiz(this.quizId).subscribe(
      (data:any) => {
        this.quiz = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: "Do you want to start the quiz ?",
      showCancelButton: true,
      confirmButtonText: "Start",
      icon: "info",
    }).then((result) => {
      if(result.isConfirmed) {
        this._router.navigate(['/start-quiz/' + this.quizId]);
      } else if(result.isDenied) {
        Swal.fire('See you soon!', '', 'info');
      }
    });
  }

}
