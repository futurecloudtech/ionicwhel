import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cusinvitecode',
  templateUrl: './cusinvitecode.page.html',
  styleUrls: ['./cusinvitecode.page.scss'],
})
export class CusinvitecodePage implements OnInit {

  invitecode = '';
  user : any ;
  constructor(private adminApiServices : AdminapiService,private storage :Storage,private toast:ToastController,private router :Router) { }

  ngOnInit() {
    this.storage.get('CUSTOMER_INFO').then((response) => {
      if(response){
        this.user = response;
      }else{
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    });
  }

  ionViewDidEnter(){
    this.invitecode = '';
  }

  enterPrize(uid){
    this.adminApiServices.checkInviteCode(uid,this.user.email).subscribe((res:any)=>{
      if(res.status){
        this.router.navigate(['spin'],{state:{prize : res.message}, skipLocationChange: true });
      }else{
        this.presentToast('Invalid Code');
      }
    })
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
