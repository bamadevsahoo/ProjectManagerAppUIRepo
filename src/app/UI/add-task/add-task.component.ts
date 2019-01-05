import { Component,NgModule, OnInit,TemplateRef } from '@angular/core';
import {BsModalService,BsModalRef} from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/Services/shared.service';
import { TaskEntity } from 'src/app/Modules/task-entity';
import { Projects } from 'src/app/Modules/projects';
import { ParentTask } from 'src/app/Modules/parent-task';
import {FormsModule,NgForm,ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { stringify } from '@angular/core/src/util';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { Users } from 'src/app/Modules/users';
@NgModule({
  imports:[BrowserModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  providers: [ HttpClientModule],
  exports:[FormsModule]
})
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {
  ProjectmodalRef:BsModalRef;
  ParentTaskmodalRef:BsModalRef;
  UsermodalRef:BsModalRef;
  public insertResult: any;
  public TaskId:number;
  public TaskDesc:string;
  public ParentId :number;
  public StartDate :string;
  public EndDate: string;
  public Priority : number;
  public TaskStatus:string;
  public UserId:number;
  public ProjectId:number;
  listProjects:Projects[];
  listParentTask:ParentTask[];
  listUser:Users[];
  public IsformValid :boolean=true;
  public IsAddedSuccessFully:boolean=false;
  public IsParentAddedSuccessFully:boolean=false;
  public IsProjectSelected:boolean=false;
  public IsParentTaskSelected:boolean=false;
  public IsStartDateGreater:boolean=false;
  public IsUserSelected:boolean=false;
  public Ischecked:boolean=false;
  constructor(private _service:SharedService,private ProjectmodalServ:BsModalService,private ParentTaskmodalServ:BsModalService,private UsermodalServ:BsModalService,public datepipe: DatePipe)  {
    this._service.GetAllProjects().subscribe(data=>this.listProjects=data);
    this._service.GetAllParentTask().subscribe(data=>this.listParentTask=data);
    this._service.GetAllUsers().subscribe(data=>this.listUser=data);
   }

  ngOnInit() {
  }

AddNewTask(form: NgForm):void 
{ this.IsParentAddedSuccessFully=false;
  
  if(this.Ischecked)
  {
  let ParentTaskDetails:ParentTask=
  {ParentId:0,ParentTask1:this.TaskDesc}

  if(ParentTaskDetails.ParentTask1== undefined ||ParentTaskDetails.ParentTask1=="")
  {
    this.IsformValid=false;
  }
  else
  {
    this.IsformValid=true;
    this._service.AddNewParentTask(ParentTaskDetails).subscribe(data=>this.insertResult=data);
    this.IsParentAddedSuccessFully =true;
    form.reset();
  }

  }
else
{
  let Taskdetails:TaskEntity=
  {TaskId:0,
  ParentId:this.ParentId,
  TaskDesc:this.TaskDesc,
  StartDate:this.StartDate,
  EndDate:this.EndDate,
  Priority:this.Priority,
  TaskStatus:'',
  ProjectId :this.ProjectId,
  UserId:this.UserId};
  if(Taskdetails.Priority==undefined)
  Taskdetails.Priority=15;
if(Taskdetails.TaskDesc== undefined||Taskdetails.ParentId ==undefined||Taskdetails.StartDate==undefined||Taskdetails.EndDate==undefined
  ||Taskdetails.ProjectId==undefined||Taskdetails.UserId==undefined
  ||Taskdetails.TaskDesc.length== 0)
{
  this.IsformValid=false;
}
else if(Date.parse(Taskdetails.StartDate)>Date.parse(Taskdetails.EndDate))
{
  this.IsformValid=true;
  this.IsAddedSuccessFully =false;
  this.IsStartDateGreater=true;
}
else
{
  this.IsformValid=true;
  this.IsStartDateGreater=false;
this._service.AddNewTask(Taskdetails).subscribe(data=>this.insertResult=data);
this.IsAddedSuccessFully =true;
form.reset();
}
}
window.scroll(0,0);
}
ResetTaskForm(form: NgForm):void 
{
  form.reset();

  this.IsAddedSuccessFully=false;
  this.IsParentAddedSuccessFully=false;
  this.IsParentTaskSelected=false;
  this.IsUserSelected=false;
  this.IsProjectSelected=false;

  this.IsformValid=true;
  this.IsStartDateGreater=false;

  window.scroll(0,0);
}

SelectProject(ProjectId:number):void
  {
    this.ProjectId=ProjectId;
    this.IsProjectSelected=true;
  }

  SelectParentTask(ParentId:number):void
  {
    this.ParentId=ParentId;
    this.IsParentTaskSelected=true;

  }
  openProjectModal(tmpProject: TemplateRef<any>):void
  {
this.ProjectmodalRef=this.ProjectmodalServ.show(tmpProject);
  }
  openParenttaskModal(tmpParentTask: TemplateRef<any>):void
  {
this.ParentTaskmodalRef=this.ParentTaskmodalServ.show(tmpParentTask);
  }
  SearchProjectFilter(projectSearchCriteria: string):void
  {
    if(projectSearchCriteria!=undefined && projectSearchCriteria.length!=0)
    {
  this._service.GetAllProjects().subscribe(data=>this.listProjects=data.filter(item=>this.datepipe.transform(item.StartDate, 'yyyy-MM-dd')===this.datepipe.transform(projectSearchCriteria, 'yyyy-MM-dd')|| this.datepipe.transform(item.EndDate, 'yyyy-MM-dd')===this.datepipe.transform(projectSearchCriteria, 'yyyy-MM-dd')
  || item.ProjectId.toString()=== projectSearchCriteria|| item.ProjectDesc.toUpperCase()===projectSearchCriteria.toUpperCase()
  || item.Priority.toString()=== projectSearchCriteria || item.ManagerUserId.toString()=== projectSearchCriteria));

    }
    else
    {
      this._service.GetAllProjects().subscribe(data=>this.listProjects=data);
    }
     
  }
  SearchParentTaskFilter(ParentTaskSearchCriteria: string):void
  {
    if(ParentTaskSearchCriteria!=undefined && ParentTaskSearchCriteria.length!=0)
    {
  this._service.GetAllParentTask().subscribe(data=>this.listParentTask=data.filter(item=>item.ParentId.toString()===ParentTaskSearchCriteria|| item.ParentTask1.toUpperCase()===ParentTaskSearchCriteria.toUpperCase()));

    }
    else
    {
      this._service.GetAllParentTask().subscribe(data=>this.listParentTask=data);
    }
     
  }
  changeCheck(eve):void
  {
   if( eve.target.checked)
   {
  this.Ischecked=true;
    }
    else
    {
      this.Ischecked=false;
    }
  }
  trackParentTask(index:number, item:any) {
 
    return item ? item.ParentId : undefined;
  
  }
  trackProject(index:number, item:any) {
 
    return item ? item.ProjectId : undefined;
  
  }
  SelectUser(UserId:number):void
  {
    this.UserId=UserId;
    this.IsUserSelected=true;
  }
  trackUser(index:number, item:any) {
 
    return item ? item.UserId : undefined;
  
  }
  SearchUserFilter(Searchdetail:string):void
  {
    if(Searchdetail!=undefined && Searchdetail.length!=0)
    {
  this._service.GetAllUsers().subscribe(data=>this.listUser=data.filter(item=>item.FirstName.toUpperCase()===Searchdetail.toUpperCase()|| item.LastName.toUpperCase()===Searchdetail.toUpperCase()
  || item.EmpId.toUpperCase()===Searchdetail.toUpperCase()|| item.UserId.toString()===Searchdetail ));

    }
    else
    {
      this._service.GetAllUsers().subscribe(data=>this.listUser=data);
    }
     
  }
  openUserModal(tmpUser: TemplateRef<any>):void
  {
this.UsermodalRef=this.UsermodalServ.show(tmpUser);
  }
  LoadParentTask():void
{
  this._service.GetAllParentTask().subscribe(data=>this.listParentTask=data);
}
}
