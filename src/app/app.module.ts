import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LikeButtonComponent } from './features/like-button/like-button.component';
import { PokemonComponent } from './features/pokemon/pokemon.component';
import { LogComponent } from './features/log/log.component';
import { PokebuildService } from './utils/pokebuild.service';
import { HttpClientModule } from '@angular/common/http';
import { FightService } from './utils/fight.service';
import { LogService } from './utils/log.service';
import { LogDirective } from './features/log/log.directive';
import { CommonModule } from '@angular/common';
import { SelectionComponent } from './features/pokeselect/selection/selection.component';
import { ArenaComponent } from './features/arena/arena.component';

@NgModule({
  declarations: [
    LogDirective,
    AppComponent,
    LikeButtonComponent,
    PokemonComponent,
    LogComponent,
    SelectionComponent,
    ArenaComponent,
  ],
  imports: [CommonModule, HttpClientModule, BrowserModule, AppRoutingModule],
  providers: [PokebuildService, FightService, LogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
