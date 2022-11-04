import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { RestService } from 'src/app/core/services/rest.service';
import { DataForm } from 'src/app/shared/models';
import { ProfilePictureDialogComponent } from '../../shared/components/profile-picture-dialog/profile-picture-dialog.component';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.css']
})
export class AccountInformationComponent {
  currentUser = this.auth.getCurrentUser();
  disabled: boolean = true;
  hide: boolean = true;
  error: string = '';
  accountForm = new FormGroup({
    name: new FormControl({value: this.currentUser?.name, disabled: true}),
    password: new FormControl({value: '', disabled: true},),
  });

constructor(public dialog: MatDialog, private auth: AuthService, private restClient: RestService) { }
changeDisabled(): void {
    this.disabled = !this.disabled;
    this.accountForm.controls.name.reset({ value: this.currentUser?.name, disabled: this.disabled });
    this.accountForm.controls.password.reset({ value: "", disabled: this.disabled });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(ProfilePictureDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      autoFocus: false,
        restoreFocus: false
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
