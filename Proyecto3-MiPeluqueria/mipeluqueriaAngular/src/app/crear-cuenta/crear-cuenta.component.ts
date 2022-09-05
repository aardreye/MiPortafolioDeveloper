import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../servicios/user.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html'
})
export class CrearCuentaComponent implements OnInit {
  
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
  onSubmit(){
    this.userService.register(this.formReg.value)
    .then( response => {
      console.log(response);
    })
    .catch(error => console.log(error))
  }
}
