import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GlobalsService} from '../globals.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
audio;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private globals: GlobalsService
  ) { }

  ngOnInit(): void {
    this.audio = new Audio();

  }

  playGame() {
    this.audio.pause();
    this.router.navigate(['players']);
  }

  viewRules(rulesModal) {
    this.modalService.open(rulesModal);
  }

  playExplorer() {
    this.audio.pause();
    this.router.navigate(['explorer']);
  }

  play() {
    this.audio.src = '../../assets/sounds/intros/Raven.m4a';
    this.audio.load();
    this.audio.play();
  }

}
