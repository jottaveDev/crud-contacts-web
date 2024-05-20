import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Contact } from '../../models/contact';
import { ContactsService } from '../../services/contacts/contacts.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
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
    this.contactsService.deleteContact(id).subscribe({
      next: () => {
        this.contacts = this.contacts.filter((contact) => contact.id !== id);
      },
      error: (err) => console.log(err),
    });
  }
}
