import { Injectable, NgModule } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import {Observable} from 'node_modules/rxjs';
import { map } from 'rxjs/operators';
import { TaskEntity } from '../Modules/task-entity';

@NgModule({
  providers: [ HttpClient]
})
@Injectable({
  providedIn: 'root'
})
export class SharedService {
private _ApiUrl ="http://localhost/TaskManagerAPI/api/Tasks";
  constructor(private _http:HttpClient) {

   }

  GetAllTask() : Observable<TaskEntity[]>
  {
    return  this._http.get<TaskEntity[]>(this._ApiUrl).pipe(map(x=>x));

  }
  GetTask(TaskId :number) : Observable<TaskEntity>
  {
    return  this._http.get<TaskEntity>(this._ApiUrl+"/"+TaskId).pipe(map(x=>x));

  }
  AddNewTask(Item:TaskEntity):Observable<any>
  {
    return this._http.post(this._ApiUrl,Item)
    .pipe(map(x=>x));
  }
  UpdateTask(TaskId :number, Item: TaskEntity):Observable<any>
  {
    return  this._http.put(this._ApiUrl+"/"+TaskId,Item).pipe(map(x=>x));
  }
  
  EndTaskFlagUpdate(Item: TaskEntity):Observable<any>
  {
    return  this._http.put(this._ApiUrl,Item).pipe(map(x=>x));
  }
  DeleteTask(TaskId :number):Observable<any>
  {
    return  this._http.delete(this._ApiUrl+"/"+TaskId).pipe(map(x=>x));
  }
}
