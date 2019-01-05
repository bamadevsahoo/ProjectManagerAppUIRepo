import { Component, OnInit,TemplateRef,NgModule } from '@angular/core';
import {BsModalService,BsModalRef} from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/Services/shared.service';
import { Projects } from 'src/app/Modules/projects';
import { Users } from 'src/app/Modules/users';
import {FormsModule,NgForm,ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { stringify } from '@angular/core/src/util';
import { HttpClientModule } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common'
@NgModule({
  imports:[BrowserModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  providers: [ HttpClientModule],
  exports:[FormsModule]
})
@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.scss']
})
export class AddProjectsComponent implements OnInit {
  modalRef:BsModalRef;
public Ischecked:boolean=false;
listManager:Users[];
listProjects:Projects[];
public   ProjectId:number;
public   ProjectDesc:string;
public   StartDate:string;
public   EndDate:string;
public   Priority:number;
public   ManagerUserId :number;
public IsManagerSelected:boolean=false;
public IsformValid :boolean=true;
public IsAddedSuccessFully:boolean=false;
public IsDeletedSuccessFully:boolean=false;
public IsUpdatedSuccessFully:boolean=false;
public IsStartDateGreater:boolean=true;
public  IsEdit:boolean=false;
public ProjectDate:Date;
public insertResult: any;
  constructor(private modalServ:BsModalService,private _service:SharedService,public datepipe: DatePipe) {
    
    this._service.GetAllUsers().subscribe(data=>this.listManager=data);
    this._service.GetAllProjects().subscribe(data=>this.listProjects=data);
   }

