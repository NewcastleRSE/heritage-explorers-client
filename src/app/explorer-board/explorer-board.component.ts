import { Component, OnInit } from '@angular/core';
import ImageMap from 'image-map';

@Component({
  selector: 'app-explorer-board',
  templateUrl: './explorer-board.component.html',
  styleUrls: ['./explorer-board.component.scss']
})
export class ExplorerBoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    ImageMap('img[usemap]');
  }

  clickSquare(squareNumber) {
    console.log(squareNumber);
  }

}
