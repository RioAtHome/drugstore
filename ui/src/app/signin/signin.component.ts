import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { RestServiceService } from '../shared/rest-service.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide_password = true;
  signinForm: FormGroup;
  error: string = '';
  
  constructor(private auth: AuthService, private restClient: RestServiceService, private router: Router) {
    this.signinForm = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(! this.signinForm.valid){
      return;
    }

    const { code, password } = this.signinForm.value;
    
    this.restClient.signIn(code, password).subscribe(
      res => {
        console.log(res);
        this.auth.setCurrentUser(res.pharmacy);
        this.auth.setAccessToken(res?.access || "");
        this.auth.setRefreshToken(res.refresh || "");
        this.router.navigateByUrl('/');
      },
      err => this.error = err,
      )
  }

}
