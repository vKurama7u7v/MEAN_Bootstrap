import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// componentes
import { ListadoComponent } from './core/components/listado/listado.component';

const routes: Routes = [
  { path: '', component: ListadoComponent },
  { path: 'index', component: ListadoComponent },

  // si la ruta no existe
  { path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
