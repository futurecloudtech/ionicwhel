import { Component, OnInit } from '@angular/core';
import {TimelineMax, TweenMax} from 'gsap';
declare let Winwheel: any;
import { Router } from '@angular/router';
import { AdminapiService } from '../services/adminapi.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.page.html',
  styleUrls: ['./spin.page.scss'],
})
export class SpinPage implements OnInit {

  public folder: string;
  title = 'angular10-winwheelJS';
  theWheel: any;
  wheelPower = 0;
  wheelSpinning = false;
  winningSegment: string;
  buttonImage = '../assets/img/spin_off.png';
  wheelItem = [];
  prize :any;
  prizeindex = 0;
  doneStatus :boolean = true;
  constructor(private router:Router,private adminApiServices:AdminapiService,private alertController:AlertController) {
    if (router.getCurrentNavigation().extras.state) {
      this.prize = this.router.getCurrentNavigation().extras.state;
    }else{
      router.navigate(['/cusinvitecode'], {replaceUrl: true});
    }

   }

 
  ngOnInit() {

    this.adminApiServices.getPrize().subscribe((res:any)=>{
      if(res.status){
        for(let i of res.message){
            this.wheelItem.push({
              fillStyle : "#" + (Math.round(Math.random() * 0XFFFFFF)).toString(16),
              text : i.name,
              id : i.id
            })
        }
        console.log(this.wheelItem)
       this.prizeindex = this.wheelItem.findIndex(obj => obj.id == this.prize.prize);
      }
    })
  
  }

  

  ionViewDidEnter() {
    this.theWheel = new Winwheel({
      innerRadius     : 100,         // Make wheel hollow so segments dont go all way to center.
      outerRadius    : 300,
      // responsive   : true,
      numSegments     : this.wheelItem.length,         // Specify number of segments.
      segments        : this.wheelItem,             // Define segments including colour and text.
      animation :           // Specify the animation to use.
      {
          type     : 'spinToStop',
          duration : 10,
          spins    : 3,
          callbackFinished : () => { this.done(); },
          callbackSound    : this.playSound,   // Called when the tick sound is to be played.
          soundTrigger     : 'pin'        // Specify pins are to trigger the sound.
      },
      pins :                // Turn pins on.
      {
          number     : 30,
          responsive   : true,
          fillStyle  : 'silver',
          outerRadius: 4,
      }
    });
  }


 
  // This function is called when the sound is to be played.
  playSound()
  {
    let audio = new Audio('../assets/sound/tick.mp3');
      // Stop and rewind the sound if it already happens to be playing.
      audio.pause();
      audio.currentTime = 0;

      // Play the sound.
      audio.play();
  }


  powerSelected(powerLevel): void {
    if (this.wheelSpinning === false) {
      document.getElementById('pw1').className = '';
      document.getElementById('pw2').className = '';
      document.getElementById('pw3').className = '';
      if (powerLevel >= 1) {
        document.getElementById('pw1').className = 'pw1';
      }
      if (powerLevel >= 2) {
        document.getElementById('pw2').className = 'pw2';
      }
      if (powerLevel >= 3) {
        document.getElementById('pw3').className = 'pw3';
      }
      this.wheelPower = powerLevel;
      this.buttonImage = '../assets/img/spin_on.png';
      document.getElementById('spin_button').className = 'clickable';
    }
  }

  startSpin(): void {
    if (this.wheelSpinning === false) {
      if (this.wheelPower === 1) {
        this.theWheel.animation.spins = 3;
      } else if (this.wheelPower === 2) {
        this.theWheel.animation.spins = 8;
      } else if (this.wheelPower === 3) {
        this.theWheel.animation.spins = 15;
      }
    }
    // this.buttonImage = '../assets/img/spin_off.png';
    // document.getElementById('spin_button').className = '';
    this.theWheel.startAnimation(new TweenMax(new TimelineMax()));
    this.wheelSpinning = true;
  }

  resetWheel(): void {
    this.theWheel.stopAnimation(false);
    this.theWheel.rotationAngle = 0;
    this.theWheel.draw();
    // Remove all colours from the power level indicators.
    document.getElementById('pw1').className = '';
    document.getElementById('pw2').className = '';
    document.getElementById('pw3').className = '';
    this.wheelSpinning = false;
  }

async done(){
  //  this.doneStatus = false;
    const alert = await this.alertController.create({
      header: 'CONGRATULATIONS',
      subHeader: 'Your Have Won ',
      backdropDismiss : false,
      message: this.wheelItem.filter(res=>{return res.id == this.prize.prize})[0].text,
      buttons: [ {
        text: 'Okay',
        id: 'confirm-button',
        handler: () => {
          this.router.navigate(['/cusinvitecode'], {replaceUrl: true});
        }
      }]
    });

    await alert.present();
  }

  calculatePrize(): void {
    const stopAt = this.theWheel.getRandomForSegment(this.prizeindex+1);
    this.theWheel.animation.stopAngle = stopAt;
    this.startSpin();
  }

}
