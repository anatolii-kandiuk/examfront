import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  
  categories=[{categoryId: '', title: ''}]

  constructor(
    private _cat:CategoryService,
    private _snack:MatSnackBar
    ) {}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories=data;
      },
      (error) => {
        this._snack.open("Error", "", {
          duration:3000,
        })
      }
    )
  }
}
