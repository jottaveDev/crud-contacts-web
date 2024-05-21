import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Contact } from '../../../models/contact';
import { ContactsService } from '../../../services/contacts/contacts.service';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    NgClass,
    NgIf,
    ButtonModule,
    InputMaskModule,
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
})
export class AddContactComponent {
  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    private router: Router,
    private messageService: MessageService
  ) {}

  form = this.formBuilder.group({
    name: ['', [V.required]],
    email: ['', [V.required, V.email]],
    phone: ['', [V.required, V.pattern('^[0-9]{10}$')]],
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

  onSubmit() {
    this.contactsService.postContact(this.form.value as Contact).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Contato adicionado com sucesso!',
        });
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${err.error.message}`,
        });
      },
    });
  }
}
