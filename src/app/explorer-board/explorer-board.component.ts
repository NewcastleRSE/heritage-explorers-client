import {AfterViewInit, Component, OnInit} from '@angular/core';
import ImageMap from 'image-map';
import {Router} from '@angular/router';

@Component({
  selector: 'app-explorer-board',
  templateUrl: './explorer-board.component.html',
  styleUrls: ['./explorer-board.component.scss']
})
export class ExplorerBoardComponent implements OnInit, AfterViewInit {
squareNumber;


  constructor(
    private router: Router
  ) { }


  ngOnInit(): void {

  }

  ngAfterViewInit() {
    ImageMap('img[usemap]');
  }

  clickSquare(squareNumber) {
    console.log(squareNumber);
    switch (squareNumber) {
      // todo add holding message for other squares
      case 3:
        this.router.navigate(['kingsintro']);
        break;
      case 11:
        this.router.navigate(['museumintro']);
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

returnToHome() {
    this.router.navigate(['home']);
}
}
// coords="737,595,99,117"
// coords="803,93,1444,579"
