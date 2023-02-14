import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit{
  categories=[
    {
      categoryId: 1,
      title: "Test",
      description: "Test"
    }
  ]

  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error!", "Error in loading data", "error");
      });
  }

  deleteCategory(categoryId: any) {
    Swal.fire({
      icon: "info",
      title: "Are you sure ?",
      confirmButtonText: "Delete",
      showCancelButton: true
    }).then((result) => {
      
      if(result.isConfirmed) {
        this._category.deleteCategory(categoryId).subscribe(
          (data: any) => {
            this.categories = this.categories.filter((category) => category.categoryId != categoryId);
            Swal.fire("Success", "Category deleted", "success");
          },
          (error) => {
            Swal.fire("Error", "Category has not deleted", "error");
            console.log(error);
          }); 
      }
    });

  }


}
