import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-kings-intro',
  templateUrl: './kings-intro.component.html',
  styleUrls: ['./kings-intro.component.scss']
})
export class KingsIntroComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  finishMeyrick() {
    this.router.navigate(['kingsgame']);
  }

  returnToBoard() {
    this.router.navigate(['/explorer']);
  }

}
