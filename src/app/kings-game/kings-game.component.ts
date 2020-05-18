import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {shuffle} from 'lodash';

@Component({
  selector: 'app-kings-game',
  templateUrl: './kings-game.component.html',
  styleUrls: ['./kings-game.component.scss']
})
export class KingsGameComponent implements OnInit {

  // display speech bubbles

// this list changes order to reflect what's displayed on screen
  kings = [
    { id : 1, name : 'King 1', filename: 'face.svg', viewHelp: false, helpText : 'I was born etc.'},
    { id : 2, name : 'King 2', filename: 'face.svg', viewHelp: false, helpText : 'I was alive during etc.'},
    { id : 3, name : 'King 3', filename: 'face.svg', viewHelp: false, helpText : 'I died in etc.'},
    { id : 4, name : 'King 4', filename: 'face.svg', viewHelp: false, helpText : 'I was born etc.'},
    { id : 5, name : 'King 5', filename: 'face.svg', viewHelp: false, helpText : 'I was alive during etc.'},
    { id : 6, name : 'King 6', filename: 'face.svg', viewHelp: false, helpText : 'I died in etc.'}
];

  // this list contains the correct order to compare user's list against
correctKings = [
  { id : 1, name : 'King 1'},
  { id : 2, name : 'King 2'},
  { id : 3, name : 'King 3'},
  { id : 4, name : 'King 4'},
  { id : 5, name : 'King 5'},
  { id : 6, name : 'King 6'}
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

    // compare each index in the correct and user generated list (comparing the id fields only). If any of them are false then stop looking
    for (let index = 0; index < this.kings.length; index++) {
     if (this.correctKings[index].id === userList[index].id) {
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

  // editing copied list and then updating full list to trigger changes in Angular
  viewHelp(kingId) {
    const copiedList = this.kings;
    for (let i = 0; i < this.kings.length; i++) {
      if (copiedList[i].id === kingId){
       copiedList[i].viewHelp = true;
       this.kings = copiedList;
       console.log(this.kings[i].viewHelp);
      }
    }
    }

  closeHelp(kingId) {
    console.log('close');
    const copiedList = this.kings;
    for (let i = 0; i < this.kings.length; i++) {
      if (copiedList[i].id === kingId){
        copiedList[i].viewHelp = false;
        this.kings = copiedList;
        console.log(this.kings[i].viewHelp);
      }
    }
  }
}
