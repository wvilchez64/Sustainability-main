import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorsModule } from './errors/errors.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AccordionModule,
    PanelModule,
    ButtonModule,
    SharedModule,
    AppRoutingModule,
    NgbModalModule,
    ToastrModule.forRoot(),
    ErrorsModule,
    CoreModule,
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }

