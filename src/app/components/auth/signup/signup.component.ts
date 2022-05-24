import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {SignupRequest} from "../../../payload/request/signup.request";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initSignupForm();
  }

  public initSignupForm(): void {
    this.signupForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.maxLength(150),
      ]],
      firstName: ['', [
        Validators.required,
        Validators.maxLength(150),
      ]],
      lastName: ['', [
        Validators.required,
        Validators.maxLength(150),
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['', [
        Validators.required,
      ]],
    })
  }

  get username(): AbstractControl {
    return this.signupForm.get('username');
  }

  get firstName(): AbstractControl {
    return this.signupForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.signupForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.signupForm.get('email');
  }

  get password(): AbstractControl {
    return this.signupForm.get('password');
  }

  public registration(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const body: SignupRequest = this.signupForm.value;
    this.authService.registration(body).subscribe(
      () => {
        this.router.navigate(['auth', 'login']);
        console.log("Registration successful");
      }
    );
  }
}
