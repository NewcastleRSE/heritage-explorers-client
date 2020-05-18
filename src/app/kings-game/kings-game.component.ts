import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kings-game',
  templateUrl: './kings-game.component.html',
  styleUrls: ['./kings-game.component.scss']
})
export class KingsGameComponent implements OnInit {
kings= [
  '1',
  '2',
  '3',
  '4'
];

  constructor() { }

  ngOnInit(): void {
    // todo mix kings list into random order
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.kings, event.previousIndex, event.currentIndex);
    console.log(this.kings);

    // todo add check here to see if order is correct
  }

}
