import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-cosmorama-game-main',
  templateUrl: './cosmorama-game-main.component.html',
  styleUrls: ['./cosmorama-game-main.component.scss']
})
export class CosmoramaGameMainComponent implements OnInit, AfterViewInit {
  objImage;
  backgroundTop;
  backgroundLeft;

  upIsPressing = false;
pressingTimer;

  constructor(
    private elementRef: ElementRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    // todo start cosmo background image in the centre


  this.backgroundTop = 0;
  this.backgroundLeft = 0;

    // this.objImage = document.getElementById('backgroundImg');
    // this.objImage.style.position = 'relative';
    // this.objImage.style.left = '0px';
    // this.objImage.style.top = '0px';


  }

  ngAfterViewInit() {
    // this.backgroundLeft = 2000;
    // console.log(this.backgroundLeft);

    // get height and width of background image
    const imageSrc = document
      .getElementById('c2')
      .style
      .backgroundImage
      .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
      .split(',')[0];
    const image = new Image();
    image.src = imageSrc;

    const width = image.width;
    const height = image.height;

    console.log('h = ' + height);
    console.log('w = ' + width);
    // document.getElementById('up').addEventListener('mousedown', this.upOnDown.bind(this));
    // document.getElementById('up').addEventListener('mouseup', this.upOnUp.bind(this));

  }

  returnToBoard() {
    this.router.navigate(['/explorer']);
  }

//   upOnDown(event) {
//     console.log('up');
//     // this.upIsPressing = true;
//     this.startUpMoving();
//   }
//
// startUpMoving() {
//     console.log('start pressing');
//   this.pressingTimer = setInterval(this.moveUp, 5000);
// }
//   upOnUp() {
//     console.log('stop');
//     clearInterval(this.pressingTimer);
//
//     // when user stops pressing key change long pressing flag to false
//     // this.upIsPressing = false;
//   }

  @HostListener('window:keydown', ['$event'])
  getKeyAndMove(e: KeyboardEvent){
    // prevent default which is to move around the page
    e.preventDefault();

    const keyCode = e.key;
    switch (keyCode){
      case 'ArrowLeft':
        this.moveRight();
        break;
      case 'ArrowUp':
        this.moveDown();
        break;
      case 'ArrowRight':
        this.moveLeft();
        break;
      case 'ArrowDown':
        this.moveUp();
        break;
    }
  }
  moveLeft(){
    if (parseInt(this.backgroundLeft) >= -4185) {
      this.backgroundLeft = parseInt(this.backgroundLeft) - 10 + 'px';

    }

  }
  moveUp(){
    if (parseInt(this.backgroundTop) >= -530) {
      this.backgroundTop = parseInt(this.backgroundTop) - 10 + 'px';

    }
  }
  moveRight(){
    if (parseInt(this.backgroundLeft) <= 90) {
      this.backgroundLeft = parseInt(this.backgroundLeft) + 10 + 'px';

    }
  }
  moveDown(){
    if (parseInt(this.backgroundTop) <= 90) {
      this.backgroundTop = parseInt(this.backgroundTop) + 10 + 'px';
    }

  }




// tick found items
  check(itemNo) {
    const itemCode = 'item' + itemNo;
    document.getElementById(itemCode).classList.add('active');
    document.getElementById(itemCode).innerHTML += '   &#10003;';
  }

  clicked() {
    console.log('clicked');
  }


}
