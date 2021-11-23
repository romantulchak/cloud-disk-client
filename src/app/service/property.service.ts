import { Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { FileDTO } from '../dto/file.dto';
import { FolderDTO } from '../dto/folder.dto';
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

  public open(element: FolderDTO | FileDTO): Promise<MatDrawerToggleResult>{
    const propertyData = new PropertyData(true, false, element);
    this.propertySideState.next(propertyData);
    return this.propertySidenav.open();
  }

  public close(): Promise<MatDrawerToggleResult>{
    this.propertySideState.next(null);
    return this.propertySidenav.close();
  }

  public toggle(): void{
    this.propertySidenav.toggle();
  }
}
