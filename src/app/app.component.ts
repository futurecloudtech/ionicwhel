import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'HOME', url: '/home', icon: 'home-outline' },
    { title: 'SPIN NOW', url: '/spin', icon: 'game-controller-outline' },
    { title: 'PRIZES AND WINNERS', url: '/prizes', icon: 'trophy-outline' },
  ];
  public labels = [{name :'FOLLOW US', icon : 'logo-twitter'},{name :'SHARE', icon : 'share-social-outline'}];
  // {name :'TERM & CONDITIONS', icon : 'hammer-outline'},{name :'PRIVACY POLICY', icon : 'lock-closed-outline'}];
  constructor(private storage: Storage) {}

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();

    
  }

  openlink(label){

  }
}
