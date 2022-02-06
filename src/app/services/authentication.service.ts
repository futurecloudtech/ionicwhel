import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('CUSTOMER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }


  login(email) {
    this.storage.set('CUSTOMER_INFO', email).then((response) => {
      this.router.navigate(['cusinvitecode']);
      this.authState.next(true);
    });
  }

  logout() {
    this.storage.remove('CUSTOMER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}