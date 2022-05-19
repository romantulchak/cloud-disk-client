import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../service/tokenStorage.service";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../../payload/request/login.request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginRequest: LoginRequest = new LoginRequest();

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.authService.login(this.loginRequest).subscribe(
      res => {
        this.tokenStorageService.saveUser(res);
        this.tokenStorageService.saveToken(res.accessToken);
        this.router.navigate(['drive', 'my-drive']);
      }
    );
  }


}
