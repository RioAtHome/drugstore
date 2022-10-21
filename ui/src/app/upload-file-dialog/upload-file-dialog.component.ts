import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { RestServiceService } from '../shared/rest-service.service';
import { Customer } from '../shared/customer';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExtensionValidator } from '../shared/extension-validator.directive';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent implements OnInit {
  selectedFile: any = null;
  error: string = '';
  progress = false;
  console = console;
  ALLOWED_EXT : string[] = ['csv'];
  fileForm = new FormGroup({
    file: new FormControl('', [Validators.required, ExtensionValidator({ forbiddenExt: this.ALLOWED_EXT })])
  })
  
  constructor(private restClient: RestServiceService, public dialogRef: MatDialogRef<UploadFileDialogComponent>) { }

  ngOnInit(): void {
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
  }

  importCustomers(data: FormData){
    this.restClient.importCustomers(data).subscribe((event: HttpEvent<any>) => {
      console.log(event)
    })
  }  


}
