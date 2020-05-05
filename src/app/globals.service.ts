import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  player1Counter;
  player2Counter;
  player1Name;
  player2Name;

  constructor() {
  }
}
