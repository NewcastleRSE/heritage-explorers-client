import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import ImageMap from "image-map";

@Component({
  selector: 'app-cosmorama-game',
  templateUrl: './cosmorama-game.component.html',
  styleUrls: ['./cosmorama-game.component.scss']
})
export class CosmoramaGameComponent implements OnInit {
// page shows intro and completion messages depending on flag
  introShowing: boolean;
audio;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.audio = new Audio();
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

  // ngAfterViewChecked() {
  //  ImageMap('img[usemap]');
  // }

  play() {

    this.audio.src = '../../assets/sounds/intros/CosmoLadyI.m4a';
    this.audio.load();
    this.audio.play();
  }

  clickWindow1() {
    // stop speaking
    this.audio.pause();

    this.router.navigate(['cosmogamemain']);
  }

  returnToBoard() {
    // stop speaking
    this.audio.pause();
    this.router.navigate(['/explorer']);
  }
}

