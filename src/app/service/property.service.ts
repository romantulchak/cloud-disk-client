import { Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { PropertyData } from '../model/property-data.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  public propertySideState: BehaviorSubject<PropertyData> = new BehaviorSubject(null);

  private propertySidenav: MatSidenav;

  constructor() { }

  public setPropertySidenav(propertySidenav: MatSidenav){
    this.propertySidenav = propertySidenav;
  }

  public open(elementId: number): Promise<MatDrawerToggleResult>{
    const propertyData = new PropertyData(true, elementId);
    this.propertySideState.next(propertyData);
    return this.propertySidenav.open();
  }

  public close(): Promise<MatDrawerToggleResult>{
    const propertyData = new PropertyData(false);
    this.propertySideState.next(propertyData);
    return this.propertySidenav.close();
  }

  public toggle(): void{
    this.propertySidenav.toggle();
  }
}
