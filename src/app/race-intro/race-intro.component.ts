import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-race-intro',
  templateUrl: './race-intro.component.html',
  styleUrls: ['./race-intro.component.scss']
})
export class RaceIntroComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  readyToPlay() {
    this.router.navigate(['game']);
  }

  returnToWelcome() {
    this.router.navigate(['home']);
  }
}
