import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {shuffle} from 'lodash';

@Component({
  selector: 'app-kings-game',
  templateUrl: './kings-game.component.html',
  styleUrls: ['./kings-game.component.scss']
})
export class KingsGameComponent implements OnInit {
// this list changes order to reflect what's displayed on screen
  kings = [
  'King 1',
  'King 2',
  'King 3',
  'King 4',
  'King 5',
  'King 6'
];

  // this list contains the correct order to compare user's list against
correctKings = [
  'King 1',
  'King 2',
  'King 3',
  'King 4',
  'King 5',
  'King 6'
];
// flag to indicate the order is correct
correctOrder = false;

  constructor() { }

  ngOnInit(): void {
   this.shuffleKings();
  }

  shuffleKings() {
    // shuffle list until incorrect
    this.kings = shuffle(this.kings);
    while (this.compareOrder(this.kings)) {
      this.kings = shuffle(this.kings);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.kings, event.previousIndex, event.currentIndex);

    // if order is correct
    if (this.compareOrder(this.kings)) {
      this.triggerWin();
    }
  }

  compareOrder(userList) {
    let match = false;

    // compare each index in the correct and user generated list. If any of them are false then stop looking
    for (let index = 0; index < this.kings.length; index++) {
     if (this.correctKings[index] === userList[index]) {
       match = true;
     } else {
       return false;
     }
   }
    return true;
  }

  triggerWin() {
    this.correctOrder = true;
  }

  reset() {
    this.correctOrder = false;
    this.shuffleKings();
  }


}
