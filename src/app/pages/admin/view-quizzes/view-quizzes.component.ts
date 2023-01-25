import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{
  quizzes = [
    {
      quizId: 0,
      title: "Empty Test",
      description: "",
      maxMarks: "0",
      numberOfQuestion: "0",    
      active: "",
      category: {
        title: "Empty"
      }
    },
  ];

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error loading data', 'error');
      }
    );
  }

  deleteQuiz(quizId: any) {
    Swal.fire({
      icon: "info",
      title: "Are you sure ?",
      confirmButtonText: "Delete",
      showCancelButton: true
    }).then((result) => {
      
      if(result.isConfirmed) {
        this._quiz.deleteQuiz(quizId).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.quizId != quizId);
            Swal.fire("Success", "Quiz deleted", "success");
          },
          (error) => {
            Swal.fire("Error", "Quiz has not deleted", "error");
            console.log(error);
          }); 
      }
    });

  }

  
}
