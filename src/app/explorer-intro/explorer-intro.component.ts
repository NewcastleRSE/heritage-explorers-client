import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-explorer-intro',
  templateUrl: './explorer-intro.component.html',
  styleUrls: ['./explorer-intro.component.scss']
})
export class ExplorerIntroComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  viewBoard() {
    this.router.navigate(['explorer']);
  }

}
