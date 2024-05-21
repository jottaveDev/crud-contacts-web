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
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { Contact } from '../../../models/contact';
import { ContactsService } from '../../../services/contacts/contacts.service';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    InputMaskModule,
    ToastModule,
    RippleModule,
    ReactiveFormsModule,
    NgClass,
    NgIf,
  ],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss',
})
export class EditContactComponent {
  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    private router: Router,
    private messageService: MessageService
  ) {}

  protected contactSelected: Contact = history.state.data;

  form = this.formBuilder.group({
    name: [this.contactSelected.name, [V.required]],
    email: [this.contactSelected.email, [V.required, V.email]],
    phone: [this.contactSelected.phone, [V.required, V.pattern('^[0-9]{10}$')]],
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
    this.contactsService
      .editContact(this.contactSelected.id, this.form.value as Contact)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Contato editado com sucesso!',
            life: 3000,
          });
          this.form.reset();
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${err.error.message}`,
            life: 3000,
          });
        },
      });
  }
}
