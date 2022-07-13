import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      emailRegister: new FormControl(),
      passwordRegister: new FormControl()
    })
  }

  ngOnInit(): void {
  }
  onSubmitReg(){
    let fireMessageError='';
    if (!this.formReg.value.emailRegister || !this.formReg.value.passwordRegister) {
      fireMessageError=this.messages('Empty');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: fireMessageError,
      });
    } else{
      this.userService.register(this.formReg.value.emailRegister, this.formReg.value.passwordRegister)
      .then(response => {
        console.log(response);
        this.router.navigate(['/login']);
      })
      .catch(error => {
        fireMessageError = this.messages(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: fireMessageError,
        });
      })
    }
  }
  messages(message: string) {
    let errorMessageText = '';
    switch (message) {
      case 'Firebase: Error (auth/email-already-in-use).':
        errorMessageText = 'Email ya registrado';
        break;
      case 'Firebase: Error (auth/internal-error).':
        errorMessageText = 'Ingresar contraseña';
        break;
      case 'Firebase: Error (auth/invalid-email).':
        errorMessageText = 'Email inválido';
        break;
      case 'Firebase: Error (auth/user-not-found).':
        errorMessageText = 'Usuario no encontrado';
        break;
      case 'Firebase: Error (auth/wrong-password).':
        errorMessageText = 'Contraseña incorrecta';
        break;
      case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
        errorMessageText = 'La contraseña debe tener al menos 6 caracteres';
        break;
      case 'Firebase: Error (auth/missing-email).':
        errorMessageText = 'Ingresar email';
        break;
      case 'Empty':
        errorMessageText = 'Existen campos vacíos';
        break;
      default:
        break;
    }
    return errorMessageText;
  }
  back(){
    this.router.navigate(['/login']);
  }

}
