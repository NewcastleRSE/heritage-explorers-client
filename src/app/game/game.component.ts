import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalsService} from '../globals.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Square3Component} from '../square3/square3.component';
import {transition, trigger, useAnimation} from '@angular/animations';
import {bounce, slideInLeft, zoomIn} from 'ng-animate';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce))]),
    trigger('zoomIn', [transition('* => *', useAnimation(zoomIn))])
  ]
})
export class GameComponent implements OnInit {
// animations
  bounce: any;
  zoomIn: any;

p1Visited2 = false;
p2Visited2 = false;

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

// for testing
  testSquare;

// todo decide how many players should start with
  p1Pool = 5;
  p2Pool = 5;

// todo decide if the pool should start with anything in it
  pool;

// counters that keep track if a player is missing a go. When set to 0 the player can continue as normal.
  p1MissAGo = 0;
  p2MissAGo = 0;
  missAGoMessage;
  missAGoAlertClosed = true;


// view squares
  @ViewChild('modal1') modal1;
  @ViewChild('modal2') modal2;
  @ViewChild('modal3') modal3;
  @ViewChild('modal4') modal4;
  @ViewChild('modal5') modal5;
  @ViewChild('modal6') modal6;
  @ViewChild('modal7') modal7;
  @ViewChild('modal8') modal8;
  @ViewChild('modal9') modal9;
  @ViewChild('modal10') modal10;
  @ViewChild('modal11') modal11;
  @ViewChild('modal12') modal12;
  @ViewChild('modal13') modal13;
  @ViewChild('modal14') modal14;
  @ViewChild('modal15') modal15;
  @ViewChild('modal16') modal16;
  @ViewChild('modal17') modal17;
  @ViewChild('modal18') modal18;


  constructor(
    private globalsService: GlobalsService,
    private modalService: NgbModal,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.currentPlayer = 1;
    this.p1Square = 1;
    this.p2Square = 1;
    this.moveP1Icon(1);
    this.moveP2Icon(1);

    this.pool = 0;

    // get counter images and names from globals. If undefined use fallbacks.
    // todo sort out counter size

    if (this.globalsService.player1Counter !== undefined) {
      this.p1Counter = this.globalsService.player1Counter;
    } else {
      this.p1Counter = 'boat';
    }
    if (this.globalsService.player2Counter !== undefined) {
      this.p2Counter = this.globalsService.player2Counter;
    } else {
      this.p2Counter = 'crown';
    }

    if (this.globalsService.player1Name !== undefined) {
      this.p1Name = this.globalsService.player1Name;
    } else {
      this.p1Name = 'Blue';
    }

    if (this.globalsService.player2Name !== undefined) {
      this.p2Name = this.globalsService.player2Name;
    } else {
      this.p2Name = 'Yellow';
    }
  }


  step1On() {
    this.move(1);
  }

  step2On() {
    const current = this.p2Square;
    this.p2Square = current + 1;
    this.moveP2Icon(this.p2Square);
  }

