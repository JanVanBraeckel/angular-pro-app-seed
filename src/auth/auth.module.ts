import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// thid-party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// shared modules
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule'
      }
    ]
  }
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyC_jpQEE5RhryD8WQzAVFqE8R6RseeJMFQ',
  authDomain: 'fitness-app-e0dce.firebaseapp.com',
  databaseURL: 'https://fitness-app-e0dce.firebaseio.com',
  projectId: 'fitness-app-e0dce',
  storageBucket: 'fitness-app-e0dce.appspot.com',
  messagingSenderId: '1046475348844'
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {}
