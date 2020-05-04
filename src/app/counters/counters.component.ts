import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.scss']
})
export class CountersComponent implements OnInit {
player1Choosing: boolean;
player2Choosing: boolean;

  constructor() { }

  ngOnInit(): void {
    this.player1Choosing = true;
    this.player2Choosing = false;
  }

 player1Finished() {
  this.player1Choosing = false;
  this.player2Choosing = true;
 }


 player2Finished() {
    // nav to game
 }
}
