import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-cosmorama-game-main',
  templateUrl: './cosmorama-game-main.component.html',
  styleUrls: ['./cosmorama-game-main.component.scss']
})
export class CosmoramaGameMainComponent implements OnInit {
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

  @HostListener('window:keyup', ['$event'])
  getKeyAndMove(e: KeyboardEvent){
    const keyCode = e.key;
    console.log(keyCode);
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
    this.backgroundLeft = parseInt(this.backgroundLeft) - 5 + 'px';
  }
  moveUp(){
    this.backgroundTop = parseInt(this.backgroundTop) - 5 + 'px';
  }
  moveRight(){
    this.backgroundLeft = parseInt(this.backgroundLeft) + 5 + 'px';
  }
  moveDown(){
    this.backgroundTop = parseInt(this.backgroundTop) + 5 + 'px';
  }

}
