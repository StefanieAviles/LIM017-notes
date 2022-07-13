import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLog: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.formLog = new FormGroup({
      emailLog: new FormControl('', Validators.email),
      passwordLog: new FormControl('', Validators.min(6)),
    });
  }
  ngOnInit(): void {}
  onSubmit() {
    let fireMessageError='';
    if (!this.formLog.value.emailLog || !this.formLog.value.passwordLog) {
      fireMessageError=this.messages('Empty');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: fireMessageError,
      });
    } else {
      this.userService
        .logIn(this.formLog.value.emailLog, this.formLog.value.passwordLog) //COMENTARLE
        .then((response) => {
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          fireMessageError = this.messages(error.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: fireMessageError,
          });
        });
    }
  }
  toRegister() {
    console.log('REG');
    this.router.navigate(['/register']);
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
}
