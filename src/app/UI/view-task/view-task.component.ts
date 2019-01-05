import { Component, OnInit } from '@angular/core';

import { TaskEntity } from 'src/app/Modules/task-entity';
import { Projects } from 'src/app/Modules/projects';
import { SharedService } from 'src/app/Services/shared.service';
import { DatePipe } from '@angular/common'
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
  
  public ProjectId:number;
  list:TaskEntity[];

  constructor(private _service:SharedService,public datepipe: DatePipe) {
    this._service.GetAllTask().subscribe(data=>this.list=data);
    
   }

  ngOnInit() {
  }

  
  
  DeleteTask(TaskId:number):void
  {
    let DeleteResult:any;
    this._service.DeleteTask(TaskId).subscribe(data=>DeleteResult=data);

    alert("Task has been deleted successfully..!");
  }
  EndTaskFlagchange(Item:TaskEntity):void
  {
    let updateResult: any;
    this._service.EndTaskFlagUpdate(Item).subscribe(data=>updateResult=data);
   
    alert("Task has been marked as End..!");
  }
  LoadGridTask():void
  {
    this._service.GetAllTask().subscribe(data=>this.list=data);
  }
  trackTask(index:number, item:any) {
 
    return item ? item.TaskID : undefined;
  
  }

  StartDateSort():void
  {
      this._service.GetAllTask().subscribe(data=>this.list=data.sort((a, b) => {
        if (a.StartDate < b.StartDate) return -1;
        else if (a.StartDate > b.StartDate) return 1;
        else return 0;
      }));
      
  }
  EndDateSort():void
  {
      this._service.GetAllTask().subscribe(data=>this.list=data.sort((a, b) => {
        if (a.EndDate < b.EndDate) return -1;
        else if (a.EndDate > b.EndDate) return 1;
        else return 0;
      }));
      
  }
  PrioritySort():void
  {
      this._service.GetAllTask().subscribe(data=>this.list=data.sort((a, b) => {
        if (a.Priority < b.Priority) return -1;
        else if (a.Priority > b.Priority) return 1;
        else return 0;
      }));
      
  }
 TaskCompletedSort():void
  {
      this._service.GetAllTask().subscribe(data=>this.list=data.sort((a, b) => {
        if (a.TaskStatus < b.TaskStatus) return -1;
        else if (a.TaskStatus > b.TaskStatus) return 1;
        else return 0;
      }));
      
  }

TaskViewSearchFilter(SearchCriteria: string):void
  {
    if(SearchCriteria!=undefined && SearchCriteria.length!=0)
    {
  this._service.GetAllTask().subscribe(data=>this.list=data.filter(item=>  item.ProjectId.toString()=== SearchCriteria
  ||item.ParentId.toString()=== SearchCriteria  ||item.TaskId.toString()=== SearchCriteria ||item.UserId.toString()=== SearchCriteria   ||item.Priority.toString()=== SearchCriteria||item.TaskDesc.toUpperCase()=== SearchCriteria.toUpperCase()));

    }
    else
    {
      this._service.GetAllTask().subscribe(data=>this.list=data);
    }
     
  }




  
}
