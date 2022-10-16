import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { RestServiceService } from '../shared/rest-service.service';
import { Customer } from '../shared/customer';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-picture-dialog',
  templateUrl: './profile-picture-dialog.component.html',
  styleUrls: ['./profile-picture-dialog.component.css']
})
export class ProfilePictureDialogComponent implements OnInit {
  selectedFile: any = null;
  error: string = '';
  ALLOWED_EXT : string[] = ['JPEG', 'PNG', 'JPG']
  progress = false;
  resp? : Customer;
  constructor(public dialogRef: MatDialogRef<ProfilePictureDialogComponent>, private auth: AuthService, private restClient: RestServiceService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0] ?? null;

  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    if(!this.selectedFile){
      this.error = "Please submit a file";
      return
    }

    const ext = this.selectedFile.name.split('.').pop().toUpperCase();

    if(!this.ALLOWED_EXT.includes(ext)){
      this.error = `Please submit a file with accepted format, ie (${this.ALLOWED_EXT.toString()})!`
      return
    }    
    

    const formData = new FormData();
    formData.append('picture', this.selectedFile, this.selectedFile.name);
    this.progress = true;

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

}
