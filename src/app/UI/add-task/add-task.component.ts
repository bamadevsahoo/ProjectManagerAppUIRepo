import { Component,NgModule, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { TaskEntity } from 'src/app/Modules/task-entity';
import {FormsModule,NgForm,ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { stringify } from '@angular/core/src/util';

@NgModule({
  imports:[BrowserModule,FormsModule,ReactiveFormsModule],
  exports:[FormsModule]
})
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {

  private insertResult: any;
  private Task1:string;
  private ParentId :number;
  private StartDate :string;
  private EndDate: string;
  private Priority : number;
  private IsformValid :boolean=true;
  private IsAddedSuccessFully:boolean=false;
  constructor(private _service:SharedService)  { }

  ngOnInit() {
  }

AddNewTask(form: NgForm):void 
{
  let Taskdetails:TaskEntity=
  {TaskID:0,
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
this._service.AddNewTask(Taskdetails).subscribe(data=>this.insertResult=data);
this.IsAddedSuccessFully =true;
form.reset();
}

}
ResetTaskForm(form: NgForm):void 
{
  form.reset();
}


}
