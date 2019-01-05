import { Injectable, NgModule } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import {Observable} from 'node_modules/rxjs';
import { map } from 'rxjs/operators';
import { TaskEntity } from '../Modules/task-entity';
import {Users} from '../Modules/users';
import {Projects} from '../Modules/projects';
import { ParentTask } from '../Modules/parent-task';

@NgModule({
  providers: [ HttpClient]
})
@Injectable({
  providedIn: 'root'
})
export class SharedService {

private _apiUrl = "http://localhost/ProjectManagerAPI/api/";
  constructor(private _http:HttpClient) {

   }

GetAllUsers():Observable<Users[]>
{
  return  this._http.get<Users[]>(this._apiUrl+"Users").pipe(map(x=>x));
}
AddNewUser(Item:Users):Observable<any>
{
  return this._http.post(this._apiUrl+"Users",Item)
  .pipe(map(x=>x));
}

UpdateUser(UserId :number, Item: Users):Observable<any>
  {
    return  this._http.put(this._apiUrl+"Users/"+UserId,Item).pipe(map(x=>x));
  }
  
  
  DeleteUser(UserId :number):Observable<any>
  {
    return  this._http.delete(this._apiUrl+"Users/"+UserId).pipe(map(x=>x));
  }
  
  GetAllProjects():Observable<Projects[]>
  {
    return  this._http.get<Projects[]>(this._apiUrl+"Projects").pipe(map(x=>x));
  }
  AddNewProjects(Item:Projects):Observable<any>
  {
    return this._http.post(this._apiUrl+"Projects",Item)
    .pipe(map(x=>x));
  }
  
  UpdateProjects(ProjectId :number, Item: Projects):Observable<any>
    {
      return  this._http.put(this._apiUrl+"Projects/"+ProjectId,Item).pipe(map(x=>x));
    }
    
    
    DeleteProjects(ProjectId :number):Observable<any>
    {
      return  this._http.delete(this._apiUrl+"Projects/"+ProjectId).pipe(map(x=>x));
    }

    GetAllParentTask() : Observable<ParentTask[]>
  {
    return  this._http.get<ParentTask[]>(this._apiUrl+"ParentTasks").pipe(map(x=>x));

  }
  AddNewParentTask(Item:ParentTask):Observable<any>
  {
    return this._http.post(this._apiUrl+"ParentTasks",Item)
    .pipe(map(x=>x));
  }
  GetAllTask() : Observable<TaskEntity[]>
  {
    return  this._http.get<TaskEntity[]>(this._apiUrl+"Tasks").pipe(map(x=>x));

  }
  GetTask(TaskId :number) : Observable<TaskEntity>
  {
    return  this._http.get<TaskEntity>(this._apiUrl+"Tasks/"+TaskId).pipe(map(x=>x));

  }
  AddNewTask(Item:TaskEntity):Observable<any>
  {
    return this._http.post(this._apiUrl+"Tasks",Item)
    .pipe(map(x=>x));
  }
  UpdateTask(TaskId :number, Item: TaskEntity):Observable<any>
  {
    return  this._http.put(this._apiUrl+"Tasks/"+TaskId,Item).pipe(map(x=>x));
  }
  
  EndTaskFlagUpdate(Item: TaskEntity):Observable<any>
  {
    return  this._http.put(this._apiUrl+"Tasks",Item).pipe(map(x=>x));
  }
  DeleteTask(TaskId :number):Observable<any>
  {
    return  this._http.delete(this._apiUrl+"Tasks/"+TaskId).pipe(map(x=>x));
  }
}
