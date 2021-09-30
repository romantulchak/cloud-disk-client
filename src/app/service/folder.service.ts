import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FolderDTO } from "../dto/folder.dto";

const API_URL = environment.api;

@Injectable({
    providedIn: 'root'
})
export class FolderService{
    constructor(private http: HttpClient){}

    public createFolder(driveName: string, folderName: string): Observable<any>{
        return this.http.post(`${API_URL}folders/create/${driveName}`, folderName);
    }

    public findAllFoldersForDrive(driveName: string): Observable<FolderDTO[]>{
        return this.http.get<FolderDTO[]>(`${API_URL}folders/${driveName}`);
    }
}