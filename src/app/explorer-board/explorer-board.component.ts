import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import ImageMap from "image-map";
import {Router} from '@angular/router';

@Component({
  selector: 'app-explorer-board',
  templateUrl: './explorer-board.component.html',
  styleUrls: ['./explorer-board.component.scss']
})
export class ExplorerBoardComponent implements OnInit, AfterViewChecked {
squareNumber;


  constructor(
    private router: Router
  ) { }


  ngOnInit(): void {

  }



  ngAfterViewChecked() {
     ImageMap('img[usemap]');
  }


  clickSquare(squareNumber) {
    console.log(squareNumber);
    switch (squareNumber) {
      // todo add holding message for other squares
      case 3:
        this.router.navigate(['kingsintro'], { queryParams: { i: true}});
        break;
      case 11:
        this.router.navigate(['museumintro'], { queryParams: { i: true}});
        break;
      case 14:
        this.router.navigate(['cosmointro'], { queryParams: { i: true}});
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

play() {
  const audio = new Audio();
  audio.src = '../../assets/sounds/intros/Beefeater.m4a';
  audio.load();
  audio.play();
}

}
// coords="737,595,99,117"
// coords="803,93,1444,579"
