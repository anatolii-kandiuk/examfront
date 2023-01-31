import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  
  categoryId=0;
  quizzes=[{
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestion: '',
    category: {
      title: ''
    }
  }]

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
  ) {}
  
  ngOnInit(): void {
        
    this._route.params.subscribe(
      (params:any)=> {
        this.categoryId = params["categoryId"];
        
        if(this.categoryId==0) {
          this._quiz.quizzes().subscribe(
            (data:any) => {
              this.quizzes=data;
              console.log(this.quizzes);
            },
            (error) => {
              console.log(error);
            }
          )
        } else {
          console.log("ERROR");
          this._quiz.getQuizzesOfCategory(this.categoryId).subscribe(
            (data:any) => {
              this.quizzes=data;
            },
            (error) => {
              alert("Error loading");
            }
          );
        }
      }
    );
    
  }

}
