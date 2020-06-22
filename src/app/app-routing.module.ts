import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './game/game.component';
import {CountersComponent} from './counters/counters.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ExplorerBoardComponent} from './explorer-board/explorer-board.component';
import {MuseumGameComponent} from './museum-game/museum-game.component';
import {Square3Component} from './square3/square3.component';
import {KingsGameComponent} from './kings-game/kings-game.component';
import {CosmoramaGameComponent} from './cosmorama-game-intro/cosmorama-game.component';
import {CosmoramaGameMainComponent} from './cosmorama-game-main/cosmorama-game-main.component';
import {ExplorerIntroComponent} from './explorer-intro/explorer-intro.component';
import {RouteGuardService} from './route-guard.service';
import {SigninComponent} from './signin/signin.component';
import {KingsIntroComponent} from './kings-intro/kings-intro.component';
import {MuseumIntroComponent} from './museum-intro/museum-intro.component';
import {RaceIntroComponent} from './race-intro/race-intro.component';
import {RaceWinComponent} from './race-win/race-win.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [RouteGuardService]},
  { path: 'home', component: WelcomeComponent, canActivate: [RouteGuardService]},
  { path: 'game', component: GameComponent, canActivate: [RouteGuardService]},
  { path: 'counters', component: CountersComponent, canActivate: [RouteGuardService]},
  { path: 'explorer', component: ExplorerBoardComponent, canActivate: [RouteGuardService]},
  { path: 'explorerintro', component: ExplorerIntroComponent, canActivate: [RouteGuardService]},
  { path: 'museumgame', component: MuseumGameComponent, canActivate: [RouteGuardService]},
  { path: 'kingsgame', component: KingsGameComponent, canActivate: [RouteGuardService]},
  { path: 'kingsintro', component: KingsIntroComponent, canActivate: [RouteGuardService]},
  { path: 'cosmointro', component: CosmoramaGameComponent, canActivate: [RouteGuardService]},
  { path: 'museumintro', component: MuseumIntroComponent, canActivate: [RouteGuardService]},
  { path: 'cosmogamemain', component: CosmoramaGameMainComponent, canActivate: [RouteGuardService]},
  { path: 'three', component: Square3Component, canActivate: [RouteGuardService]},
  { path: 'raceintro', component: RaceIntroComponent, canActivate: [RouteGuardService]},
  { path: 'win', component: RaceWinComponent, canActivate: [RouteGuardService]},
  {path: 'signin', component: SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
