import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../payload/request/login.request';
import { SignupRequest } from '../payload/request/signup.request';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public loginRequest: LoginRequest = new LoginRequest();
  public registrationRequest: SignupRequest = new SignupRequest();
  public isLogin: boolean = true;

  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public login(): void{
    this.authService.login(this.loginRequest).subscribe(
      res=>{
        this.tokenStorageService.saveUser(res);
        this.tokenStorageService.saveToken(res.accessToken);
        this.router.navigateByUrl('/drive/my-drive');
      }
    );
  }

  public registration(): void{
    this.authService.registration(this.registrationRequest).subscribe(
      res=>{
        console.log("Registration succesful");
        
      }
    );
  }

}
