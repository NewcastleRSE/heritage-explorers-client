import { Component, OnInit } from '@angular/core';
import {GlobalsService} from '../globals.service';
import {Router} from '@angular/router';
import {transition, trigger, useAnimation} from '@angular/animations';
import {bounce} from 'ng-animate';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.scss'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce))])
  ]
})
export class CountersComponent implements OnInit {
  bounce: any;

  audio;

player1Choosing: boolean;
player2Choosing: boolean;

player1EnteredName: boolean;
player2EnteredName: boolean;

showCounterAlert = false;
showSameNameAlert = false;

player1Counter;
player1CounterNumber;
player2Counter;
player2CounterNumber;

p1FormValid = false;
p2FormValid = false;

// label counters
one = 'boat';
two = 'crown';
three = 'horse';
four = 'lion';
// five = 'monument';
// six = 'punch';
seven = 'sarco';
eight = 'woman';

player1Name;
player2Name;

numberPlayers;

  constructor(
    private globalsService: GlobalsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.player1Choosing = true;
    this.player2Choosing = false;
    this.player1EnteredName = false;
    this.player2EnteredName = false;
    this.audio = new Audio();
    this.numberPlayers = this.globalsService.numberPlayers;
    // fallback in case not set in globals
    if (this.numberPlayers === undefined) {
      this.numberPlayers = 2;
    }
  }

  setCounter(counterChoice) {
    // stop any sound
    this.audio.pause();

    // close counter alert if open
    this.showCounterAlert = false;

    // don't let user select counter before adding name
    if (this.player1Choosing === true) {
      switch (counterChoice) {
        case 1:
          this.player1Counter = this.one;
          this.player1CounterNumber = 1;
          break;
        case 2:
          this.player1Counter = this.two;
          this.player1CounterNumber = 2;
          break;
        case 3:
          this.player1Counter = this.three;
          this.player1CounterNumber = 3;
          break;
        case 4:
          this.player1Counter = this.four;
          this.player1CounterNumber = 4;
          break;
        // case 5:
        //   this.player1Counter = this.five;
        //   this.player1CounterNumber = 5;
        //   break;
        // case 6:
        //   this.player1Counter = this.six;
        //   this.player1CounterNumber = 6;
        //   break;
        case 7:
          this.player1Counter = this.seven;
          this.player1CounterNumber = 7;
          break;
        case 8:
          this.player1Counter = this.eight;
          this.player1CounterNumber = 8;
          break;
      }
      console.log('play' + this.player1Counter + '.mp3');
      this.audio.src = '../../assets/sounds/' + this.player1Counter + '3.mp3';
      this.audio.load();
      this.audio.play();

    } else if (this.player2Choosing ===  true) {
      switch (counterChoice) {
        case 1:
          if (this.player1CounterNumber === 1) {
          return;
          }
            this.player2Counter = this.one;
            this.player2CounterNumber = 1;
          break;
        case 2:
          if (this.player1CounterNumber === 2) {
            return;
          }
          this.player2Counter = this.two;
          this.player2CounterNumber = 2;
          break;
        case 3:
          if (this.player1CounterNumber === 3) {
            return;
          }
          this.player2Counter = this.three;
          this.player2CounterNumber = 3;
          break;
        case 4:
          if (this.player1CounterNumber === 4) {
            return;
          }
          this.player2Counter = this.four;
          this.player2CounterNumber = 4;
          break;
        // case 5:
        //   if (this.player1CounterNumber === 5) {
        //     return;
        //   }
        //   this.player2Counter = this.five;
        //   this.player2CounterNumber = 5;
        //   break;
        // case 6:
        //   if (this.player1CounterNumber === 6) {
        //     return;
        //   }
        //   this.player2Counter = this.six;
        //   this.player2CounterNumber = 6;
        //   break;
        case 7:
          if (this.player1CounterNumber === 7) {
            return;
          }
          this.player2Counter = this.seven;
          this.player2CounterNumber = 7;
          break;
        case 8:
          if (this.player1CounterNumber === 8) {
            return;
          }
          this.player2Counter = this.eight;
          this.player2CounterNumber = 8;
          break;
      }
      console.log('play' + this.player1Counter + '.mp3');

      this.audio.src = '../../assets/sounds/' + this.player2Counter + '3.mp3';
      this.audio.load();
      this.audio.play();
    }
  }


 player1NameEntered() {
this.player1EnteredName = true;
 }

 player2NameEntered() {


 }


 player1Finished() {

   // stop any sound
   this.audio.pause();

    if (this.player1Name === undefined) {
      this.showCounterAlert = true;
    }

    if (this.player1Counter === undefined) {
      this.showCounterAlert = true;
    }

if (this.player1Counter !== undefined && this.player1Name !== undefined) {
  console.log('player 1 finished');
  this.player1EnteredName = true;
  console.log(this.player1Name);
  console.log(this.player1Counter);
  console.log(this.player1EnteredName);

  // save counter choices to globals
  this.globalsService.player1Counter = this.player1Counter;
  this.globalsService.player1Name = this.player1Name;
  console.log(this.numberPlayers);
  if (this.numberPlayers === 2) {

    // switch to player 2 if 2 players
    this.player1Choosing = false;
    this.player2Choosing = true;
  } else if (this.numberPlayers === 1) {
    this.router.navigate(['raceintro']);
  }

}
 }

 closeAlert() {
    this.showCounterAlert = false;
    this.showSameNameAlert = false;
 }

 player2Finished() {
   if (this.player2Name === undefined) {
     this.showCounterAlert = true;
   }

   if (this.player2Counter === undefined) {
     this.showCounterAlert = true;
   }


   // only move forward if player 2 has chosen counter
if (this.player2Counter !== undefined &&  this.player2Name !== undefined) {

  // only move forward if players have different names
  const lowerCase1 = this.player1Name.toLowerCase();
  const lowerCase2 = this.player2Name.toLowerCase();
  if (lowerCase1 !== lowerCase2) {
    this.player2EnteredName = true;

    // save counter choices to globals
    this.globalsService.player2Name = this.player2Name;
    this.globalsService.player2Counter = this.player2Counter;

    // stop any sound
    this.audio.pause();

    // nav to game
    this.router.navigate(['raceintro']);
  } else {
    this.showSameNameAlert = true;
  }


}

 }

 checkIfCardIsClicked(num) {
    if (this.player1CounterNumber === num) {}

 }

 returnToHome() {
    this.audio.pause();
    this.router.navigate(['home']);
 }

}
