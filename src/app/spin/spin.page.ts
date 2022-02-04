import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TimelineMax, TweenMax} from 'gsap';
import { AuthenticationService } from '../services/authentication.service';
declare let Winwheel: any;
import { Router } from '@angular/router';
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


  constructor(private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService,private router:Router) { }

 
  ngOnInit() {
    this.authenticationService.authState.subscribe(state => {
      if (state) {
        // this.router.navigate(['spin']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  

  ngAfterViewInit(): void {
    this.theWheel = new Winwheel({
      // outerRadius     : 212,        // Set outer radius so wheel fits inside the background.
      innerRadius     : 100,         // Make wheel hollow so segments dont go all way to center.
      // textFontSize    : 24,         // Set default font size for the segments.
      // textOrientation : 'vertical', // Make text vertial so goes down from the outside of wheel.
      // textAlignment   : 'outer',    // Align text to outside of wheel.
      outerRadius    : 300,
      // responsive   : true,
      numSegments     : 8,         // Specify number of segments.
      segments        :             // Define segments including colour and text.
      [
        {'fillStyle' : '#eae56f', 'text' : 'Prize 1'},
        {'fillStyle' : '#89f26e', 'text' : 'Prize 2'},
        {'fillStyle' : '#7de6ef', 'text' : 'Prize 3'},
        {'fillStyle' : '#e7706f', 'text' : 'Prize 4'},
        {'fillStyle' : '#eae56f', 'text' : 'Prize 5'},
        {'fillStyle' : '#89f26e', 'text' : 'Prize 6'},
        {'fillStyle' : '#7de6ef', 'text' : 'Prize 7'},
        {'fillStyle' : '#e7706f', 'text' : 'Prize 8'}
    ],
      animation :           // Specify the animation to use.
      {
          type     : 'spinToStop',
          duration : 10,
          spins    : 3,
          callbackFinished : this.alertPrize,  // Function to call whent the spinning has stopped.
          callbackSound    : this.playSound,   // Called when the tick sound is to be played.
          soundTrigger     : 'pin'        // Specify pins are to trigger the sound.
      },
      pins :                // Turn pins on.
      {
          number     : 50,
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
    this.buttonImage = '../assets/img/spin_off.png';
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

  alertPrize(indicatedSegment): void {
    if (indicatedSegment.text == 'LOOSE TURN') {
      alert('Sorry but you loose a turn.');
  } else if (indicatedSegment.text == 'BANKRUPT') {
      alert('Oh no, you have gone BANKRUPT!');
  } else {
      alert("You have won " + indicatedSegment.text);
  }
    // this.winningSegment = this.theWheel.getIndicatedSegment().text;
    // alert('You have won ' + this.theWheel.getIndicatedSegment().text);
  }

  getSegment(e): void {
    const clickedSegment = this.theWheel.getSegmentAt(e.clientX, e.clientY);
    console.log('Segment clicked - ', clickedSegment);
  }

  calculatePrize(): void {
    // This formula always makes the wheel stop somewhere inside prize 3 at least
    // 1 degree away from the start and end edges of the segment.
    // const stopAt = (91 + Math.floor((Math.random() * 43)));
    // const stopAt = (25 + Math.floor((Math.random() * 78)));
    const stopAt = this.theWheel.getRandomForSegment(2);
    // Important thing is to set the stopAngle of the animation before stating the spin.
    this.theWheel.animation.stopAngle = stopAt;
    // May as well start the spin from here.
    this.startSpin();
    // this.theWheel.animation.callbackFinished = console.log('This after animation ends - ', this.theWheel.getIndicatedSegment());
  }

}
