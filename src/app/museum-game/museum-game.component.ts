import {Component, OnInit, ViewChild} from '@angular/core';
import ImageMap from 'image-map';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'infoModal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">British Museum</h4>
<!--      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">-->
<!--        <span aria-hidden="true">&times;</span>-->
<!--      </button>-->
    </div>
    <div class="modal-body">
      <p>Info about the museum and mini game....</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Play mini game</button>
    </div>
  `
})
export class InfoModal {

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-museum-game',
  templateUrl: './museum-game.component.html',
  styleUrls: ['./museum-game.component.scss']
})
export class MuseumGameComponent implements OnInit {
// false indicates not yet found
  sarco = false;
  mask = false;
  cockerel = false;
  peacock = false;
  duck = false;
  snake = false;
  yFish = false;
  turkey = false;
  bigFish = false;
  hat = false;

  playingGame = false;


  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    ImageMap('img[usemap]');
    // this.openInfoModal();
  }
// todo help option to highlight when can't find something?

  reset() {
    this.sarco = false;
    this.mask = false;
    this.cockerel = false;
    this.peacock = false;
    this.duck = false;
    this.snake = false;
    this.yFish = false;
    this.turkey = false;
    this.bigFish = false;
    this.hat = false;
  }

  returnToBoard() {
    this.router.navigate(['/explorer']);
  }

  // openInfoModal() {
  //   this.modalService.open(InfoModal);
  // }

  foundItem(itemName) {
    console.log('found ' + itemName);
    // remove border if have asked for hint
    document.getElementById(itemName).style.border = '';

    switch (itemName) {
      case 'sarco':
        this.sarco = true;
        break;
      case 'mask':
        this.mask = true;
        break;
      case 'cockerel':
        this.cockerel = true;
        break;
      case 'duck':
        this.duck = true;
        break;
      case 'snake':
        this.snake = true;
        break;
      case 'yFish':
        this.yFish = true;
        break;
      case 'turkey':
        this.turkey = true;
        break;
      case 'bigFish':
        this.bigFish = true;
        break;
      case 'hat':
        this.hat = true;
        break;
      case 'peacock':
        this.peacock = true;
        break;
    }
  }

  reveal(itemName) {
    console.log('reveal ' + itemName);
    document.getElementById(itemName).style.borderRadius = '30px 30px 30px 30px';
    document.getElementById(itemName).style.border = '5px dashed  #f50808';
  }


}
