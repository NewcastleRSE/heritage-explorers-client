import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './game/game.component';
import {CountersComponent} from './counters/counters.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ExplorerBoardComponent} from './explorer-board/explorer-board.component';
import {MuseumGameComponent} from './museum-game/museum-game.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'game', component: GameComponent},
  { path: 'counters', component: CountersComponent},
  { path: 'explorer', component: ExplorerBoardComponent},
  { path: 'museumgame', component: MuseumGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
