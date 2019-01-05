import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddTaskComponent} from './UI/add-task/add-task.component';
import {ViewTaskComponent} from './UI/view-task/view-task.component';
import {UpdateTaskComponent} from  './UI/update-task/update-task.component';
import { AddUsersComponent } from './UI/add-users/add-users.component';
import { AddProjectsComponent } from './UI/add-projects/add-projects.component';
const routes: Routes = [
  {path:'', redirectTo:'/view-task' , pathMatch:'full'},
  {path:'add-users',component:AddUsersComponent},
  {path:'add-projects',component:AddProjectsComponent},
{path:'add-task',component:AddTaskComponent},
{path:'view-task',component:ViewTaskComponent},
{path:'update-task/:taskid',component:UpdateTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
