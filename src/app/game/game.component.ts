import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GlobalsService} from '../globals.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {transition, trigger, useAnimation} from '@angular/animations';
import {bounce, slideInLeft, zoomIn} from 'ng-animate';
import {Router} from '@angular/router';
import * as SvgJs from '@svgdotjs/svg.js';
import * as crownjson from './crown.json';
import * as boatjson from './boat.json';
import * as womanjson from './woman.json';
import * as lionjson from './lion.json';
import * as sarcojson from './sarco.json';
import * as horsejson from './horse.json';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce))]),
    trigger('zoomIn', [transition('* => *', useAnimation(zoomIn))])
  ]
})
export class GameComponent implements OnInit, AfterViewInit {
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


  p1Pool = 24;
  p2Pool = 24;

  counter1String;
  counter2String;

// todo decide if the pool should start with anything in it
  pool;

// counters that keep track if a player is missing a go. When set to 0 the player can continue as normal.
  p1MissAGo = 0;
  p2MissAGo = 0;
  missAGoMessage;
  missAGoAlertClosed = true;

  numberPlayers;

  svgCanvas;
  svgCounter1;
  svgCounter2;



// view squares
  @ViewChild('sameSquareModal') sameSquareModal;
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

  @ViewChild('teetotum') teetotum;

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


     if (this.globalsService.numberPlayers !== undefined) {
       this.numberPlayers = 2;
     } else {
       this.numberPlayers = this.globalsService.numberPlayers;
     }


    this.pool = 0;

    this.p1Visited2 = false;
    this.p2Visited2 = false;

    this.assignP1CounterXlink();
    this.assignP2CounterXlink();

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


ngAfterViewInit() {

    this.svgCanvas = SvgJs.SVG('#svgContainer');
    this.svgCounter1 = SvgJs.SVG('#c1Group');
    this.svgCounter2 = SvgJs.SVG('#c2Group');
    this.moveP1Icon(1);
    this.moveP2Icon(1);

  }

  assignP1CounterXlink() {
    console.log('player 1 counter' + this.globalsService.player1Counter);
    if (this.globalsService.player1Counter === undefined) {
      this.counter1String = crownjson.xlink;
    } else {
      switch (this.globalsService.player1Counter) {
        case 'sarco':
          this.counter1String = sarcojson.xlink;
          break;
        case 'horse':
          this.counter1String = horsejson.xlink;
          break;
        case 'lion':
          this.counter1String = lionjson.xlink;
          break;
        case 'boat':
          this.counter1String = boatjson.xlink;
          break;
        case 'crown':
          this.counter1String = crownjson.xlink;
          break;
        case 'woman':
          this.counter1String = womanjson.xlink;
          break;
      }

    }
  }

