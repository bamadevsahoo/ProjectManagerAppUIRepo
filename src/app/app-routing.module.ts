import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddTaskComponent} from './UI/add-task/add-task.component';
import {ViewTaskComponent} from './UI/view-task/view-task.component';
import {UpdateTaskComponent} from  './UI/update-task/update-task.component';

const routes: Routes = [
  {path:'', redirectTo:'/view-task' , pathMatch:'full'},
{path:'add-task',component:AddTaskComponent},
{path:'view-task',component:ViewTaskComponent},
{path:'update-task/:taskid',component:UpdateTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
