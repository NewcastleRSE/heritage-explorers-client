import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-kings-intro',
  templateUrl: './kings-intro.component.html',
  styleUrls: ['./kings-intro.component.scss']
})
export class KingsIntroComponent implements OnInit {
// page shows intro and completion messages depending on flag
  introShowing: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // check if showing intro our well done message
    this.route.queryParams
      .subscribe(params => {
        console.log(typeof params.i);
        if (params.i === 'false') {
          console.log('intro is false');
          this.introShowing = false;
          console.log('intro' + this.introShowing);
        } else if (params.i === 'true') {
          this.introShowing = true;
        }

      });
  }


  finishMeyrick() {
    this.router.navigate(['kingsgame']);
  }

  returnToBoard() {
    this.router.navigate(['/explorer']);
  }

}
