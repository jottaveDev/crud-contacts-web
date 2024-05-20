import { Routes } from '@angular/router';
import { AddContactComponent } from './pages/home/add-contact/add-contact.component';
import { EditContactComponent } from './pages/home/edit-contact/edit-contact.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'add',
        component: AddContactComponent,
      },
      { path: 'edit/:id', component: EditContactComponent },
    ],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
];
