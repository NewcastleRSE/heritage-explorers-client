import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { CountersComponent } from './counters/counters.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { ExplorerBoardComponent } from './explorer-board/explorer-board.component';
import {InfoModal, MuseumGameComponent} from './museum-game/museum-game.component';
import { Square3Component } from './square3/square3.component';
import { KingsGameComponent } from './kings-game/kings-game.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CosmoramaGameComponent } from './cosmorama-game-intro/cosmorama-game.component';
import { CosmoramaGameMainComponent } from './cosmorama-game-main/cosmorama-game-main.component';
import { ExplorerIntroComponent } from './explorer-intro/explorer-intro.component';
import { SigninComponent } from './signin/signin.component';
import { PasswordDirective } from './password.directive';
import { KingsIntroComponent } from './kings-intro/kings-intro.component';
import { MuseumIntroComponent } from './museum-intro/museum-intro.component';
import { RaceIntroComponent } from './race-intro/race-intro.component';
import { RaceWinComponent } from './race-win/race-win.component';
import { PlayerConfigComponent } from './player-config/player-config.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { BoardComponent } from './board/board.component';
import { SplashComponent } from './splash/splash.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CountersComponent,
    WelcomeComponent,
    ExplorerBoardComponent,
    MuseumGameComponent,
    Square3Component,
    KingsGameComponent,
    CosmoramaGameComponent,
    CosmoramaGameMainComponent,
    ExplorerIntroComponent,
    SigninComponent,
    PasswordDirective,
    PasswordDirective,
    KingsIntroComponent,
    MuseumIntroComponent,
    RaceIntroComponent,
    RaceWinComponent,
    PlayerConfigComponent,
    IntroductionComponent,
    ScrollSpyDirective,
    BoardComponent,
    SplashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [InfoModal, Square3Component]
})
export class AppModule { }
