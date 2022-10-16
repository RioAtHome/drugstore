import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../shared/auth.service'
import { ProfilePictureDialogComponent } from '../profile-picture-dialog/profile-picture-dialog.component'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestServiceService } from '../shared/rest-service.service'


interface DataForm {
  name?: string| undefined| null;
  password?: string| undefined| null;
}


@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.css']
})
export class AccountInformationComponent implements OnInit {
  currentUser = this.auth.getCurrentUser();
  disabled: boolean = true;
  hide: boolean = true;
  error: string = '';
  accountForm = new FormGroup({
    name: new FormControl({value: this.currentUser?.name, disabled: true}),
    password: new FormControl({value: '', disabled: true},),
  });


  constructor(public dialog: MatDialog, private auth: AuthService, private restClient: RestServiceService) { }

  changeDisabled(): void {
    this.accountForm.controls.name.enable();
    this.accountForm.controls.password.enable();
    this.disabled = !this.disabled;
  }

  ngOnInit(): void {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(ProfilePictureDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(
    (shouldReload: boolean) => {
      if(shouldReload) {
      window.location.reload()
      }
    }
    )
  }

  getPicture(): string{

    return `url(${this.currentUser?.picture})`;
  }

  onSubmit(): void {
    const name = this.accountForm.controls.name;
    const password = this.accountForm.controls.password;
    if (name.pristine && password.pristine){
      this.error = 'Change somethings, heellloo??!!!!';
      return
    }

    let data: DataForm = {
      name: name.value,
      password: password.value,
    };

    if(!password.value){
         delete data['password'];
      }
    this.restClient.updateProfileInfo(data).subscribe(
      (res) => {
        
        this.auth.setCurrentUser(res);
        window.location.reload();
      },
      (err) => this.error = err,

      )


  }

}
