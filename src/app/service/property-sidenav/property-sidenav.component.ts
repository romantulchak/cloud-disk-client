import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HistoryDTO } from 'src/app/dto/history.dto';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-property-sidenav',
  templateUrl: './property-sidenav.component.html',
  styleUrls: ['./property-sidenav.component.scss']
})
export class PropertySidenavComponent implements OnInit {

  @ViewChild("propertySidenav") public propertySidenav: MatSidenav;

  @Input("elementId") elementId: number;

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.propertyService.setPropertySidenav(this.propertySidenav);
  }


}
