import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  playGame() {
    this.router.navigate(['welcome']);
  }

  viewInfo() {
    this.router.navigate(['intro']);
  }

  openImage() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/board'])
    );

    window.open(url, '_blank');
  }
}
