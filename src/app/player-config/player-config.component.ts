import { Component, OnInit } from '@angular/core';
import {GlobalsService} from '../globals.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-player-config',
  templateUrl: './player-config.component.html',
  styleUrls: ['./player-config.component.scss']
})
export class PlayerConfigComponent implements OnInit {

  constructor(private globals: GlobalsService, private router: Router) { }

  ngOnInit(): void {
  }

  select(players) {
    this.globals.numberPlayers = players;
    this.router.navigate(['counters']);
  }
}
