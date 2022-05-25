import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../service/tokenStorage.service";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../../../payload/request/login.request";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  public initLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
      ]],
    })
  }

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  public login(): void {
    const body: LoginRequest = this.loginForm.value;
    this.authService.login(body).subscribe(
      res => {
        this.tokenStorageService.saveUser(res);
        this.tokenStorageService.saveToken(res.accessToken);
        this.router.navigate(['drive', 'my-drive']);
      }
    );
  }
}
