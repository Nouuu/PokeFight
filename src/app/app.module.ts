import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LikeButtonComponent} from './features/like-button/like-button.component';
import {PokemonComponent} from './features/pokemon/pokemon.component';
import {LogComponent} from './features/log/log.component';
import {Pokebuild} from './utils/pokebuild';

@NgModule({
  declarations: [
    AppComponent,
    LikeButtonComponent,
    PokemonComponent,
    LogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Pokebuild],
  bootstrap: [AppComponent]
})
export class AppModule {
}
