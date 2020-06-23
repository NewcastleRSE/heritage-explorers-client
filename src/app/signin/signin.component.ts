import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {GlobalsService} from '../globals.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  password: string;
  correctPassword: string;
message;
  return;

  constructor(
    private globalService: GlobalsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.correctPassword = 'HE2020';
    this.route.queryParams
      .subscribe(params => {
        if (params.return !== undefined) {
          this.return = params.return;
        } else {
          this.return = '';
        }
      });
  }


  onSubmit() {
    if (this.password === this.correctPassword) {
      this.globalService.setPasswordEntered(true);
      this.setSession();
      console.log('return:' + this.return);
      this.router.navigateByUrl(this.return);
    } else {
      this.password = '';
      this.message = 'Incorrect password, please try again';
    }
  }


  setSession() {
    const expiresAt = moment().add(2, 'hour');

    localStorage.setItem('id_token', 'loggedIn');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
