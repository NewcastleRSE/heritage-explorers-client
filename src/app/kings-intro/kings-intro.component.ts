import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-kings-intro',
  templateUrl: './kings-intro.component.html',
  styleUrls: ['./kings-intro.component.scss']
})
export class KingsIntroComponent implements OnInit {
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

  play() {
    this.audio.src = '../../assets/sounds/intros/Meyrick2.mp3';
    this.audio.load();
    this.audio.play();
  }

  finishMeyrick() {
    // stop speaking
    this.audio.pause();
    this.router.navigate(['kingsgame']);
  }

  returnToBoard() {
    // stop speaking
    this.audio.pause();
    this.router.navigate(['/explorer']);
  }

}
