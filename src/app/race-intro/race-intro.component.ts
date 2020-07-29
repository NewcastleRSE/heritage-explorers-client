import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-race-intro',
  templateUrl: './race-intro.component.html',
  styleUrls: ['./race-intro.component.scss']
})
export class RaceIntroComponent implements OnInit {
  p1Square;
  p2Square;
  currentPlayer;
  winningMessage;
  lastRoll;
  rolls = [1, 2, 3, 4];

  audio;

// counter positioning
  p1Top;
  p1Left;
  p2Top;
  p2Left;

  p1Counter;
  p2Counter;

  p1Name;
  p2Name;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.audio = new Audio();
  }

  readyToPlay() {
    this.audio.pause();
    this.router.navigate(['game']);
  }

  returnToWelcome() {
    this.audio.pause();
    this.router.navigate(['home']);
  }

  play() {
    this.audio.src = '../../assets/sounds/intros/raceIntro.mp3';
    this.audio.load();
    this.audio.play();
  }
}
