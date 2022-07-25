import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { YagaModule } from '@yaga/leaflet-ng2';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CrewManagementComponent } from './crew-management/crew-management.component';
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import { nlBE } from "date-fns/locale";
import { NameDialogComponent } from './name-dialog/name-dialog.component';

const belgianConfig = new DateFnsConfigurationService();
belgianConfig.setLocale(nlBE);

@NgModule({
  declarations: [
    AppComponent,
    MyMapComponent,
    NavbarComponent,
    CrewManagementComponent,
    NameDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YagaModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    DateFnsModule.forRoot(),
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    { provide: DateFnsConfigurationService, useValue: belgianConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
