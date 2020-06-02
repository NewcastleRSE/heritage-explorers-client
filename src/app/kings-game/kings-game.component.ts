import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {shuffle} from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'app-kings-game',
  templateUrl: './kings-game.component.html',
  styleUrls: ['./kings-game.component.scss']
})
export class KingsGameComponent implements OnInit {
meyrickVisible;
kingsVisible;
viewingHelp;

// this list changes order to reflect what's displayed on screen
  kings = [
    { id : 1, name : 'Edward I', filename: 'edi.PNG', helpText : 'I was born etc.'},
    { id : 2, name : 'Henry VI', filename: 'henvi.png',  helpText : 'I was alive during etc.'},
    { id : 3, name : 'Edward IV', filename: 'ediv.png', helpText : 'I died in etc.'},
    { id : 4, name : 'Henry VII', filename: 'henvii.png',  helpText : 'I was born etc.'},
    { id : 5, name : 'Edward VI', filename: 'edvi.png', helpText : 'I was alive during etc.'},
    { id : 6, name : 'James I', filename: 'jami.png', helpText : 'I died in etc.'},
    { id : 7, name : 'Charles I', filename: 'chasi.png', helpText : 'I was alive during etc.'},
    { id : 8, name : 'James II', filename: 'jamii.png', helpText : 'I died in etc.'}
];

  // this list contains the correct order to compare user's list against
correctKings = [
  { id : 1, name : 'King 1'},
  { id : 2, name : 'King 2'},
  { id : 3, name : 'King 3'},
  { id : 4, name : 'King 4'},
  { id : 5, name : 'King 5'},
  { id : 6, name : 'King 6'},
  { id : 7, name : 'King 6'},
  { id : 8, name : 'King 6'}
];

// king currently displaying as help
  viewingHelpKings = [];

// flag to indicate the order is correct
correctOrder = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
   this.shuffleKings();
   this.meyrickVisible = true;
   this.kingsVisible = false;
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


  viewHelp(kingId) {
    // if there is currently a card in viewing help list, then make it visible again and remove from list
    if (this.viewingHelpKings.length > 0) {
      const kingId = this.viewingHelpKings[0].id;
      document.getElementById(kingId).classList.remove('invisible');

        // clear list of any previous cards
      this.viewingHelpKings = [];
    }

    document.getElementById(kingId).classList.add('invisible');
    this.viewingHelp = true;

    const copiedList = this.kings;
    // add king to viewing list
    for (let i = 0; i < this.kings.length; i++) {
      if (copiedList[i].id === kingId){
       this.viewingHelpKings.push(copiedList[i]);
      }
    }
    }

  closeHelp(kingId) {
    document.getElementById(kingId).classList.remove('invisible');
    this.viewingHelp = false;

    console.log('close');
    const copiedList = this.kings;
    for (let i = 0; i < this.kings.length; i++) {
      if (copiedList[i].id === kingId){

        this.viewingHelpKings = [];
        // this.kings = copiedList;
        // console.log(this.kings[i].viewHelp);
      }
    }
  }

  finishMeyrick() {
    this.meyrickVisible = false;
    this.kingsVisible = true;
  }

  returnToBoard() {
    this.router.navigate(['/explorer']);
  }
}
