import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FileDTO } from "../dto/file.dto";
import { FolderDTO } from "../dto/folder.dto";

const API_URL = environment.api;

@Injectable({
    providedIn: 'root'
})
export class ElementService{
    constructor(private http: HttpClient){}

    public restoreElement(link: string):Observable<any>{
        return this.http.put(`${API_URL}element/restore/${link}`, null)
    }

    public preRemoveElement(link: string, driveName: string):Observable<any>{
        return this.http.put(`${API_URL}element/pre-remove/${link}`, driveName)
    }

    public removeElement(link: string): Observable<any>{
        return this.http.delete(`${API_URL}element/remove/${link}`);
    }
    
    public getRemovedElements(driveName: string): Observable<FolderDTO[] | FileDTO[]>{
        return this.http.get<FolderDTO[] | FileDTO[]>(`${API_URL}element/removed/${driveName}`)
    }

    
    public findElementsForDrive(driveName: string): Observable<FolderDTO[] | FileDTO[]>{
        return this.http.get<FolderDTO[] | FileDTO[]>(`${API_URL}element/${driveName}`);
    }

}