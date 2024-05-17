import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    PasswordModule,
    InputTextModule,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder) {}

  form = this.formBuilder.group({
    username: ['', [V.required]],
    password: ['', [V.required, V.pattern('^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$')]],
  });

  inputInvalid(input: string) {
    return (
      this.form.get(input)?.invalid &&
      (this.form.get(input)?.dirty || this.form.get(input)?.touched)
    );
  }

  getInputError(input: string, error: string) {
    return this.form.get(input)?.hasError(error);
  }

  onSubmit() {}
}
