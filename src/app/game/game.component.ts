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

// counter positioning
p1Top;
p1Left;
p2Top;
p2Left;

p1Counter;
p2Counter;



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

    // get counter images from globals
    this.p1Counter = this.globalsService.player1Counter;
    this.p2Counter = this.globalsService.player2Counter;
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

    // if 18 stop game
    if (moveTo === 18) {
      this.winningMessage = 'Player ' + this.currentPlayer + ' wins!';
    }
    else {
      this.changePlayer();
    }
  }

  // pass random number between 1 and 4 to the move method
  roll(teetotum) {
    this.lastRoll = Math.floor((Math.random() * 4) + 1);

    // open teetotum modal
    this.openTeetotum(teetotum);

    this.move(this.lastRoll);
  }

  openTeetotum(teetotum) {
    this.modalService.open(teetotum, {ariaLabelledBy: 'teetotum-modal'}).result.then((result) => {
    });
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
