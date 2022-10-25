import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { RestService } from 'src/app/core/services/rest.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide_password = true;
  signinForm: FormGroup;
  error: string = '';
  loginRequest: Subscription = new Subscription;
  constructor(private auth: AuthService, private restClient: RestService, private router: Router) { }

  ngOnInit(): void {
  this.signinForm = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      password: new FormControl('', [Validators.required]),
    });

  }
  onSubmit(): void {
    const { code, password } = this.signinForm.getRawValue();
    
    this.loginRequest = this.restClient.signIn(code, password).subscribe(
      res => {
        this.auth.setCurrentUser(res.pharmacy);
        this.auth.setAccessToken(res?.access || "");
        this.auth.setRefreshToken(res.refresh || "");
        this.router.navigateByUrl('/');
      },
      err => this.error = err,
      )
  }

  ngOnDestroy(){
    console.info("Sign in have been destroyed")
    this.loginRequest.unsubscribe();
  }


}
