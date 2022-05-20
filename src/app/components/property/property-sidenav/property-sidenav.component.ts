import { Component, ComponentRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { HistoryDTO } from 'src/app/dto/history.dto';
import { FileDTO } from '../../../dto/file.dto';
import { FolderDTO } from '../../../dto/folder.dto';
import { HistoryComponent } from '../../history/history.component';
import { ContextType } from '../../../model/enum/contextType.enum';
import { PropertyService } from '../../../service/property.service';

@Component({
  selector: 'app-property-sidenav',
  templateUrl: './property-sidenav.component.html',
  styleUrls: ['./property-sidenav.component.scss']
})
export class PropertySidenavComponent implements OnInit {

  @ViewChild("propertySidenav") public propertySidenav: MatSidenav;
  @ViewChild(HistoryComponent) historyComponent: ComponentRef<HistoryComponent>;
  @Input("element") element: FolderDTO | FileDTO;
  public isSidenavOpened: boolean = false;

  constructor(private propertyService: PropertyService,
             private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void{
    this.propertyService.setPropertySidenav(this.propertySidenav);
  }


  public closePropertySidenav(){
    this.propertyService.close();
  }

  public open(){
    if(this.element.context === ContextType.FOLDER){
      this.router.navigateByUrl(`drive/folders/${this.element.link}`);
    }
    this.propertyService.close();
  }

}
