import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DriveTreeComponent } from './Components/DriveTree/DriveTree';
import { DrivePannelComponent } from './Components/DrivePannel/DrivePannel';
import { DrivePannelInsideComponent } from './Components/DriveInside/DriveInside';
import {MatCardModule} from '@angular/material/card';

const _materialModule = [
  MatToolbarModule
  , MatTreeModule
  , MatIconModule
  , MatButtonModule
  , MatProgressBarModule
  , MatCardModule
]

const _componets = [
  DriveTreeComponent
  , DrivePannelComponent
  , DrivePannelInsideComponent
]

@NgModule({
  declarations: [
    AppComponent
    , _componets
  ],
  imports: [
    _materialModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
