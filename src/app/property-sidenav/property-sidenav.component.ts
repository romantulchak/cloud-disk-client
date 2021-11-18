import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { HistoryDTO } from 'src/app/dto/history.dto';
import { FileDTO } from '../dto/file.dto';
import { FolderDTO } from '../dto/folder.dto';
import { ContextType } from '../model/enum/contextType.enum';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-property-sidenav',
  templateUrl: './property-sidenav.component.html',
  styleUrls: ['./property-sidenav.component.scss']
})
export class PropertySidenavComponent implements OnInit {

  @ViewChild("propertySidenav") public propertySidenav: MatSidenav;

  @Input("element") element: FolderDTO | FileDTO;

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
