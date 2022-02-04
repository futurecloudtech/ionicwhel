import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

import { AdminapiService } from '../services/adminapi.service';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  register:boolean = false;
  CurrenUser = {
    firstname:'',
    lastname:'',
    email : '',
    phone : '',
    winboxuid : ''
  };
  disableemail :boolean = false;
  termcheck : boolean = false;
  policycheck :boolean= false;
  constructor(private authService: SocialAuthService,private adminApiServices:AdminapiService,private toast :ToastController,private auth:AuthenticationService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.checkloginmember(this.user);
    });
    
  }
  ionViewDidEnter(){
 
  }

  signInEmail(){
    this.register = true;
  }

  checkloginmember(user){
    this.adminApiServices.getmember(user.email).subscribe((res:any)=>{
      if(res.status){
        this.gologin(res.message);
      }else{
        this.CurrenUser.email = user.email;
        this.disableemail = true;
        this.register = true;
      }
    })
  }

  gologin(user){
    this.auth.login(user);
  }

  goback(){
    this.register = false;
  }

  submit(){
    if(this.CurrenUser.firstname == ''){
      this.presentToast('Firstname Required');
      return false;
    }
    if(this.CurrenUser.lastname == ''){
      this.presentToast('Lastname Required');
      return false;
    }
    if(this.CurrenUser.email == ''){
      this.presentToast('Email Required');
      return false;
    }else{
      if(!this.validateEmail(this.CurrenUser.email)){
        this.presentToast('Email Invalid');
        return false;
      }
    }
    if(this.CurrenUser.phone == ''){
      this.presentToast('Phone Number Required');
      return false;
    }
    if(this.CurrenUser.winboxuid == ''){
      this.presentToast('Winbox UID Required');
      return false;
    }
    if(!this.termcheck){
      this.presentToast('Please accept Term & Condition');
      return false;
    }
    if(!this.policycheck){
      this.presentToast('Please accept Privacy Policy');
      return false;
    }

    this.submittoServerRegister();
  }

  submittoServerRegister(){
    this.adminApiServices.register(this.CurrenUser).subscribe((res:any)=>{
      if(res.status){
        this.presentToast(res.message)
      }else{
        this.presentToast(res.message)
      }
    })
  }

  validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  
  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


}
