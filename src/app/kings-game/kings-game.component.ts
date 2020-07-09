import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {shuffle} from 'lodash';
import {Router} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-kings-game',
  templateUrl: './kings-game.component.html',
  styleUrls: ['./kings-game.component.scss']
})
export class KingsGameComponent implements OnInit {
meyrickVisible;
kingsVisible;
viewingHelp;
audio;

// this list changes order to reflect what's displayed on screen
  kings = [
    { id : 1, name : 'Edward I', filename: 'edi.PNG', helpText : 'I was born etc.'},
    { id : 2, name : 'Henry VI', filename: 'henvi.png',  helpText : 'I was alive during etc.'},
    { id : 3, name : 'Edward IV', filename: 'ediv.png', helpText : 'I died in etc.'},
    { id : 4, name : 'Henry VII', filename: 'henvii.png',  helpText : 'I was born etc.'},
    { id : 5, name : 'Henry VIII', filename: 'henviii.png',  helpText : 'I was born etc.'},
    { id : 6, name : 'Edward VI', filename: 'edvi.png', helpText : 'I was alive during etc.'},
    { id : 7, name : 'James I', filename: 'jami.png', helpText : 'I died in etc.'},
    { id : 8, name : 'Charles I', filename: 'chasi.png', helpText : 'I was alive during etc.'},
    { id : 9, name : 'James II', filename: 'jamii.png', helpText : 'I died in etc.'}
];

  bigCardList = [
    { id : 1, name : 'Edward I', filename: 'edi.PNG', bio: 'Born 1239. Became king 1272. Died in 1307 ', house: 'Plantagenet', region: 'King of England', helpText : 'My nickname was ‘longshanks’ because I was so tall.\n' +
        'On Crusade an assassin wounded me with a poison dagger.\n' +
        'During my reign, England and Scotland were at war. I fought against William Wallace – you may have heard of him?\n'},
    { id : 2, name : 'Henry VI', filename: 'henvi.png', bio: 'Born 1421. Became king 1422. Died 1471 ', house: 'Lancaster', region: 'King of England',  helpText : 'My father was the famous Henry V who won the battle of Agincourt.\n' +
        'During my reign, the Wars of the Roses began – when different nobles fought against each other to rule England. I was imprisoned by Edward IV and died in the Tower of London.'},
    { id : 3, name : 'Edward IV', filename: 'ediv.png', bio: 'Born 1442. Became king 1461. Died in 1483 ', house: 'York', region: 'King of England',  helpText : 'My sons (Edward and Richard) were the famous Princes in the Tower. Some say they were murdered by their uncle Richard III.\n' +
        'The Wars of the Roses continued during my reign.\n'},
    { id : 4, name : 'Henry VII', filename: 'henvii.png', bio: 'Born 1457. Became king 1485. Died 1509 ', house: 'Tudor', region: 'King of England', helpText : 'I defeated King Richard III at the Battle of Bosworth in 1485 to become King of England.\n' +
        'My eldest son Prince Arthur died at Ludlow castle in 1502.\n' +
        'When I died, my second son Henry became King Henry VIII. \n'},
    { id : 5, name : 'Henry VIII', filename: 'henviii.png', bio: 'Born 1491. Became king 1509. Died 1547 ', house: 'Tudor', region: 'King of England',
      helpText : 'I had six wives – can you name them all?  \n' +
        'My first wife Catherine of Aragon was previously married to my brother Arthur.\n' +
        'I started the English Reformation, when the Church of England broke away from the Catholic Church in Rome, so that I could annul my marriage with Catherine.'},
    { id : 6, name : 'Edward VI', filename: 'edvi.png', bio: 'Born 1537. Became king 1547. Died 1553 ', house: 'Tudor', region: 'King of England',  helpText : 'I became King at age 9 ½ and died at age 15.\n' +
        'My father was Henry VIII.\n' +
        'When I died my cousin Jane became Queen. She ruled for 9 days. \n'},
    { id : 7, name : 'James I', filename: 'jami.png', bio: 'Born 1566. Became king of England 1603. Died 1625 ', house: 'Stuart', region: 'King of England and Scotland', helpText : 'Before I was king of England I was the King of Scotland. After the death of Elizabeth I, I ruled England too.\n' +
        'The Gunpowder plot – an attempt to blow up Parliament – happened in 1605.\n' +
        'During my reign, the famous explorer and spy Sir Walter Raleigh was executed.\n'},
    { id : 8, name : 'Charles I', filename: 'chasi.png', bio: 'Born 1600. Became king 1625. Died 1649 ', house: 'Stuart', region: 'King of England, Scotland and Ireland',
      helpText : 'The English Civil Wars started during my reign.  The Parliamentarians fought against me and the Royalists or Cavaliers fought with me. The Royalists believed that a king should rule by divine right – that is, I shouldn’t have to do what Parliament wants.\n' +
        'I was executed in 1649.\n' +
        'After my reign, England did not have a king. Oliver Cromwell ruled as Lord Protector.  \n'},
    { id : 9, name : 'James II', filename: 'jamii.png', bio: 'Born 1633. Became king 1685. Died 1701 ', house: 'Stuart', region: 'King of England, Scotland and Ireland',
      helpText : 'I was the last Catholic ruler on the throne of England. But I was forced to give it up in favour of my Protestant daughter Mary and her Dutch husband, William of Orange, and I fled to France. My son, James, led a rebellion against King George I. His supporters called themselves the Jacobites.'}
  ];

