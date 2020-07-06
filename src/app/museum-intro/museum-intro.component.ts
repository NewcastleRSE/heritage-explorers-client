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

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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
    this.router.navigate(['museumgame']);
  }

  play() {
    const audio = new Audio();
    audio.src = '../../assets/sounds/intros/BritishMuseumGuide.mp3';
    audio.load();
    audio.play();
  }

returnToBoard() {
    this.router.navigate(['explorer']);
}
}
