import { Component, OnInit } from '@angular/core';
import ImageMap from 'image-map';
import {Router} from '@angular/router';

@Component({
  selector: 'app-explorer-board',
  templateUrl: './explorer-board.component.html',
  styleUrls: ['./explorer-board.component.scss']
})
export class ExplorerBoardComponent implements OnInit {
squareTitle;

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

    }
  }

  viewTitle(squareNumber) {
    switch (squareNumber) {
      // todo add holding message for other squares
      case 11:
        this.squareTitle = 'British Museum hidden objects';
        break;
      case 12:
        this.squareTitle = "St Paul's and Blackfriars Bridge";
        break;
    }
  }

  removeTitle() {
    this.squareTitle = '';
  }

}
