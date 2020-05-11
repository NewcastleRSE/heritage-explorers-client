import { Component, OnInit } from '@angular/core';
import ImageMap from 'image-map';

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

  constructor() { }

  ngOnInit(): void {
    ImageMap('img[usemap]');
  }

  foundItem(itemName) {
    console.log('found ' + itemName);

    switch(itemName) {
      case
    }
    this.sarco = true;
  }


}
