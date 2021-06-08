import {Component} from '@angular/core';
import { Pokemon } from './models/Pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PokeFight';
  poke1 = new Pokemon({attack: 20, maxLife: 100, name: "evolie", speed: 30});
  poke2 = new Pokemon({attack: 25, maxLife: 120, name: "galopa", speed: 34});
}
