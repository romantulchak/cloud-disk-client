import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ElementAccessDTO } from '../dto/element-access.dto';
import { StoreDTO } from '../dto/store.dto';
import { ContextType } from '../model/enum/contextType.enum';
import { Link } from '../model/link.model';
import { ElementAccessService } from '../service/element-access.service';

const HOST_LINK = environment.hostLink;

@Component({
  selector: 'app-access-dialog',
  templateUrl: './access-dialog.component.html',
  styleUrls: ['./access-dialog.component.scss']
})
export class AccessDialogComponent implements OnInit {

  public link: Link;
  public accessTypes: any;
  public isAccessOpen: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) private element: StoreDTO,
    private elementAccessService: ElementAccessService) {}

  ngOnInit(): void {
    this.getAccess();
    this.getAccessTypes();
  }

  private getAccess() {
    this.elementAccessService.findElementAccess(this.element.link).subscribe(
      res => {
        if (res) {
          this.getLink(res);
          this.isAccessOpen = true;
        }else{
          this.isAccessOpen = false;
        }
      }
    );
  }

  private getLink(access: ElementAccessDTO){
    if (this.element.context === ContextType.FILE) {
      let name = `${HOST_LINK}file/view/${this.element.link}`
      let url = `file/view/${this.element.link}`
      this.link = new Link(name, url, access.accessType);
    } else {
      let name = `${HOST_LINK}drive/folders/${this.element.link}`;
      let url = `drive/folders/${this.element.link}`;
      this.link = new Link(name, url, access.accessType);
    }
  }

  private getAccessTypes() {
    this.elementAccessService.findAccessTypes().subscribe(
      res => {
        console.log(res);
        this.accessTypes = res;
      }
    )
  }

  public changeAccess(type: string) {
    this.elementAccessService.changeAccessType(this.element.link, type).subscribe(
      res => {
        this.element.access = res;
      }
    );
  }

  public access(openAccess: string){
    if(JSON.parse(openAccess)){
     this.openAccess();
    }else{
      this.elementAccessService.closeAccess(this.element.link).subscribe(
        res=>{
          this.element.access = null;
          this.isAccessOpen = false;
        }
      ); 
    }
  }

  private openAccess(){
    this.elementAccessService.openAccess(this.element.link, this.accessTypes[0].name).subscribe(
      res=>{
        this.element.access = res;
        this.isAccessOpen = true;
        this.getLink(res);
      }
    );
  }

}
