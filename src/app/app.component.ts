import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'HOME', url: '/home', icon: 'home-outline' },
    { title: 'SPIN NOW', url: '/cusinvitecode', icon: 'game-controller-outline' },
    { title: 'PRIZES AND WINNERS', url: '/prizes', icon: 'trophy-outline' },
  ];
  public labels = [{name :'FOLLOW US', icon : 'logo-twitter'},{name :'SHARE', icon : 'share-social-outline'}];
  // {name :'TERM & CONDITIONS', icon : 'hammer-outline'},{name :'PRIVACY POLICY', icon : 'lock-closed-outline'}];
  constructor(private storage: Storage,private  authenticationService: AuthenticationService,private router:Router) {}

  async ngOnInit() {
    await this.storage.create();
    // this.authenticationService.authState.subscribe(state => {
    //   if (state) {
    //     this.router.navigate(['cusinvitecode']);
    //   } else {
    //     this.router.navigate(['home']);
    //   }
    // });

  }

  openlink(label){

  }
}
