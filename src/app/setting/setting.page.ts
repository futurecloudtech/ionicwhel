import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AdminapiService } from '../services/adminapi.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  settingArray : any = {
    title : '',
    subtitle : '',
    content : '',
    term : '',
    policy : ''
  }

  wheel = [{
    prizename : 'test1',
    desc : 'test',
    chance : 0,
    img:''
  }];

  constructor(private adminApiServies:AdminapiService,private toast:ToastController) { }

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

  addPrize(){
    this.wheel.push(
      {
        prizename : '',
        desc : '',
        chance : 0,
        img:''
      } 
    )
  }

  removePrize(index){
    this.wheel.splice(index,1);
  }

  SaveInfo(){

      this.adminApiServies.updateInfo(this.settingArray).subscribe((res:any)=>{
        this.presentToast('Success')
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
