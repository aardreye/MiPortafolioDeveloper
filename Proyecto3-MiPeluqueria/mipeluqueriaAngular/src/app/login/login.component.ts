import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../servicios/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formReg: FormGroup;
  
  constructor(
    private userService: UserService
    ) {
      this.formReg = new FormGroup({
        email: new FormControl(),
        password: new FormControl
      })
     }

  ngOnInit(): void {
  }

  login(form: NgForm){
    const email = form.value.email

    const password = form.value.password


  }

  onSubmit(){
    this.userService.register(this.formReg.value)
    .then( response => {
      console.log(response);
    })
    .catch(error => console.log(error))

  }
}
