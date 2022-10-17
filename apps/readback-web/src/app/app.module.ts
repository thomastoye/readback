import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { CrewComponent } from './components/crew/crew.component';
import { CrewEditComponent } from './components/crew-edit/crew-edit.component';
import { FormsModule } from '@angular/forms';
import { CrewPageComponent } from './pages/crew-page/crew-page.component';
import { InterventionPageComponent } from './pages/intervention-page/intervention-page.component';
import { PeoplePageComponent } from './people-page/people-page.component';

const routes: Routes = [
  {
    path: 'ploegen',
    component: CrewPageComponent,
  },
  {
    path: 'interventies',
    component: InterventionPageComponent,
  },
  {
    path: 'personen',
    component: PeoplePageComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    CrewComponent,
    CrewEditComponent,
    CrewPageComponent,
    InterventionPageComponent,
    PeoplePageComponent,
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
