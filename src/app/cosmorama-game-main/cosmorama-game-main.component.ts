import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-cosmorama-game-main',
  templateUrl: './cosmorama-game-main.component.html',
  styleUrls: ['./cosmorama-game-main.component.scss']
})
export class CosmoramaGameMainComponent implements OnInit, AfterViewInit {
  objImage;
  backgroundTop;
  backgroundLeft;


  constructor() { }

  ngOnInit(): void {
    this.backgroundTop = 0;
    this.backgroundLeft = 0;
    // this.objImage = document.getElementById('backgroundImg');
    // this.objImage.style.position = 'relative';
    // this.objImage.style.left = '0px';
    // this.objImage.style.top = '0px';


  }

  ngAfterViewInit() {
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

  }

  @HostListener('window:keyup', ['$event'])
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
    this.backgroundLeft = parseInt(this.backgroundLeft) - 20 + 'px';
    console.log(this.backgroundLeft);
  }
  moveUp(){
    this.backgroundTop = parseInt(this.backgroundTop) - 20 + 'px';
  }
  moveRight(){
    this.backgroundLeft = parseInt(this.backgroundLeft) + 20 + 'px';
  }
  moveDown(){
    this.backgroundTop = parseInt(this.backgroundTop) + 20 + 'px';
  }

// tick found items
  check(itemNo) {
    const itemCode = 'item' + itemNo;
    document.getElementById(itemCode).classList.add('active');
    document.getElementById(itemCode).innerHTML += '   &#10003;';
  }

}
