import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { sequenceEqual } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private userService: UserService, 
    private snack: MatSnackBar,
    private router: Router) {}

  public user = {
    username:'',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user); 
    if(this.user.username == '' || this.user.username == null)
    {
      this.snack.open("Username is required !", "ok", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });

      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire(
          'Success', 
          'The user: ' + data.username + ' has successfully registered!', 
          'success'
        ).then((e) => {
          this.router.navigate(['login']);
        });
      },
      (error) => {
        console.log(error);
        
        this.snack.open("Wrong !!!", "ok", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    )
  } 

  // this.user
}
