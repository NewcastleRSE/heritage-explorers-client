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
  constructor() { }

  ngOnInit(): void {
    this.currentPlayer = 1;
    this.p1Square = 1;
    this.p2Square = 1;
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
  }

}
