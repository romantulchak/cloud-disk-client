import { Component, OnInit } from '@angular/core';
import { PropertyData } from '../model/property-data.model';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})
export class DriveComponent implements OnInit {

  public propertyData: PropertyData;

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.getPropertySideState();
  }

  public getPropertySideState(){
    this.propertyService.propertySideState.subscribe(
      res=>{
        if(res != null)
          this.propertyData = res;
        }
    );
  }
}
