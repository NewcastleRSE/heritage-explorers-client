import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cosmorama-game',
  templateUrl: './cosmorama-game.component.html',
  styleUrls: ['./cosmorama-game.component.scss']
})
export class CosmoramaGameComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  clickWindow1() {
    this.router.navigate(['cosmogamemain']);
  }

}