  // this list contains the correct order to compare user's list against
correctKings = [
  { id : 1, name : 'King 1'},
  { id : 2, name : 'King 2'},
  { id : 3, name : 'King 3'},
  { id : 4, name : 'King 4'},
  { id : 5, name : 'King 5'},
  { id : 6, name : 'King 6'},
  { id : 7, name : 'King 7'},
  { id : 8, name : 'King 8'},
  { id : 9, name : 'King 9'}
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
   this.viewingHelp = false;
   this.audio = new Audio();
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
      this.correctOrder = true;
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

  // triggerWin() {
  //   // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //   //   this.router.navigate(['kingsintro'], { queryParams: { i: false}});
  //   // });
  //
  //
  // }

  reset() {
    // if viewing help, get this card's id and close it
    this.closeAnyHelp();

    this.correctOrder = false;
    this.shuffleKings();

  }

  closeAnyHelp() {
    if (this.viewingHelp === true) {
      this.closeHelp(this.viewingHelpKings[0].id);
    }
  }

  viewHelp(kingId) {
// stop king speaking
    this.audio.pause();

    // if there is currently a card in viewing help list, then make it visible again and remove from list
    if (this.viewingHelpKings.length > 0) {
      const kingId = this.viewingHelpKings[0].id;
      document.getElementById(kingId).classList.remove('invisible');

        // clear list of any previous cards
      this.viewingHelpKings = [];
    }

    // make little king card temporarily invisible
    document.getElementById(kingId).classList.add('invisible');
    this.viewingHelp = true;

    const bigCardList = this.bigCardList;
    // add big king card to viewing list
    for (let i = 0; i < this.kings.length; i++) {
      if (bigCardList[i].id === kingId){
       this.viewingHelpKings.push(bigCardList[i]);
      }
    }
    }

    setToCorrectOrder() {
    this.closeAnyHelp();
    this.kings = _.sortBy(this.kings, ['id']);
    this.correctOrder = true;
    }

  closeHelp(kingId) {
    // stop king speaking
    this.audio.pause();

    document.getElementById(kingId).classList.remove('invisible');
    this.viewingHelp = false;

    console.log('close');
    const copiedList = this.kings;
    for (let i = 0; i < this.kings.length; i++) {
      if (copiedList[i].id === kingId){

        this.viewingHelpKings = [];
      }
    }
  }



  returnToBoard() {
    this.router.navigate(['/explorer']);
  }

  playClue(kingsID) {
    this.audio.src = '../../assets/sounds/kings/' + kingsID + '.mp3';
    this.audio.load();
    this.audio.play();
  }
}
