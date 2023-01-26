import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  
  quizId='';
  quizTitle='';

  question={
    questionId: '',
    content: '',
    optionOne: '',
    optionTwo: '',
    optionThree: '',
    optionFour: '',
    answer: '',
    quiz: {
      quizId: '',
     },
  };

  constructor(
    private _question: QuestionService,
    private _route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.quizId = this._route.snapshot.params["quizId"];
    this.quizTitle = this._route.snapshot.params["quizTitle"];

    this.question.quiz['quizId'] = this.quizId;
  }

  addQuestion() {
    if(this.question.content.trim()=='' || this.question.content==null) {
      return;
    } else if(this.question.optionOne.trim()=='' || this.question.optionOne==null) {
      return;
    } else if(this.question.optionTwo.trim()=='' || this.question.optionTwo==null) {
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire("Success", "Question Added", "success");
        
        this.question.questionId = '';
        this.question.content = '';
        this.question.optionOne = '';
        this.question.optionTwo = '';
        this.question.optionThree = '';
        this.question.optionFour = '';
        this.question.answer = '';
      },
      (error) => {
        Swal.fire("Error", "", "error");
      }
    );
  }

}
