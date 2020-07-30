import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-race-win',
  templateUrl: './race-win.component.html',
  styleUrls: ['./race-win.component.scss']
})
export class RaceWinComponent implements OnInit {
winner;
pool;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
       this.winner = params.w;
       this.pool = params.p
      });

  }

newPlayers() {
  this.router.navigate(['players']);
}

readyToPlay() {
    this.router.navigate(['game']);
}

returnToWelcome() {
    this.router.navigate(['home']);
}

}
