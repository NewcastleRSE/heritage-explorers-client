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

player1Choosing: boolean;
player2Choosing: boolean;

player1EnteredName: boolean;
player2EnteredName: boolean;

showCounterAlert = false;

player1Counter;
player1CounterNumber;
player2Counter;
player2CounterNumber;


// label counters
one = 'boat';
two = 'crown';
three = 'horse';
four = 'lion';
five = 'monument';
six = 'punch';
seven = 'sarco';
eight = 'woman';

player1Name;
player2Name;

  constructor(
    private globalsService: GlobalsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.player1Choosing = true;
    this.player2Choosing = false;
    this.player1EnteredName = false;
    this.player2EnteredName = false;
  }

  setCounter(counterChoice) {
    // close counter alert if open
    this.showCounterAlert = false;

    // don't let user select counter before adding name
    if (this.player1Choosing === true && this.player1EnteredName === true) {
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
        case 5:
          this.player1Counter = this.five;
          this.player1CounterNumber = 5;
          break;
        case 6:
          this.player1Counter = this.six;
          this.player1CounterNumber = 6;
          break;
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
      const audio = new Audio();
      audio.src = '../../assets/sounds/' + this.player1Counter + '3.mp3';
      audio.load();
      audio.play();

    } else if (this.player2Choosing ===  true && this.player2EnteredName === true) {
      switch (counterChoice) {
        case 1:
          if (this.player1CounterNumber === 1) {
          return;
          }
            this.player2Counter = this.one;
            this.player2CounterNumber = 1;
          break;
        case 2:
          this.player2Counter = this.two;
          this.player2CounterNumber = 2;
          break;
        case 3:
          this.player2Counter = this.three;
          this.player2CounterNumber = 3;
          break;
        case 4:
          this.player2Counter = this.four;
          this.player2CounterNumber = 4;
          break;
        case 5:
          this.player2Counter = this.five;
          this.player2CounterNumber = 5;
          break;
        case 6:
          this.player2Counter = this.six;
          this.player2CounterNumber = 6;
          break;
        case 7:
          this.player2Counter = this.seven;
          this.player2CounterNumber = 7;
          break;
        case 8:
          this.player2Counter = this.eight;
          this.player2CounterNumber = 8;
          break;
      }
      console.log('play' + this.player1Counter + '.mp3');
      const audio = new Audio();
      audio.src = '../../assets/sounds/' + this.player2Counter + '3.mp3';
      audio.load();
      audio.play();
    }
  }


 player1NameEntered() {
this.player1EnteredName = true;
 }

 player2NameEntered() {
    // todo prevent player 2 using same name as player 1

    this.player2EnteredName = true;
 }


 player1Finished() {
if (this.player1Counter !== undefined) {
  console.log('player 1 finished');
  console.log(this.player1EnteredName);
  // switch to player 2
  this.player1Choosing = false;
  this.player2Choosing = true;
} else {
// trigger alert
  this.showCounterAlert = true;
}

 }

 closeAlert() {
    this.showCounterAlert = false;
 }

 player2Finished() {
  // trigger alert if no counter chosen
   this.showCounterAlert = true;

   // only move forward if player 2 has chosen counter
if (this.player2Counter !== undefined) {
  // save both counter choices to globals
  this.globalsService.player1Counter = this.player1Counter;
  this.globalsService.player2Counter = this.player2Counter;
  this.globalsService.player1Name = this.player1Name;
  this.globalsService.player2Name = this.player2Name;

  // nav to game
  this.router.navigate(['game']);
}

 }

 checkIfCardIsClicked(num) {
    if (this.player1CounterNumber === num) {}

 }

}
