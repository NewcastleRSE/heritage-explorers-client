import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-square3',
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
  `,
  styleUrls: ['./square3.component.scss']
})
export class Square3Component implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }


}
