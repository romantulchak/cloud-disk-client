import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

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
}