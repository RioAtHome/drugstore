import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { RestService } from 'src/app/core/services/rest.service';
import { Customer } from 'src/app/shared/models';
import { ExtensionValidator } from '../../directive/extension-validator.directive';

@Component({
  selector: 'app-profile-picture-dialog',
  templateUrl: './profile-picture-dialog.component.html',
  styleUrls: ['./profile-picture-dialog.component.css']
})
export class ProfilePictureDialogComponent implements OnInit, OnDestroy {

  selectedFile: any = null;
  error: string = '';
  ALLOWED_EXT : string[] = ['JPEG', 'PNG', 'JPG'];
  fileForm = new FormGroup({
    file: new FormControl('', [Validators.required, ExtensionValidator(this.ALLOWED_EXT)])
  });
  fileName: string = '';
  formData = new FormData();
  progress = false;
  resp? : Customer;
  uploadPhotoSubscription = new Subscription;

  constructor(public dialogRef: MatDialogRef<ProfilePictureDialogComponent>, private auth: AuthService, private restClient: RestService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0] ?? null;

  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
 
    const formData = new FormData();
    formData.append('picture', this.selectedFile, this.selectedFile.name);
    this.progress = true;
    this.error ='';
    this.restClient.updateProfilePicture(formData).subscribe(
      (res) => {
        this.progress = false;
        this.auth.setCurrentUser(res);
        this.dialogRef.close(true);
      },
      (err) => {
        this.progress = false;
        this.error = err;
      }
      
      );
      
  }

  ngOnDestroy() {
    if(this.uploadPhotoSubscription){this.uploadPhotoSubscription.unsubscribe();}
   
  }

}
