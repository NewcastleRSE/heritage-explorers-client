import { Component, OnInit } from '@angular/core';
import ImageMap from 'image-map';
import {Router} from '@angular/router';

@Component({
  selector: 'app-explorer-board',
  templateUrl: './explorer-board.component.html',
  styleUrls: ['./explorer-board.component.scss']
})
export class ExplorerBoardComponent implements OnInit {
squareNumber;

  constructor(
    private router: Router
  ) { }

  // todo fix bug that means the map isn't clickable until you refresh the page

  ngOnInit(): void {
    ImageMap('img[usemap]');
  }

  clickSquare(squareNumber) {
    console.log(squareNumber);
    switch (squareNumber) {
      // todo add holding message for other squares
      case 3:
        this.router.navigate(['kingsgame']);
        break;
      case 11:
        this.router.navigate(['museumgame']);
        break;
      case 14:
        this.router.navigate(['cosmointro']);
    }
  }

  viewTitle(squareNumber) {
   this.squareNumber = squareNumber;
  }

  removeTitle() {
    this.squareNumber = '';
  }

}
