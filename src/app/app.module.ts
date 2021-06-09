import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LikeButtonComponent} from './features/like-button/like-button.component';
import {PokemonComponent} from './features/pokemon/pokemon.component';
import {LogComponent} from './features/log/log.component';
import {PokebuildService} from './utils/pokebuild.service';
import {HttpClientModule} from '@angular/common/http';
import {FightService} from './utils/fight.service';
import {LogService} from './utils/log.service';

@NgModule({
  declarations: [
    AppComponent,
    LikeButtonComponent,
    PokemonComponent,
    LogComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PokebuildService, FightService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
