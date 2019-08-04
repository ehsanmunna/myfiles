import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrivePannelInsideComponent } from './Components/DriveInside/DriveInside';
import { DrivePannelComponent } from './Components/DrivePannel/DrivePannel';

const routes: Routes = [
  {path: '', component: DrivePannelComponent},
  {path: 'd/:id', component: DrivePannelInsideComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
