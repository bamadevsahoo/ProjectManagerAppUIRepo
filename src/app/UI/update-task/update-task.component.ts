import { Component, OnInit,NgModule } from '@angular/core';
import { TaskEntity } from 'src/app/Modules/task-entity';
import { SharedService } from 'src/app/Services/shared.service';
import {FormsModule,NgForm} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@NgModule({
  imports:[BrowserModule,FormsModule]
})
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  private updateResult: any;
  private TaskID :number;
  private Task1:string;
  private ParentId :number;
  private StartDate :string;
  private EndDate: string;
  private Priority : number;
  
  private IsformValid :boolean=true;
  private IsUpdatedSuccessFully:boolean=false;
  
   
  constructor(private _service:SharedService, private route: ActivatedRoute){

    const id = this.route.snapshot.paramMap.get('taskid');
    this._service.GetTask(parseInt(id)).subscribe(data=>{
    this.TaskID=data.TaskID;
    this.Task1=data.Task1;
    this.Priority=data.Priority;
   this.StartDate=data.StartDate;
    this.EndDate=data.EndDate;
    this.ParentId=data.ParentId;});
  

   }

  ngOnInit() {
  }

  UpdateTask():void 
{
  let Taskdetails:TaskEntity=
  {TaskID:this.TaskID,
  ParentId:this.ParentId,
  Task1:this.Task1,
  StartDate:this.StartDate,
  EndDate:this.EndDate,
  Priority:this.Priority,
  IsTaskEended:''};

if(Taskdetails.Task1== undefined||Taskdetails.ParentId ==undefined||Taskdetails.StartDate==undefined||Taskdetails.EndDate==undefined)
{
  this.IsformValid=false;
}
else
{
  this.IsformValid=true;
this._service.UpdateTask(Taskdetails.TaskID,Taskdetails).subscribe(data=>this.updateResult=data);
this.IsUpdatedSuccessFully =true;

}

}
}
