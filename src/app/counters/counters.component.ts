import { Component, OnInit } from '@angular/core';
import {GlobalsService} from '../globals.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.scss']
})
export class CountersComponent implements OnInit {
player1Choosing: boolean;
player2Choosing: boolean;

player1EnteredName: boolean;
player2EnteredName: boolean;

player1Counter;
player2Counter;

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
    if (this.player1Choosing === true) {
      switch (counterChoice) {
        case 1:
          this.player1Counter = this.one;
          break;
        case 2:
          this.player1Counter = this.two;
          break;
        case 3:
          this.player1Counter = this.three;
          break;
        case 4:
          this.player1Counter = this.four;
          break;
        case 5:
          this.player1Counter = this.five;
          break;
        case 6:
          this.player1Counter = this.six;
          break;
        case 7:
          this.player1Counter = this.seven;
          break;
        case 8:
          this.player1Counter = this.eight;
          break;
      }
    } else {
      switch (counterChoice) {
        case 1:
          this.player2Counter = this.one;
          break;
        case 2:
          this.player2Counter = this.two;
          break;
        case 3:
          this.player2Counter = this.three;
          break;
        case 4:
          this.player2Counter = this.four;
          break;
        case 5:
          this.player2Counter = this.five;
          break;
        case 6:
          this.player2Counter = this.six;
          break;
        case 7:
          this.player2Counter = this.seven;
          break;
        case 8:
          this.player2Counter = this.eight;
          break;
      }
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
    // todo prevent moving on if no counter has been chosen

    // switch to player 2
  this.player1Choosing = false;
  this.player2Choosing = true;
 }


 player2Finished() {
// todo prevent moving on if no counter has been chosen

    // save both counter choices to globals
this.globalsService.player1Counter = this.player1Counter;
this.globalsService.player2Counter = this.player2Counter;
this.globalsService.player1Name = this.player1Name;
this.globalsService.player2Name = this.player2Name;

    // nav to game
   this.router.navigate(['game']);
 }


}