  assignP2CounterXlink() {
    console.log('player 2 counter' + this.globalsService.player2Counter);
    if (this.globalsService.player2Counter === undefined) {
      if (this.globalsService.player1Counter === 'boat') {
        this.counter2String = lionjson.xlink;
      } else {
        this.counter2String = boatjson.xlink;
      }
    } else {

      switch (this.globalsService.player2Counter) {
        case 'sarco':
          this.counter2String = sarcojson.xlink;
          break;
        case 'horse':
          this.counter2String = horsejson.xlink;
          break;
        case 'lion':
          this.counter2String = lionjson.xlink;
          break;
        case 'boat':
          this.counter2String = boatjson.xlink;
          break;
        case 'crown':
          this.counter2String = crownjson.xlink;
          break;
        case 'woman':
          this.counter2String = womanjson.xlink;
          break;
      }
    }
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

    // if other player is already at the square, go back to start and display model
    if (this.currentPlayer === 1) {
      if (this.p2Square === moveTo) {
        this.triggerSameSquareInteraction(moveTo);
      } else {
        this.squareInteraction(moveTo);
      }
    } else if (this.currentPlayer == 2) {
      if(this.p1Square == moveTo) {
        this.triggerSameSquareInteraction(moveTo);
      } else {
        this.squareInteraction(moveTo);
      }
    }

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

      });
    }


    // ------ Square 2 - pay 3
    else if (squareNumber === 2) {
      this.square2Interaction().then(() => {

      });
    }
    // ----- Square 3 - go to 5
    else if (squareNumber === 3) {
      this.square3Interaction().then(() => {
        // after interact with cell then change to next player

      });
    }

    // ------ Square 4 - Go to 13
    else if (squareNumber === 4) {
      this.square4Interaction().then(() => {

      });
    }
    // ----- Square 5 - miss 2 turns. Add 3 to account for player 2's first legitimate go
  else if (squareNumber === 5) {
      this.square5Interaction().then(() => {

      });
    }

    // ------ Square 6 - pay 6
    else if (squareNumber === 6) {
      this.square6Interaction().then(() => {

      });
    }
    // ------ Square 7 - miss a go
    else if (squareNumber === 7) {
      this.square7Interaction().then(() => {

      });
    }
    // ------ Square 8 - if you have not been to the tower, go back to 2
    else if (squareNumber === 8) {
      this.square8Interaction().then(() => {

      });
    }
    // ------ Square 9 - pay 2
    else if (squareNumber === 9) {
      this.square9Interaction().then(() => {

      });
    }
    // ------ Square 10 - move to 15
    else if (squareNumber === 10) {
      this.square10Interaction().then(() => {

      });
    }
    // ------ Square 11 - miss 3 turns
    else if (squareNumber === 11) {
      this.square11Interaction().then(() => {

      });
    }
    // ------ Square 12 - miss a go
    else if (squareNumber === 12) {
      this.square12Interaction().then(() => {

      });
    }
    // ------ Square 13 - go to 2
    else if (squareNumber === 13) {
      this.square13Interaction().then(() => {

      });
    }
    // ------ Square 14 - pay 1
    else if (squareNumber === 14) {
      this.square14Interaction().then(() => {

      });
    }
    // ------ Square 15 - go back to 12
    else if (squareNumber === 15) {
      this.square15Interaction().then(() => {

      });
    }
    // ----- Square 16 - loose all counters
  else
    if (squareNumber === 16) {
      this.square16Interaction().then(() => {

      });
    }

    // ------ Square 17 - take half the counters in the pool
    else if (squareNumber === 17) {
      this.square17Interaction().then(() => {

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



  }

  async triggerSameSquareInteraction(moveTo) {
    if (this.currentPlayer === 1) {
      this.p1Square = 1;
      this.moveP1Icon(1);
    } else {
      this.p2Square = 1;
      this.moveP2Icon(1);
    }

    const modal = this.modalService.open(this.sameSquareModal);
    await modal.result.then(() => {
      console.log('When user closes');
    }, () => {
      this.changePlayer();
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

    const modal = this.modalService.open(this.modal1);
    await modal.result.then(() => {
      console.log('When user closes');
    }, () => {
    this.changePlayer();
    });
  }

  async square2Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 2;
      this.moveP1Icon(2);
    } else {
      this.p2Square = 2;
      this.moveP2Icon(2);
    }
    this.takeFromPlayer(3);

    const modal = this.modalService.open(this.modal2);
    await modal.result.then(() => {
      console.log('When user closes');
    }, () => {
      this.changePlayer();
    });
  }

  takeFromPlayer(decreasePlayer) {
    if (this.currentPlayer === 1) {
      // take n sweets from player and add to pool (preventing player going below 0)
      let newTotal = this.p1Pool - decreasePlayer;
      let increasePool = decreasePlayer;
      if (newTotal < 0) {
        newTotal = 0;
        increasePool = this.p1Pool;
      }
      this.p1Pool = newTotal;
      this.pool = this.pool + increasePool;
    } else if (this.currentPlayer === 2) {
      // take n sweets from player and add to pool (preventing player going below 0)
      let newTotal = this.p2Pool - decreasePlayer;
      let increasePool = decreasePlayer;
      if (newTotal < 0) {
        newTotal = 0;
        increasePool = this.p2Pool;
      }
      this.p2Pool = newTotal;
      this.pool = this.pool + increasePool;
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
      this.changePlayer();
    });
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
      this.changePlayer();
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

    const modal = this.modalService.open(this.modal5, {windowClass: 'modalTransparent'});
    await modal.result.then(() => {
      console.log('When user closes');
    }, () => {
      this.changePlayer();
    });
  }

  async square6Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 6;
      this.moveP1Icon(6);
    } else {
      this.p2Square = 6;
      this.moveP2Icon(6);
    }
   this.takeFromPlayer(6);
    const modal  = this.modalService.open(this.modal6);
    await modal.result.then(() => {
      console.log('When user closes');
    }, () => {
      this.changePlayer();
    });
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

    const modal = this.modalService.open(this.modal7);
    await modal.result.then(() => {
      console.log('When user closes');
    }, () => {
      this.changePlayer();
    });
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
      this.changePlayer();
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
    this.takeFromPlayer(2);
    const modal = this.modalService.open(this.modal9);
    await modal.result.then(() => {
      console.log('When user closes');
    }, () => {
      this.changePlayer();
    });
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
      this.changePlayer();
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

    const modal = this.modalService.open(this.modal11, {windowClass: 'modalTransparent'});
    await modal.result.then(() => {
      console.log('When user closes');
    }, () => {
      this.changePlayer();
    });
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

    const modal = this.modalService.open(this.modal12, {windowClass: 'modalTransparent'});
    await modal.result.then(() => {
      console.log('When user closes');
    }, () => {
      this.changePlayer();
    });
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
      this.changePlayer();
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
   this.takeFromPlayer(1);
    const modal = this.modalService.open(this.modal14);
    await modal.result.then(() => {
      console.log('When user closes');
    }, () => {
      this.changePlayer();
    });
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
      this.changePlayer();
    });
  }

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
    const modal = this.modalService.open(this.modal16);
    await modal.result.then(() => {
      console.log('When user closes');
    }, () => {
      this.changePlayer();
    });
  }

  async square17Interaction() {
    if (this.currentPlayer === 1) {
      this.p1Square = 17;
      this.moveP1Icon(17);
    } else {
      this.p2Square = 17;
      this.moveP2Icon(17);
    }
    const modal = this.modalService.open(this.modal17);
    const halfPool = Math.ceil(this.pool / 2);
    this.pool = this.pool - halfPool;
    if (this.currentPlayer === 1) {
      // take half sweets in pool
      this.p1Pool = this.p1Pool + halfPool;
    } else if (this.currentPlayer === 2) {
      this.p2Pool = this.p2Pool + halfPool;
    }
    await modal.result.then(() => {
      console.log('When user closes');
    }, () => {
      this.changePlayer();
    });

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

        // check for player 2 being computer and if so trigger roll
        if (this.numberPlayers === 1) {
          setTimeout(() => {
            this.roll(this.teetotum);
          }, 2000);
        }
      } else if (this.currentPlayer === 2 && this.p1MissAGo === 0) {
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


    switch (moveTo) {
      case 1:
        this.svgCounter1.animate(600, 0, 'now').move(160, 235);
        break;
      case 2:
        this.p1Visited2 = true;
        this.svgCounter1.animate(600, 0, 'now').move(800, 235);
        break;
      case 3:
        this.svgCounter1.animate(600, 0, 'now').move(1440, 235);
        break;
      case 4:
        this.svgCounter1.animate(600, 0, 'now').move(2080, 235);
        break;
      case 5:
        this.svgCounter1.animate(600, 0, 'now').move(2720, 235);
        break;
      case 6:
        this.svgCounter1.animate(600, 0, 'now').move(3360, 235);
        break;
      case 7:
        this.svgCounter1.animate(600, 0, 'now').move(3600, 630);
        break;
      case 8:
        this.svgCounter1.animate(600, 0, 'now').move(3600, 1310);
        break;
      case 9:
        this.svgCounter1.animate(600, 0, 'now').move(3600, 1990);
        break;
      case 10:
        this.svgCounter1.animate(600, 0, 'now').move(3400, 2730);
        break;
      case 11:
        this.svgCounter1.animate(600, 0, 'now').move(2750, 2730);
        break;
      case 12:
        this.svgCounter1.animate(600, 0, 'now').move(2100, 2730);
        break;
      case 13:
        this.svgCounter1.animate(600, 0, 'now').move(1470, 2730);
        break;
      case 14:
        this.svgCounter1.animate(600, 0, 'now').move(830, 2730);
        break;
      case 15:
        this.svgCounter1.animate(600, 0, 'now').move(160, 2730);
        break;
      case 16:
        this.svgCounter1.animate(600, 0, 'now').move(230, 2020);
        break;
      case 17:
        this.svgCounter1.animate(600, 0, 'now').move(230, 1340);
        break;
      case 18:
        this.svgCounter1.animate(600, 0, 'now').move(230, 660);
        break;

    }

  }

  moveP2Icon(moveTo) {
        switch (moveTo) {
      case 1:
        this.svgCounter2.animate(600, 0, 'now').move(430, 235);
        break;
      case 2:
        this.p2Visited2 = true;
        this.svgCounter2.animate(600, 0, 'now').move(1070, 235);
        break;
      case 3:
        this.svgCounter2.animate(600, 0, 'now').move(171, 235);
        break;
      case 4:
        this.svgCounter2.animate(600, 0, 'now').move(2350, 235);
        break;
      case 5:
        this.svgCounter2.animate(600, 0, 'now').move(2990, 235);
        break;
      case 6:
        this.svgCounter2.animate(600, 0, 'now').move(3630, 235);
        break;
      case 7:
        this.svgCounter2.animate(600, 0, 'now').move(3600, 910);
        break;
      case 8:
        this.svgCounter2.animate(600, 0, 'now').move(3600, 1590);
        break;
      case 9:
        this.svgCounter2.animate(600, 0, 'now').move(3600, 2270);
        break;
      case 10:
        this.svgCounter2.animate(600, 0, 'now').move(3690, 2730);
        break;
      case 11:
        this.svgCounter2.animate(600, 0, 'now').move(3040, 2730);
        break;
      case 12:
        this.svgCounter2.animate(600, 0, 'now').move(2390, 2730);
        break;
      case 13:
        this.svgCounter2.animate(600, 0, 'now').move(1760, 2730);
        break;
      case 14:
        this.svgCounter2.animate(600, 0, 'now').move(1120, 2730);
        break;
      case 15:
        this.svgCounter2.animate(600, 0, 'now').move(470, 2730);
        break;
      case 16:
        this.svgCounter2.animate(600, 0, 'now').move(230, 2320);
        break;
      case 17:
        this.svgCounter2.animate(600, 0, 'now').move(230, 1640);
        break;
      case 18:
        this.svgCounter2.animate(600, 0, 'now').move(230, 60);
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
