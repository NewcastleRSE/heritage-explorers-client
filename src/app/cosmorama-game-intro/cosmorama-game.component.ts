import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cosmorama-game',
  templateUrl: './cosmorama-game.component.html',
  styleUrls: ['./cosmorama-game.component.scss']
})
export class CosmoramaGameComponent implements OnInit {
// page shows intro and completion messages depending on flag
  introShowing: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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

  clickWindow1() {
    this.router.navigate(['cosmogamemain']);
  }

  returnToBoard() {
    this.router.navigate(['/explorer']);
  }
}

