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

  constructor(
    private globalService: GlobalsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.correctPassword = 'HE2020';
    this.globalService.setPasswordEntered(false);
  }


  onSubmit() {
    if (this.password === this.correctPassword) {
      this.globalService.setPasswordEntered(true);
      this.setSession();
      // navigate to home or to route saved in local storage
      const route = this.routeInLocal();
      const paramKey = localStorage.getItem('paramKey');
      const paramValue = localStorage.getItem('paramValue');
      console.log(route);
      if (route === undefined || route === null) {
        this.router.navigate(['/home']);
      } else {
        localStorage.removeItem('route');
        if (paramKey === null || paramValue === null) {
          this.router.navigate([route]);
        }
        else {
          localStorage.removeItem('paramKey');
          localStorage.removeItem('paramValue');
          this.router.navigate([route], {queryParams: {paramKey: paramValue}} );
        }

      }
    } else {
      this.password = '';
      this.message = 'Incorrect password, please try again';
    }
  }

  routeInLocal(): string {
    return localStorage.getItem('route');
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
