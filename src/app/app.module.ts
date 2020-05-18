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

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CountersComponent,
    WelcomeComponent,
    ExplorerBoardComponent,
    MuseumGameComponent,
    Square3Component,
    KingsGameComponent
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
