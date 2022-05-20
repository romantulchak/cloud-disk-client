import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {SignupRequest} from "../../../payload/request/signup.request";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public registrationRequest: SignupRequest = new SignupRequest();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  public registration(): void {
    this.authService.registration(this.registrationRequest).subscribe(
      () => {
        console.log("Registration successful");
      }
    );
  }
}
