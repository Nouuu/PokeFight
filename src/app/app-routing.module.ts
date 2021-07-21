import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectionComponent } from './features/pokeselect/selection/selection.component';

export const routes: Routes = [
  { path: 'selection', component: SelectionComponent },
  { path: 'fight/:poke1/:poke2', component: SelectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
