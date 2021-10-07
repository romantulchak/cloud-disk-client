import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


const API_URL = environment.api;

@Injectable({
    providedIn:'root'
})
export class TrashService{
    constructor(private http: HttpClient){

    }

    public getRemovedElements(driveName: string): Observable<any>{
        return this.http.get(`${API_URL}trash/removed-elements/${driveName}`)
    }

}