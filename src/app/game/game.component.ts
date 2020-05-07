import { Component, OnInit } from '@angular/core';
import {GlobalsService} from '../globals.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

p1Square;
p2Square;
currentPlayer;
winningMessage;
lastRoll;
rolls = [1, 2, 3, 4];

// counter positioning
p1Top;
p1Left;
p2Top;
p2Left;

p1Counter;
p2Counter;

p1Name;
p2Name;

pool;

// counters that keep track if a player is missing a go. When set to 0 the player can continue as normal.
p1MissAGo = 0;
p2MissAGo = 0;

  constructor(
    private globalsService: GlobalsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.currentPlayer = 1;
    this.p1Square = 1;
    this.p2Square = 1;
    this.moveP1Icon(1);
    this.moveP2Icon(1);

    this.pool = 0;

    // get counter images and names from globals
    // todo sort out counter size
    this.p1Counter = this.globalsService.player1Counter;
    this.p2Counter = this.globalsService.player2Counter;
    this.p1Name = this.globalsService.player1Name;
    this.p2Name = this.globalsService.player2Name;

  }


  step1On() {
    this.move(1);
  }
  step2On() {
    const current = this.p2Square;
    this.p2Square = current + 1;
    this.moveP2Icon(this.p2Square);
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
      this.moveP2Icon(moveTo);
    }
    this.squareInteraction(moveTo);
  }

  // set current player's miss a go counter to the appropriate number
  missAGo(numberOfGoes) {
    if (this.currentPlayer === 1) {
      this.p1MissAGo = numberOfGoes;
    } else if (this.currentPlayer === 2) {
      this.p2MissAGo = numberOfGoes;
    }
  }

  squareInteraction(squareNumber) {
    // if 18 stop game
    if (squareNumber === 18) {
      // todo winner modal
      this.winningMessage = 'Player ' + this.currentPlayer + ' wins!';
    }

    // Square 5 - miss 2 turns. Add 3 to account for player 2's first legitimate go
    if (squareNumber === 5) {
      // todo modal
      if (this.currentPlayer === 1) {
        console.log('player 1 misses next 2 goes');
        this.p1MissAGo = 3;
      } else  if (this.currentPlayer === 2) {
        console.log('player 2 misses next 2 goes');
        this.p2MissAGo = 3;
      }
    }

    // after interact with cell then change to next player
      this.changePlayer();
  }

  // pass random number between 1 and 4 to the move method
  roll(teetotum) {
    console.log('p1 miss a go count ' + this.p1MissAGo);
    console.log('p2 miss a go count ' + this.p2MissAGo);

    // if other player has just missed a go, reduce their miss a go flag by 1
    if (this.currentPlayer === 1 && this.p2MissAGo > 0) {
      this.p2MissAGo = this.p2MissAGo - 1;
    } else if (this.currentPlayer === 2 && this.p1MissAGo > 0) {
      this.p1MissAGo = this.p1MissAGo - 1;
    }

    this.lastRoll = Math.floor((Math.random() * 4) + 1);

    // open teetotum modal
    this.openTeetotum(teetotum);

    // move player
    this.move(this.lastRoll);
  }

  openTeetotum(teetotum) {
    this.modalService.open(teetotum, {windowClass: 'teetotum-modal'});
  }

  // change player unless the next player is sitting out goes
  changePlayer() {
    if (this.currentPlayer === 1 && this.p2MissAGo === 0) {
      console.log('change to player 2');
      this.currentPlayer = 2;
    } else if (this.currentPlayer === 2 && this.p1MissAGo === 0) {
      console.log('change to player 1');
      this.currentPlayer = 1;
    }
    // if next player has a value against their miss a go counter, then don't change the current player
  }

  startAgain() {
    this.winningMessage = undefined;
    this.currentPlayer = 1;
    this.p1Square = 1;
    this.p2Square = 1;
    this.moveP1Icon(1);
    this.moveP2Icon(1);
  }


  // move icons around 2 'tracks' around the board using their relative position to the board
  moveP1Icon(moveTo) {
  switch(moveTo) {
    case 1:
      this.p1Top = '10%';
      this.p1Left = '5%';
      break;
    case 2:
      this.p1Top = '10%';
      this.p1Left = '20%';
      break;
    case 3:
      this.p1Top = '10%';
      this.p1Left = '35%';
      break;
    case 4:
      this.p1Top = '10%';
      this.p1Left = '50%';
      break;
    case 5:
      this.p1Top = '10%';
      this.p1Left = '65%';
      break;
    case 6:
      this.p1Top = '10%';
      this.p1Left = '80%';
      break;
    case 7:
      this.p1Top = '24%';
      this.p1Left = '87%';
      break;
    case 8:
      this.p1Top = '41%';
      this.p1Left = '87%';
      break;
    case 9:
      this.p1Top = '60%';
      this.p1Left = '87%';
      break;
    case 10:
      this.p1Top = '82%';
      this.p1Left = '90%';
      break;
    case 11:
      this.p1Top = '82%';
      this.p1Left = '75%';
      break;
    case 12:
      this.p1Top = '82%';
      this.p1Left = '60%';
      break;
    case 13:
      this.p1Top = '82%';
      this.p1Left = '45%';
      break;
    case 14:
      this.p1Top = '82%';
      this.p1Left = '30%';
      break;
    case 15:
      this.p1Top = '82%';
      this.p1Left = '15%';
      break;
    case 16:
      this.p1Top = '70%';
      this.p1Left = '8%';
      break;
    case 17:
      this.p1Top = '50%';
      this.p1Left = '8%';
      break;
    case 18:
      this.p1Top = '32%';
      this.p1Left = '8%';
      break;

  }

  }

  moveP2Icon(moveTo) {
    switch (moveTo) {
      case 1:
        this.p2Top = '10%';
        this.p2Left = '14%';
        break;
      case 2:
        this.p2Top = '10%';
        this.p2Left = '29%';
        break;
      case 3:
        this.p2Top = '10%';
        this.p2Left = '44%';
        break;
      case 4:
        this.p2Top = '10%';
        this.p2Left = '59%';
        break;
      case 5:
        this.p2Top = '10%';
        this.p2Left = '75%';
        break;
      case 6:
        this.p2Top = '10%';
        this.p2Left = '90%';
        break;
      case 7:
        this.p2Top = '32%';
        this.p2Left = '87%';
        break;
      case 8:
        this.p2Top = '50%';
        this.p2Left = '87%';
        break;
      case 9:
        this.p2Top = '70%';
        this.p2Left = '87%';
        break;
      case 10:
        this.p2Top = '82%';
        this.p2Left = '80%';
        break;
      case 11:
        this.p2Top = '82%';
        this.p2Left = '65%';
        break;
      case 12:
        this.p2Top = '82%';
        this.p2Left = '50%';
        break;
      case 13:
        this.p2Top = '82%';
        this.p2Left = '35%';
        break;
      case 14:
        this.p2Top = '82%';
        this.p2Left = '20%';
        break;
      case 15:
        this.p2Top = '82%';
        this.p2Left = '5%';
        break;
      case 16:
        this.p2Top = '60%';
        this.p2Left = '8%';
        break;
      case 17:
        this.p2Top = '41%';
        this.p2Left = '8%';
        break;
      case 18:
        this.p2Top = '24%';
        this.p2Left = '8%';
        break;
    }
  }

}
