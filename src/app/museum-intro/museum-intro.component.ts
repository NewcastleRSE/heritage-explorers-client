import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-museum-intro',
  templateUrl: './museum-intro.component.html',
  styleUrls: ['./museum-intro.component.scss']
})
export class MuseumIntroComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  playGame() {
    this.router.navigate(['museumgame']);
  }

returnToBoard() {
    this.router.navigate(['explorer']);
}
}
