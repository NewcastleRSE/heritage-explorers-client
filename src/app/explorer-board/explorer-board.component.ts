import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import ImageMap from "image-map";
import {Router} from '@angular/router';

@Component({
  selector: 'app-explorer-board',
  templateUrl: './explorer-board.component.html',
  styleUrls: ['./explorer-board.component.scss']
})
export class ExplorerBoardComponent implements OnInit {
squareNumber;
audio;

  constructor(
    private router: Router
  ) { }


  ngOnInit(): void {
this.audio = new Audio();
  }



  // ngAfterViewChecked() {
  //    ImageMap('img[usemap]');
  // }


  clickSquare(squareNumber) {
    // stop speaking
    this.audio.pause();

    console.log(squareNumber);
    switch (squareNumber) {
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

  this.audio.src = '../../assets/sounds/intros/Beefeater.m4a';
  this.audio.load();
  this.audio.play();
}

}
// coords="737,595,99,117"
// coords="803,93,1444,579"
