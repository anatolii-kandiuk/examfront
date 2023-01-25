import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  
  constructor(
    private _router: Router,
    private _route: ActivatedRoute, 
    private _quiz: QuizService, 
    private _cat: CategoryService,
  ) {}
  
  quizId = 1;

  categories = [ { categoryId: 0, title: "Empty" } ];

  quiz = {
    quizeId: '0',
    title: 'empty',
    description: 'empty',
    maxMarks: 'empty',
    numberOfQuestion: 'empty',
    active: false,
    category: {
      categoryId: '0',
    },
  };
  
  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['quizId'];
    
    this._quiz.getQuiz(this.quizId).subscribe(
      (data: any) => {
        this.quiz=data;
      },
      (error) => {
        console.log(error);
      });

    this._cat.categories().subscribe(
      (data: any) => {
        this.categories=data;
      },
      (error) => {
        console.log(error)
      });
  }

  public updateQuiz() {
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire("Success", "Quiz updated", "success").then(
          (e: any) => {
            this._router.navigate(['/admin/quizzes']);
          });
      },
      (error) => {
        Swal.fire("Error", "Error is updating quiz", "error");
        console.log(error);
      });
  }
}