  ngOnInit() {
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

  openModal(tmpManager: TemplateRef<any>):void
  {
this.modalRef=this.modalServ.show(tmpManager);
  }

  trackUser(index:number, item:any) {
 
    return item ? item.UserId : undefined;
  
  }

  trackProject(index:number, item:any) {
 
    return item ? item.ProjectId : undefined;
  
  }
  SearchFilter(Searchdetail:string):void
  {
    if(Searchdetail!=undefined && Searchdetail.length!=0)
    {
  this._service.GetAllUsers().subscribe(data=>this.listManager=data.filter(item=>item.FirstName.toUpperCase()===Searchdetail.toUpperCase()|| item.LastName.toUpperCase()===Searchdetail.toUpperCase()
  || item.EmpId.toUpperCase()===Searchdetail.toUpperCase()|| item.UserId.toString()===Searchdetail ));

    }
    else
    {
      this._service.GetAllUsers().subscribe(data=>this.listManager=data);
    }
     
  }

  ProjectSearchFilter(projectSearchCriteria: string):void
  {
    if(projectSearchCriteria!=undefined && projectSearchCriteria.length!=0)
    {
  this._service.GetAllProjects().subscribe(data=>this.listProjects=data.filter(item=>this.datepipe.transform(item.StartDate, 'yyyy-MM-dd')===this.datepipe.transform(projectSearchCriteria, 'yyyy-MM-dd')|| this.datepipe.transform(item.EndDate, 'yyyy-MM-dd')===this.datepipe.transform(projectSearchCriteria, 'yyyy-MM-dd')
  || item.ProjectId.toString()=== projectSearchCriteria|| item.ProjectDesc.toUpperCase()==projectSearchCriteria.toUpperCase()
  || item.Priority.toString()=== projectSearchCriteria || item.ManagerUserId.toString()=== projectSearchCriteria));

    }
    else
    {
      this._service.GetAllProjects().subscribe(data=>this.listProjects=data);
    }
     
  }
  StartDateSort():void
  {
      this._service.GetAllProjects().subscribe(data=>this.listProjects=data.sort((a, b) => {
        if (a.StartDate < b.StartDate) return -1;
        else if (a.StartDate > b.StartDate) return 1;
        else return 0;
      }));
      
  }
  EndDateSort():void
  {
      this._service.GetAllProjects().subscribe(data=>this.listProjects=data.sort((a, b) => {
        if (a.EndDate < b.EndDate) return -1;
        else if (a.EndDate > b.EndDate) return 1;
        else return 0;
      }));
      
  }
  PrioritySort():void
  {
      this._service.GetAllProjects().subscribe(data=>this.listProjects=data.sort((a, b) => {
        if (a.Priority < b.Priority) return -1;
        else if (a.Priority > b.Priority) return 1;
        else return 0;
      }));
      
  }
  SelectManger(userIdManager:number):void
  {
    this.ManagerUserId=userIdManager;
    this.IsManagerSelected=true;
  }

  AddNewProject(form: NgForm):void 
  {
    let Projectdetails:Projects=
    {ProjectId:0,
    ProjectDesc:this.ProjectDesc,
    Priority : this.Priority,
     ManagerUserId:this.ManagerUserId,
     StartDate:"",
     EndDate:""};
  if(this.Ischecked)
  {
    Projectdetails.StartDate=this.StartDate;
    Projectdetails.EndDate= this.EndDate;
  }
  else
  {
    this.ProjectDate= new Date();
    Projectdetails.StartDate= this.ProjectDate.toString();
    Projectdetails.EndDate= this.ProjectDate.setDate(this.ProjectDate.getDate()+1).toString(); 
    
    Projectdetails.StartDate=this.datepipe.transform(Projectdetails.StartDate, 'yyyy-MM-dd');
    Projectdetails.EndDate=this.datepipe.transform(Projectdetails.EndDate, 'yyyy-MM-dd');
  }
    this.IsEdit=false;
    this.IsDeletedSuccessFully=false;
    this.IsUpdatedSuccessFully=false;
  if(Projectdetails.Priority==undefined)
  Projectdetails.Priority=15;
  if(Projectdetails.ProjectDesc == undefined||Projectdetails.ManagerUserId==undefined||
    Projectdetails.StartDate ==undefined||Projectdetails.EndDate==undefined||
    Projectdetails.ProjectDesc==""||Projectdetails.ManagerUserId===0
    || Projectdetails.StartDate ==""||Projectdetails.EndDate=="")
  {
    
    this.IsformValid=false;
    this.IsAddedSuccessFully =false;
    
  }
  else if(Date.parse(Projectdetails.StartDate)>Date.parse(Projectdetails.EndDate))
  {
    this.IsformValid=true;
    this.IsAddedSuccessFully =false;
    this.IsStartDateGreater=false;
  }
  else
  {
    this.IsformValid=true;
    this.IsStartDateGreater=true;
  this._service.AddNewProjects(Projectdetails).subscribe(data=>this.insertResult=data);
  this.IsAddedSuccessFully =true;
  
  form.reset();
  
  }
  window.scroll(0,0);
  }

  EditProjectBind(Project : Projects):void 
  {
    this.IsAddedSuccessFully=false;
    this.IsDeletedSuccessFully=false;
    this.IsUpdatedSuccessFully=false;
    this.IsformValid=true;
    this.IsEdit=true;
  this.ProjectId=Project.ProjectId;
  this.ProjectDesc=Project.ProjectDesc;
  this.Priority=Project.Priority;
  this.StartDate=Project.StartDate;
  this.EndDate=Project.EndDate;
  this.ManagerUserId=Project.ManagerUserId;
  window.scroll(0,0);
  }
  UpdateProject():void 
  {
    let updateResult: any;
    let Projectdetails:Projects=
    {ProjectId: this.ProjectId,
    ProjectDesc:this.ProjectDesc,
    Priority : this.Priority,
     ManagerUserId:this.ManagerUserId,
     StartDate:this.StartDate,
     EndDate:this.EndDate};
     if(Projectdetails.ProjectDesc == undefined||Projectdetails.ManagerUserId==undefined||
      Projectdetails.StartDate ==undefined||Projectdetails.EndDate==undefined||
      Projectdetails.ProjectDesc==""|| Projectdetails.Priority === 0||Projectdetails.ManagerUserId===0
      || Projectdetails.StartDate ==""||Projectdetails.EndDate=="")
    {
      
      this.IsformValid=false;
      this.IsUpdatedSuccessFully =false;
      
    }
    else if(Date.parse(Projectdetails.StartDate)>Date.parse(Projectdetails.EndDate))
  {
    this.IsformValid=true;
    this.IsUpdatedSuccessFully =false;
    this.IsStartDateGreater=false;
  }
    
  else
  {
  this.IsformValid=true;
  this._service.UpdateProjects(Projectdetails.ProjectId,Projectdetails).subscribe(data=>updateResult=data);
  this.IsUpdatedSuccessFully =true;
  this.IsDeletedSuccessFully=false;
  this.IsAddedSuccessFully=false;
  }
  window.scroll(0,0);
  }

  DeleteProject(ProjectId:number):void
  {
    let DeleteResult:any;
    this._service.DeleteProjects(ProjectId).subscribe(data=>DeleteResult=data);  
    this.IsDeletedSuccessFully=true;
    this.IsUpdatedSuccessFully=false;
    this.IsAddedSuccessFully=false;
    this.IsformValid=true;
    window.scroll(0,0);
  }
  LoadProjectGrid():void
{
  
  this._service.GetAllProjects().subscribe(data=>this.listProjects=data);
}
ResetProjectForm(form: NgForm):void 
  {
    form.reset();
    this.IsAddedSuccessFully=false;
    this.IsDeletedSuccessFully=false;
    this.IsUpdatedSuccessFully=false;
    this.IsformValid=true;
    this.IsStartDateGreater=true;
    this.IsEdit=false;
    window.scroll(0,0);
  }
}
