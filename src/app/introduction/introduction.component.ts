import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
 active = 1;

  constructor() { }

  ngOnInit(): void {
  }

clickedLink() {
    console.log('clicked');
}


}
