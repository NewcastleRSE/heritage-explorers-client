import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
teetotum;
p1Square;
p2Square;
currentPlayer;
winningMessage;
lastRoll;

// counter positioning
p1Top;
p1Left;



  constructor() { }

  ngOnInit(): void {
    this.currentPlayer = 1;
    this.p1Square = 1;
    this.p2Square = 1;
    this.moveP1Icon(1);
  }

  step1On() {
    this.move(1);
  }

  move(numberRolled) {
    let currentSquare = 0;
    if (this.currentPlayer === 1) {
      currentSquare = this.p1Square;
    } else {
      currentSquare = this.p2Square;
    }
    let moveTo = currentSquare + numberRolled;

    // if more than 18 go around the board from 1 again.
      if (moveTo > 18) {
        moveTo = moveTo - 18;
      }

    // move player
    if (this.currentPlayer === 1) {
      this.p1Square = moveTo;
      this.moveP1Icon(moveTo);
    } else {
      this.p2Square = moveTo;
    }

    // if 18 stop game
    if (moveTo === 18) {
      this.winningMessage = 'Player ' + this.currentPlayer + ' wins!';
    }
    else {
      this.changePlayer();
    }
  }

  // pass random number between 1 and 4 to the move method
  roll() {
    this.lastRoll = Math.floor((Math.random() * 4) + 1);
    this.move(this.lastRoll);
  }

  changePlayer() {
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  }

  startAgain() {
    this.winningMessage = undefined;
    this.currentPlayer = 1;
    this.p1Square = 1;
    this.p2Square = 1;
    this.moveP1Icon(1);
  }


  moveP1Icon(moveTo) {
  switch(moveTo) {
    case 1:
      this.p1Top = '5%';
      this.p1Left = '10%';
      break;
    case 2:
      this.p1Top = '5%';
      this.p1Left = '25%';
      break;
    case 3:
      this.p1Top = '5%';
      this.p1Left = '40%';
      break;
    case 4:
      this.p1Top = '5%';
      this.p1Left = '55%';
      break;
    case 5:
      this.p1Top = '5%';
      this.p1Left = '70%';
      break;
    case 6:
      this.p1Top = '5%';
      this.p1Left = '85%';
      break;
    case 7:
      this.p1Top = '24%';
      this.p1Left = '87%';
      break;
    case 8:
      this.p1Top = '34%';
      this.p1Left = '87%';
      break;
    case 9:
      this.p1Top = '44%';
      this.p1Left = '87%';
      break;
    case 10:
      this.p1Top = '87%';
      this.p1Left = '85%';
      break;
    case 11:
      this.p1Top = '87%';
      this.p1Left = '70%';
      break;
    case 12:
      this.p1Top = '87%';
      this.p1Left = '55%';
      break;
    case 13:
      this.p1Top = '87%';
      this.p1Left = '40%';
      break;
    case 14:
      this.p1Top = '87%';
      this.p1Left = '40%';
      break;
    case 15:
      this.p1Top = '87%';
      this.p1Left = '25%';
      break;
    case 16:
      this.p1Top = '44%';
      this.p1Left = '13%';
      break;
    case 17:
      this.p1Top = '34%';
      this.p1Left = '13%';
      break;
    case 18:
      this.p1Top = '24%';
      this.p1Left = '13%';
      break;

  }

  }

}
