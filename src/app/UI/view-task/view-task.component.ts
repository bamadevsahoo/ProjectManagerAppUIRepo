import { Component, OnInit } from '@angular/core';
import { TaskEntity } from 'src/app/Modules/task-entity';
import { SharedService } from 'src/app/Services/shared.service';
import { DatePipe } from '@angular/common'
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

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
    
    this._service.GetAllTask().subscribe(data=>this.list=data);
    alert("Task has been deleted successfully..!");
  }
  EndTaskFlagchange(Item:TaskEntity):void
  {
    let updateResult: any;
    this._service.EndTaskFlagUpdate(Item).subscribe(data=>updateResult=data);
    this._service.GetAllTask().subscribe(data=>this.list=data);
    alert("Task has been marked as End..!");
  }
  trackTask(index:number, item:any) {
 
    return item ? item.TaskID : undefined;
  
  }
  TaskFilter(taskdetail:string):void
  {
    if(taskdetail!=undefined && taskdetail.length!=0)
    {
  this._service.GetAllTask().subscribe(data=>this.list=data.filter(item=>item.Task1.toUpperCase()===taskdetail.toUpperCase()));
    }
    else
    {
      this._service.GetAllTask().subscribe(data=>this.list=data);
    }
     
  }
  ParentTaskFilter(Parenttaskdetail:number):void
  {
    if(Parenttaskdetail!=undefined && Parenttaskdetail!=0)
    {
  this._service.GetAllTask().subscribe(data=>this.list=data.filter(item=>item.ParentId==Parenttaskdetail));
    }
    else
    {
      this._service.GetAllTask().subscribe(data=>this.list=data);
    }

  }
  PriorityTaskFilter(taskPriority:number):void
  {
    if(taskPriority!=undefined && taskPriority!=0)
    {
    
  this._service.GetAllTask().subscribe(data=>this.list=data.filter(item=>item.Priority==taskPriority));
    }
  else
  {
    this._service.GetAllTask().subscribe(data=>this.list=data);
  }
     
  }
  StartdateTaskFilter(startdate:string):void
  {
    if(startdate!=undefined && startdate.length!=0)
    {
      
  this._service.GetAllTask().subscribe(data=>this.list=data.filter(item=>this.datepipe.transform(item.StartDate, 'yyyy-MM-dd')==this.datepipe.transform(startdate, 'yyyy-MM-dd')));
    }
    else
     {
  this._service.GetAllTask().subscribe(data=>this.list=data);
     }
  }
  EnddateTaskFilter(endDate:string):void
  {
    if(endDate!=undefined && endDate.length!=0)
    {
  this._service.GetAllTask().subscribe(data=>this.list=data.filter(item=>this.datepipe.transform(item.EndDate, 'yyyy-MM-dd')==this.datepipe.transform(endDate, 'yyyy-MM-dd')));
    }
   else
    {
    this._service.GetAllTask().subscribe(data=>this.list=data);
    }
  } 
}
