import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {LoginRequest} from "../payload/request/login.request";
import {SignupRequest} from "../payload/request/signup.request";
import {JwtResponse} from "../payload/response/jwt.response";

const API_URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(loginRequest: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${API_URL}auth/signin`, loginRequest);
  }

  public registration(signupRequest: SignupRequest): Observable<void> {
    return this.http.post<void>(`${API_URL}auth/registration`, signupRequest);
  }
}