  async move(numberRolled) {
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

  // consequences of landing on a square plus trigger viewing square
  async squareInteraction(squareNumber) {

    // ----- Square 1 - miss a go
    if (squareNumber === 1) {
      this.square1Interaction().then(() => {
        this.changePlayer();
      });
    }


    // ------ Square 2 - pay 3
    else if (squareNumber === 2) {
      this.square2Interaction().then(() => {
        this.changePlayer();
      });
    }
    // ----- Square 3 - go to 5
    else if (squareNumber === 3) {
      this.square3Interaction().then(() => {
        // after interact with cell then change to next player
        this.changePlayer();
      });
    }

    // ------ Square 4 - Go to 13
    else if (squareNumber === 4) {
      this.square4Interaction().then(() => {
        this.changePlayer();
      });
    }
    // ----- Square 5 - miss 2 turns. Add 3 to account for player 2's first legitimate go
  else if (squareNumber === 5) {
      this.square5Interaction().then(() => {
        this.changePlayer();
      });
    }

    // ------ Square 6 - pay 6
    else if (squareNumber === 6) {
      this.square6Interaction().then(() => {
        this.changePlayer();
      });
    }
    // ------ Square 7 - miss a go
    else if (squareNumber === 7) {
      this.square7Interaction().then(() => {
        this.changePlayer();
      });
    }
    // ------ Square 8 - if you have not been to the tower, go back to 2
    else if (squareNumber === 8) {
      this.square8Interaction().then(() => {
        this.changePlayer();
      });
    }
    // ------ Square 9 - pay 2
    else if (squareNumber === 9) {
      this.square9Interaction().then(() => {
        this.changePlayer();
      });
    }
    // ------ Square 10 - move to 15
    else if (squareNumber === 10) {
      this.square10Interaction().then(() => {
        this.changePlayer();
      });
    }
    // ------ Square 11 - miss 3 turns
    else if (squareNumber === 11) {
      this.square11Interaction().then(() => {
        this.changePlayer();
      });
    }
    // ------ Square 12 - miss a go
    else if (squareNumber === 12) {
      this.square12Interaction().then(() => {
        this.changePlayer();
      });
    }
    // ------ Square 13 - go to 2
    else if (squareNumber === 13) {
      this.square13Interaction().then(() => {
        this.changePlayer();
      });
    }
    // ------ Square 14 - pay 1
    else if (squareNumber === 14) {
      this.square14Interaction().then(() => {
        this.changePlayer();
      });
    }
    // ------ Square 15 - go back to 12
    else if (squareNumber === 15) {
      this.square15Interaction().then(() => {
        this.changePlayer();
      });
    }
    // ----- Square 16 - loose all counters
  else
    if (squareNumber === 16) {
      this.square16Interaction().then(() => {
        this.changePlayer();
      });
    }

    // ------ Square 17 - take half the counters in the pool
    else if (squareNumber === 17) {
      this.square17Interaction().then(() => {
        this.changePlayer();
      });
    }
    // ----- Square 18 stop game
  else
    if (squareNumber === 18) {
      this.winningMessage = 'Player ' + this.currentPlayer + ' wins!';

      if (this.currentPlayer === 1) {
        this.router.navigate(['win'], {queryParams: {w: this.p1Name}});
      } else if (this.currentPlayer === 2) {
        this.router.navigate(['win'], {queryParams: {w: this.p2Name}});
      }
    }

    // default if not specific behaviour
    else {
      this.changePlayer();
    }

  }

  async square3Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 3;
      this.moveP1Icon(3);
    } else {
      this.p2Square = 3;
      this.moveP2Icon(3);
    }
    console.log('landed on 3 so move to 5');
    // this.modalService.open(Square3Component);
    const m3 = this.modalService.open(this.modal3);
    await m3.result.then(() => {
      console.log('When user closes');
    }, () => {
      // after closing modal move counter to 5
      if (this.currentPlayer === 1) {
        this.p1Square = 5;
        this.moveP1Icon(5);

      } else {
        this.p2Square = 5;
        this.moveP2Icon(5);
      }
    });
  }

  async square1Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 1;
      this.moveP1Icon(1);
      console.log('player 1 misses next go');
      this.p1MissAGo = 1;
    } else {
      this.p2Square = 1;
      this.moveP2Icon(1);
      console.log('player 2 misses next go');
      this.p2MissAGo = 1;
    }

    this.modalService.open(this.modal1, {windowClass: 'modalTransparent'});
  }

  async square2Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 2;
      this.moveP1Icon(2);
    } else {
      this.p2Square = 2;
      this.moveP2Icon(2);
    }
    if (this.currentPlayer === 1) {
      // take 3 sweets from player and add to pool
      this.p1Pool = this.p1Pool - 3;
      this.pool = this.pool + 3;
    } else if (this.currentPlayer === 2) {
      // take 3 sweets from player and add to pool
      this.p2Pool = this.p2Pool - 3;
      this.pool = this.pool + 3;
    }
    this.modalService.open(this.modal2);
  }

  async square4Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 4;
      this.moveP1Icon(4);
    } else {
      this.p2Square = 4;
      this.moveP2Icon(4);
    }
    console.log('landed on 4 so move to 13');
    // this.modalService.open(Square3Component);
    const m4 = this.modalService.open(this.modal4);
    await m4.result.then(() => {
      console.log('When user closes');
    }, () => {
      // after closing modal move counter to 15
      if (this.currentPlayer === 1) {
        this.p1Square = 13;
        this.moveP1Icon(13);
      } else {
        this.p2Square = 13;
        this.moveP2Icon(13);
      }
    });
  }

  async square5Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 5;
      this.moveP1Icon(5);
      console.log('player 1 misses next 2 goes');
      this.p1MissAGo = 3;
    } else {
      this.p2Square = 5;
      this.moveP2Icon(5);
      console.log('player 2 misses next 2 goes');
      this.p2MissAGo = 3;
    }

    this.modalService.open(this.modal5, {windowClass: 'modalTransparent'});
  }

  async square6Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 6;
      this.moveP1Icon(6);
    } else {
      this.p2Square = 6;
      this.moveP2Icon(6);
    }
    if (this.currentPlayer === 1) {
      // take 6 sweets from player and add to pool
      this.p1Pool = this.p1Pool - 6;
      this.pool = this.pool + 6;
    } else if (this.currentPlayer === 2) {
      // take 3 sweets from player and add to pool
      this.p2Pool = this.p2Pool - 6;
      this.pool = this.pool + 6;
    }
    this.modalService.open(this.modal6);
  }

  async square7Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 7;
      this.moveP1Icon(7);
      console.log('player 1 misses next go');
      this.p1MissAGo = 1;
    } else {
      this.p2Square = 7;
      this.moveP2Icon(7);
      console.log('player 2 misses next go');
      this.p2MissAGo = 1;
    }

    this.modalService.open(this.modal7, {windowClass: 'modalTransparent'});
  }

  async square8Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 8;
      this.moveP1Icon(8);
    } else {
      this.p2Square = 8;
      this.moveP2Icon(8);
    }

    const m8 = this.modalService.open(this.modal8);
    await m8.result.then(() => {
      console.log('When user closes');
    }, () => {
      // if player has not visited 2, go back to it
      if (this.currentPlayer === 1) {
        if (this.p1Visited2 === false) {
          this.p1Square = 2;
          this.moveP1Icon(2);
        }
      } else {
        if (this.p2Visited2 === false) {
          this.p2Square = 2;
          this.moveP2Icon(2);
        }
      }
    });
  }

  async square9Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 9;
      this.moveP1Icon(9);
    } else {
      this.p2Square = 9;
      this.moveP2Icon(9);
    }
    if (this.currentPlayer === 1) {
      // take 2 sweets from player and add to pool
      this.p1Pool = this.p1Pool - 2;
      this.pool = this.pool + 2;
    } else if (this.currentPlayer === 2) {
      // take 2 sweets from player and add to pool
      this.p2Pool = this.p2Pool - 2;
      this.pool = this.pool + 2;
    }
    this.modalService.open(this.modal9);
  }

  async square10Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 10;
      this.moveP1Icon(10);
    } else {
      this.p2Square = 10;
      this.moveP2Icon(10);
    }
    console.log('landed on 10 so move to 15');
    // this.modalService.open(Square3Component);
    const m10 = this.modalService.open(this.modal10);
    await m10.result.then(() => {
      console.log('When user closes');
    }, () => {
      // after closing modal move counter to 2
      if (this.currentPlayer === 1) {
        this.p1Square = 15;
        this.moveP1Icon(15);
      } else {
        this.p2Square = 15;
        this.moveP2Icon(15);
      }
    });
  }

  async square11Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 11;
      this.moveP1Icon(11);
      console.log('player 1 misses next 3 goes');
      this.p1MissAGo = 3;
    } else {
      this.p2Square = 11;
      this.moveP2Icon(11);
      console.log('player 2 misses next 3 goes');
      this.p2MissAGo = 3;
    }

    this.modalService.open(this.modal11, {windowClass: 'modalTransparent'});
  }

  async square12Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 12;
      this.moveP1Icon(12);
      console.log('player 1 misses next go');
      this.p1MissAGo = 1;
    } else {
      this.p2Square = 12;
      this.moveP2Icon(12);
      console.log('player 2 misses next go');
      this.p2MissAGo = 1;
    }

    this.modalService.open(this.modal12, {windowClass: 'modalTransparent'});
  }

  async square13Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 13;
      this.moveP1Icon(13);
    } else {
      this.p2Square = 13;
      this.moveP2Icon(13);
    }
    console.log('landed on 13 so move to 2');
    // this.modalService.open(Square3Component);
    const m13 = this.modalService.open(this.modal13);
    await m13.result.then(() => {
      console.log('When user closes');
    }, () => {
      // after closing modal move counter to 2
      if (this.currentPlayer === 1) {
        this.p1Square = 2;
        this.moveP1Icon(2);
      } else {
        this.p2Square = 2;
        this.moveP2Icon(2);
      }
    });
  }

  async square14Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 14;
      this.moveP1Icon(14);
    } else {
      this.p2Square = 14;
      this.moveP2Icon(14);
    }
    if (this.currentPlayer === 1) {
      // take 1 sweets from player and add to pool
      this.p1Pool = this.p1Pool - 1;
      this.pool = this.pool + 1;
    } else if (this.currentPlayer === 1) {
      // take 1sweets from player and add to pool
      this.p2Pool = this.p2Pool - 1;
      this.pool = this.pool + 1;
    }
    this.modalService.open(this.modal14);
  }

  async square15Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 15;
      this.moveP1Icon(15);
    } else {
      this.p2Square = 15;
      this.moveP2Icon(15);
    }
    console.log('landed on 15 so move to 12');
    // this.modalService.open(Square3Component);
    const m15 = this.modalService.open(this.modal15);
    await m15.result.then(() => {
      console.log('When user closes');
    }, () => {
      // after closing modal move counter to 12
      if (this.currentPlayer === 1) {
        this.p1Square = 12;
        this.moveP1Icon(12);
      } else {
        this.p2Square = 12;
        this.moveP2Icon(12);
      }
    });
  }

  // todo negative counters?
  async square16Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 16;
      this.moveP1Icon(16);
    } else {
      this.p2Square = 16;
      this.moveP2Icon(16);
    }
    console.log('land on 16 so lose all pool');
    if (this.currentPlayer === 1) {
      // add sweets to pool then empty
      this.pool = this.pool + this.p1Pool;
      this.p1Pool = 0;
    } else if (this.currentPlayer === 2) {
      // add sweets to pool then empty
      this.pool = this.pool + this.p2Pool;
      this.p2Pool = 0;
    }
    this.modalService.open(this.modal16);
  }

  async square17Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 17;
      this.moveP1Icon(17);
    } else {
      this.p2Square = 17;
      this.moveP2Icon(17);
    }
    const halfPool = Math.ceil(this.pool / 2);
    this.pool = this.pool - halfPool;
    if (this.currentPlayer === 1) {
      // take half sweets in pool
      this.p1Pool = this.p1Pool + halfPool;
    } else if (this.currentPlayer === 2) {
      this.p2Pool = this.p2Pool + halfPool;
    }
    this.modalService.open(this.modal17);
  }


  // pass random number between 1 and 4 to the move method
  roll(teetotum) {
    // close miss a go alert if it is still open
    this.missAGoAlertClosed = true;

    // if other player has just missed a go, reduce their miss a go flag by 1
    if (this.currentPlayer === 1 && this.p2MissAGo > 0) {
      this.p2MissAGo = this.p2MissAGo - 1;
    } else if (this.currentPlayer === 2 && this.p1MissAGo > 0) {
      this.p1MissAGo = this.p1MissAGo - 1;
    }

    this.lastRoll = Math.floor((Math.random() * 4) + 1);

    // open teetotum modal then move player after closing
    this.openTeetotum(teetotum);


  }

  openTeetotum(teetotum) {

    const m = this.modalService.open(teetotum, {windowClass: 'teetotum-modal'});
    m.result.then(() => {
    }, () => {
      // move player
      this.move(this.lastRoll);
    });
  }

  // change player unless the next player is sitting out goes
  changePlayer() {
    if (this.currentPlayer === 1 && this.p2MissAGo === 0) {
      this.currentPlayer = 2;
    } else if (this.currentPlayer === 2 && this.p1MissAGo === 0) {
      this.currentPlayer = 1;
    }
    // if next player has a value against their miss a go counter, then don't change the current player, but do display popup
    //   if (this.p2MissAGo > 0) {
    //     console.log('trigger alert for player 1');
    //     this.missAGoMessage = this.p2Name + ' misses a go';
    //     this.missAGoAlertClosed = false;
    //     setTimeout(() => this.missAGoAlertClosed = true, 5000);
    //   } else if (this.p1MissAGo > 0) {
    //     console.log('trigger alert for player 1');
    //     this.missAGoMessage = this.p1Name + ' misses a go';
    //     this.missAGoAlertClosed = false;
    //     setTimeout(() => this.missAGoAlertClosed = true, 5000);
    //   }
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
    switch (moveTo) {
      case 1:
        this.p1Top = '6%';
        this.p1Left = '2.25%';
        break;
      case 2:
        this.p1Visited2 = true;
        this.p1Top = '6%';
        this.p1Left = '18.25%';
        break;
      case 3:
        this.p1Top = '6%';
        this.p1Left = '34.75%';
        break;
      case 4:
        this.p1Top = '6%';
        this.p1Left = '51%';
        break;
      case 5:
        this.p1Top = '6%';
        this.p1Left = '67%';
        break;
      case 6:
        this.p1Top = '6%';
        this.p1Left = '83.25%';
        break;
      case 7:
        this.p1Top = '18.5%';
        this.p1Left = '89.5%';
        break;
      case 8:
        this.p1Top = '40.25%';
        this.p1Left = '89.5%';
        break;
      case 9:
        this.p1Top = '62%';
        this.p1Left = '89.5%';
        break;
      case 10:
        this.p1Top = '85%';
        this.p1Left = '90%';
        break;
      case 11:
        this.p1Top = '85%';
        this.p1Left = '75.25%';
        break;
      case 12:
        this.p1Top = '85%';
        this.p1Left = '59%';
        break;
      case 13:
        this.p1Top = '85%';
        this.p1Left = '43%';
        break;
      case 14:
        this.p1Top = '85%';
        this.p1Left = '26.5%';
        break;
      case 15:
        this.p1Top = '85%';
        this.p1Left = '10%';
        break;
      case 16:
        this.p1Top = '72.25%';
        this.p1Left = '4.5%';
        break;
      case 17:
        this.p1Top = '50.75%';
        this.p1Left = '4.5%';
        break;
      case 18:
        this.p1Top = '29%';
        this.p1Left = '4.5%';
        break;

    }

  }

  moveP2Icon(moveTo) {
        switch (moveTo) {
      case 1:
        this.p2Top = '6%';
        this.p2Left = '9.75%';
        break;
      case 2:
        this.p2Visited2 = true;
        this.p2Top = '6%';
        this.p2Left = '25.75%';
        break;
      case 3:
        this.p2Top = '6%';
        this.p2Left = '42%';
        break;
      case 4:
        this.p2Top = '6%';
        this.p2Left = '58.35%';
        break;
      case 5:
        this.p2Top = '6%';
        this.p2Left = '74.5%';
        break;
      case 6:
        this.p2Top = '6%';
        this.p2Left = '90.5%';
        break;
      case 7:
        this.p2Top = '28%';
        this.p2Left = '89.5%';
        break;
      case 8:
        this.p2Top = '49.5%';
        this.p2Left = '89.5%';
        break;
      case 9:
        this.p2Top = '71.3%';
        this.p2Left = '89.5%';
        break;
      case 10:
        this.p2Top = '85%';
        this.p2Left = '84.25%';
        break;
      case 11:
        this.p2Top = '85%';
        this.p2Left = '68%';
        break;
      case 12:
        this.p2Top = '85%';
        this.p2Left = '51.75%';
        break;
      case 13:
        this.p2Top = '85%';
        this.p2Left = '35.75%';
        break;
      case 14:
        this.p2Top = '85%';
        this.p2Left = '19%';
        break;
      case 15:
        this.p2Top = '85%';
        this.p2Left = '2.5%';
        break;
      case 16:
        this.p2Top = '63%';
        this.p2Left = '4.5%';
        break;
      case 17:
        this.p2Top = '41.5%';
        this.p2Left = '4.5%';
        break;
      case 18:
        this.p2Top = '19.75%';
        this.p2Left = '4.5%';
        break;
    }
  }

  viewRules(rulesModal) {
    this.modalService.open(rulesModal);
  }

  testMoveSquare() {
    console.log('test square ' + this.testSquare);
    this.squareInteraction(parseInt(this.testSquare));
  }

  returnToHome() {
    this.router.navigate(['home']);
  }
}
