import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  constructor(private contactsService: ContactsService) {}

  contacts: Contact[] = [];

  ngOnInit() {
    this.contactsService.getContacts().subscribe({
      next: (data) => (this.contacts = data),
      error: (err) => console.log(err),
    });
  }
}
