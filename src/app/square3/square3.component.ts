import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-square3',
  template: `
<!--    <div class="modal-header">-->
<!--      <h4 class="modal-title">British Museum</h4>-->
<!--&lt;!&ndash;      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">&ndash;&gt;-->
<!--&lt;!&ndash;        <span aria-hidden="true">&times;</span>&ndash;&gt;-->
<!--&lt;!&ndash;      </button>&ndash;&gt;-->
<!--    </div>-->
    <div class="modal-body">
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                <span aria-hidden="true">&times;</span>
              </button>
      <img src="../../assets/3.png">
      The Horse Armoury. Go on to the Wild Beasts, No. 5.
    </div>
    <div class="modal-footer">

<!--      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Play mini game</button>-->
    </div>
  `,
  styleUrls: ['./square3.component.scss']
})
export class Square3Component implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }


}
