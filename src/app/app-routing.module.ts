import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { HomeComponent } from './home/home.component';
import { EditDataComponent } from './edit-data/edit-data.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'add-data',
    component: AddDataComponent
  },
  {
    path:'edit-data',
    component: EditDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
