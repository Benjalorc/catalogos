import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  MinLengthValidator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { LoginService, LoginUser } from '@common/services/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;
  isLoad = false;
  viewPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.createForm();
  }

  private createForm(): void {
    this. form = this.formBuilder.group({
      email: ['', [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['',
        Validators.required
      ],
      remember: [
        true
      ]
    });
  }

  private login({ email, password, remember }: LoginUser): void {
    this.isLoad = true;

    this.loginService.login({ email, password, remember })
      .pipe(
        finalize(
          () => {
            this.isLoad = false;
          }
        )
      )
      .subscribe();
  }

  submit(form: FormGroup) {
    if (form.valid) {
      this.login(this.form.value as LoginUser);
    }
  }

  showError(type: 'password' | 'email'): boolean {
    const control = this.form.controls[type];

    return control.dirty
      && control.touched
      && control.errors
        ? true
        : false;
  }

  getError(type: 'password' | 'email', error: string): boolean | any {
    const control = this.form.controls[type];

    if (!control.errors || !control.errors[error]) {
      return false;
    } else {
      return control.errors[error];
    }
  }

  toogleViewPassword(): void {
    this.viewPassword = !this.viewPassword;
  }

}
