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


const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'game', component: GameComponent},
  { path: 'counters', component: CountersComponent},
  { path: 'explorer', component: ExplorerBoardComponent},
  { path: 'museumgame', component: MuseumGameComponent},
  { path: 'kingsgame', component: KingsGameComponent},
  { path: 'cosmointro', component: CosmoramaGameComponent},
  { path: 'cosmogamemain', component: CosmoramaGameMainComponent},
  { path: 'three', component: Square3Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
