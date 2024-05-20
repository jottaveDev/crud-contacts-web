import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Contact } from '../../models/contact';
import { ContactsService } from '../../services/contacts/contacts.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ConfirmationService],
})
export class HomeComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  contacts: Contact[] = [];

  ngOnInit() {
    this.contactsService.getContacts().subscribe({
      next: (data) => (this.contacts = data),
      error: (err) => console.log(err),
    });
  }

  addContact() {
    this.router.navigate(['/home/add']);
  }

  editContact(contact: Contact) {
    this.router.navigate([`/home/edit/${contact.id}`], {
      state: { data: contact },
    });
  }

  deleteContact(id: string) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este contato?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.contactsService.deleteContact(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Contato excluido com sucesso!',
            });
            this.contacts = this.contacts.filter(
              (contact) => contact.id !== id
            );
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Erro ao excluir contato!',
            });
          },
        });
      },
      reject: () => {},
    });
  }
}
