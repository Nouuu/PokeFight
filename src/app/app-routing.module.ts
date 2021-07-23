import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArenaComponent } from './features/arena/arena.component';
import { ListComponent } from './features/pokeselect/list/list.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'fight/:poke1/:poke2', component: ArenaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
