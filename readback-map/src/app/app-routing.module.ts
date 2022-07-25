import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrewManagementComponent } from './crew-management/crew-management.component';
import { MyMapComponent } from './map/map.component';

const routes: Routes = [
  {
    component: MyMapComponent,
    path: 'kaart'
  },
  {
    component: CrewManagementComponent,
    path: 'ploegen'
  },
  {
    path: '',
    redirectTo: 'kaart',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
