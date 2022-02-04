import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AdminapiService } from '../services/adminapi.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  settingArray= {
    title : '',
    subtitle : '',
    content : '',
    term : '',
    policy : ''
  };

  constructor(private alertController:AlertController,private router: Router,private adminApiServies:AdminapiService){}

  ngOnInit() {
    this.getInfo();
  }

  getInfo(){
    this.adminApiServies.getInfo().subscribe((res:any)=>{
      if(res.status){
          this.settingArray = JSON.parse(decodeURIComponent(window.atob(res.message.data)));
      }else{
        this.settingArray = {
          title : '',
          subtitle : '',
          content : '',
          term : '',
          policy : ''
        }
      
      }
    },error=>{
      this.settingArray = {
        title : '',
        subtitle : '',
        content : '',
        term : '',
        policy : ''
      }
    })
  }


  async term() {
    const alert = await this.alertController.create({
      cssClass: 'myClass',
      header: 'Term & Conditions',
      // subHeader: 'Subtitle',
      message: this.settingArray.term
      ,buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async policy() {
    const alert = await this.alertController.create({
      cssClass: 'myClass',
      header: 'Privacy Policy',
      // subHeader: 'Subtitle',
      message: this.settingArray.policy,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  tospin(){
    this.router.navigate(['/spin'])
  }

}
