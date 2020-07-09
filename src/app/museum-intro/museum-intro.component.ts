import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-museum-intro',
  templateUrl: './museum-intro.component.html',
  styleUrls: ['./museum-intro.component.scss']
})
export class MuseumIntroComponent implements OnInit {
// page shows intro and completion messages depending on flag
  introShowing: boolean;
  audio;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.audio = new Audio();

    // check if showing intro our well done message
    this.route.queryParams
      .subscribe(params => {
        console.log(typeof params.i);
        if (params.i === 'false') {
          console.log('intro is false');
          this.introShowing = false;
          console.log('intro' + this.introShowing);
        } else if (params.i === 'true') {
          this.introShowing = true;
        }

      });
  }

  playGame() {
    // stop speaking
    this.audio.pause();

    this.router.navigate(['museumgame']);
  }

  play() {
    this.audio.src = '../../assets/sounds/intros/BritishMuseumGuide.mp3';
    this.audio.load();
    this.audio.play();
  }

returnToBoard() {
  // stop speaking
  this.audio.pause();

  this.router.navigate(['explorer']);
}
}
