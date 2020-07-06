import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  playGame() {
    this.router.navigate(['counters']);
  }

  viewRules(rulesModal) {
    this.modalService.open(rulesModal);
  }

  playExplorer() {
    this.router.navigate(['explorer']);
  }

  play() {
    const audio = new Audio();
    audio.src = '../../assets/sounds/intros/Raven.m4a';
    audio.load();
    audio.play();
  }

}
