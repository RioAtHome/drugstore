import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExtensionValidator } from '../shared/extension-validator.directive';
import { RestServiceService } from '../shared/rest-service.service';



@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent implements OnInit {
  selectedFile: any = null;
  error: string = '';
  startProgress = false;
  disableForm = false;

  console = console
  ALLOWED_EXT : string[] = ['csv'];
  fileForm = new FormGroup({
    file: new FormControl('', [Validators.required, ExtensionValidator(this.ALLOWED_EXT)])
  });
  fileName: string = '';
  formData = new FormData();
  
  constructor(private restClient: RestServiceService, public dialogRef: MatDialogRef<UploadFileDialogComponent>) { }

  ngOnInit(): void {
  }

  onCancel(): void { 
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    this.error = '';
    this.startProgress = true;
    this.fileForm.disable
    this.importCustomers(this.formData);
  }

  onFileChange(event: any){
      const file: File = event.target.files[0];

      if(file) {

        this.fileForm.patchValue({
          file: file?.name
        })
        this.formData.delete('file');
        this.formData.append('file', file);

      }
      this.fileForm.markAsTouched();
      this.fileName = file.name;
      this.console.log(this.fileForm);
    }



    importCustomers(data: FormData){
      this.restClient.importCustomers(data).subscribe(
        (res) => {this.dialogRef.close(true)}, (err) => {
          this.fileForm.enable;
          this.startProgress = false;
          this.error = "Huh, something went wrong, please try again later";
          this.console.log(err)
        })
    }  


  }
